import logo from "../assets/logo.png";
import {
  ArrowBigLeft,
  ArrowBigRight,
  CheckCheckIcon,
  Loader,
  Send,
} from "lucide-react";
import KhitamInitial from "../components/KhitamInitial";
import { useEffect, useState } from "react";
import TerawihInitial from "../components/TerawihInitial";
import ZhikrInitial from "../components/ZhikrInitial";
import ConfirmInitial from "../components/ConfirmInitial";
import Alert from "../components/Alert";
import useRefresh from "../hooks/useRefresh";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

const Initial = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    khitam: 1,
    zhikr: [],
    terawih: 29,
  });

  const [indexes, setIndexes] = useState([]);
  const [block, setBlock] = useState(false);
  const [fetched, setFeched] = useState(false);
  const [on, setOn] = useState(false);
  const [type, setType] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const setInitiated = useStore((state) => state.setInitiated);
  const initiated = useStore((state) => state.user.initiated);

  const preController = (e) => {
    if (current == 0 || block) return;
    setCurrent(current - 1);
  };

  const nextController = async (e) => {
    if (block) return;
    if (current != 3) setCurrent(current + 1);
    else {
      setBlock(true);

      try {
        const res = await useRefresh("/user/start", "post", {
          khitam: formData.khitam,
          zhikrs: formData.zhikr,
          terawih: formData.terawih,
        });
        if (res.message == "Success") {
          setMsg(
            "May Allah accept all your worships! don't forget me in your dua",
          );
          setFeched(true);
          setType(true);
          setOn(true);

          setTimeout(() => {
            setOn(false);
            setInitiated(true);
            navigate("/", { replace: true });
          }, 5000);
        }
      } catch (error) {
        setMsg("Something went wrong please try again");
        setBlock(false);
        setType(false);
        setOn(true);

        setTimeout(() => {
          setOn(false);
          setInitiated(false);
        }, 5000);
      }
    }
  };

  useEffect(() => {
    if (initiated) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen h-max p-4 flex flex-col justify-between bg-primary">
      <div className="p-4 border border-second shadow-[0_0_0.2rem_var(--color-accent)] rounded-xl min-h-[calc(100vh-2rem)] max-w-160 mx-auto w-full">
        <Alert on={on} type={type} msg={msg} />
        <figure className="flex gap-1 items-center">
          <img
            className="w-8 border border-second rounded-full animate-days"
            src={logo}
            alt=""
            width={100}
          />
          <figcaption className="font-bold text-sm text-second animate-auth">
            <h1>Abidin | Remedan Tracker</h1>
          </figcaption>
        </figure>
        <hr className="border-0.5 border-accent shadow-[0_0_0.1rem_var(--color-accent)] mt-3" />
        <div>
          {current == 0 ? (
            <KhitamInitial curr={formData.khitam} func={setFormData} />
          ) : current == 1 ? (
            <ZhikrInitial
              curr={formData}
              func={setFormData}
              indexes={indexes}
              setIndexes={setIndexes}
            />
          ) : current == 2 ? (
            <TerawihInitial curr={formData.terawih} func={setFormData} />
          ) : (
            <ConfirmInitial curr={formData} />
          )}

          <button
            disabled={current == 0}
            className={`bg-accent border hover:shadow-[0_0_0.6rem_var(--color-accent)] transition duration-300 border-primary items-center w-max gap-2 p-2 rounded-xl disabled:hidden fixed left-1/2 -translate-x-[calc(50vw-2rem)] sm:-translate-x-76 bottom-8 ${block ? "hidden" : "flex"} `}
            onClick={preController}
          >
            <span className="border rounded-full p-1 bg-primary">
              <ArrowBigLeft className="w-4 h-4 text-accent fill-accent" />
            </span>
            <span className="hidden xs:block   text-sm font-bold">
              Previous
            </span>
          </button>
          <button
            onClick={nextController}
            className={`items-center border 
              hover:shadow-[0_0_0.6rem_var(--color-accent)] transition duration-300 border-primary w-max place-self-end gap-2 bg-accent p-2 rounded-xl col-start-2 fixed right-1/2 translate-x-[calc(50vw-2rem)] sm:translate-x-76 bottom-8
          ${block ? "hidden" : "flex"} `}
          >
            <span className="hidden xs:block text-sm font-bold">
              {current != 3 ? "Next" : "Submit"}
            </span>
            <span className="border rounded-full p-1 bg-primary">
              {current != 3 ? (
                <ArrowBigRight className="w-4 h-4 text-accent fill-accent" />
              ) : (
                <Send className="w-4 h-4 text-accent fill-accent" />
              )}
            </span>
          </button>
          <button
            className={` items-center border hover:shadow-[0_0_0.6rem_var(--color-accent)] transition duration-300 border-primary w-max place-self-center gap-2 bg-accent p-2 rounded-xl fixed right-1/2 translate-x-1/2 sm:translate-x-76 bottom-8
          ${block ? "flex" : "hidden"}`}
          >
            {fetched ? (
              <span className="border rounded-full p-1 bg-primary">
                <CheckCheckIcon className="w-4 h-4 text-accent" />
              </span>
            ) : (
              <span className="border rounded-full p-1 bg-primary animate-spin">
                <Loader className="w-4 h-4 text-accent fill-accent" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Initial;
