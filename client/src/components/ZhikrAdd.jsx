import { Check, CheckCheck, ChevronUp, Loader, Plus, X } from "lucide-react";
import { useStaticStore } from "../store/useStore";
import { useRef } from "react";
import { useState } from "react";
import Alert from "./Alert";
import useRefresh from "../hooks/useRefresh";
import { useNavigate } from "react-router-dom";

const ZhikrAdd = ({ closer, zhikrs }) => {
  const azhkarsStore = useStaticStore((state) => state.azhkars);

  const [azhkars, setAzhkars] = useState([
    ...azhkarsStore
      .filter((zk) => !zhikrs.includes(zk.name))
      .map((obj) => ({ ...obj })),
  ]);

  const [addZhikrs, setAddZhikrs] = useState([]);
  const [clicked, setClicked] = useState(false);

  const [alert, setAlert] = useState(false);
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState("");
  const [load, setLoad] = useState("none");

  const navigate = useNavigate();
  const inputRefs = useRef([]);

  let timeout = null;

  const ref = useRef();

  const zhikrAdder = (e) => {
    const elem = e.currentTarget;
    const zhikr = elem.dataset.name;

    if (!addZhikrs.includes(zhikr)) {
      const pre = [...new Set([...addZhikrs, zhikr])];

      setAddZhikrs(pre);
    } else {
      if (e.target.matches("input")) return;
      const pre = addZhikrs.filter((zh) => zh != zhikr);

      setAddZhikrs(pre);
    }
  };

  const newZhikr = (e) => {
    e.preventDefault();
    const form = ref.current;
    const name = form.name.value;
    const description = form.description.value;
    const number = Number(form.number.value);

    const obj = {
      name,
      description,
      limit: number,
    };

    if (
      azhkarsStore.some((el) => el.name == name) ||
      azhkars.some((el) => el.name == name)
    ) {
      if (timeout) {
        clearTimeout(timeout);
      }

      setType(false);
      setAlert(true);
      setMsg("Sorry This zhikr has been added please try with another name!");
      timeout = setTimeout(() => {
        setAlert(false);
        setMsg("");
        timeout = null;
      }, 5000);
      return;
    }

    const pre = [...azhkars.map((zh) => ({ ...zh }))];
    const preName = [...new Set([...addZhikrs, name])];

    setAzhkars([...pre, obj]);
    setAddZhikrs([...preName]);

    if (timeout) {
      clearTimeout(timeout);
    }

    setType(true);
    setAlert(true);
    setMsg(
      "Your custom zhikr has been added click submit zhikrs button to add it to your plan",
    );
    timeout = setTimeout(() => {
      setAlert(false);
      setMsg("");
      timeout = null;
    }, 5000);

    setClicked(false);
  };

  const inputNumberController = (e) => {
    const elem = e.target;
    const value = elem.value;

    const lastI = value.length - 1;
    const lastChar = value.slice(lastI);

    const nums = Array.from({ length: 10 }, (_, i) => `${i}`);
    if (!nums.includes(lastChar)) {
      elem.value = value.slice(0, lastI);
    }

    if (inputRefs.current.includes(elem)) {
      const name = elem.dataset?.name;
      const i = elem.dataset?.i;

      const currZhikr = azhkars[i];
      const limit = Number(elem.value) > 0 ? Number(elem.value) : 1;
      currZhikr.limit = limit;
      const newZhikrsArr = [...azhkars.map((zh) => ({ ...zh }))];
      newZhikrsArr[i] = { ...currZhikr };
      setAzhkars(newZhikrsArr);
    }
  };

  const submitter = async (e) => {
    if (load != "none") return;
    setLoad("load");

    const selected = azhkars.filter((zh) => addZhikrs.includes(zh.name));

    try {
      const res = await useRefresh("/zhikr/new", "post", {
        zhikrs: [...selected],
      });

      if (timeout) {
        clearTimeout(timeout);
      }

      setType(true);
      setAlert(true);
      setLoad("success");
      setMsg(
        `Congratulations you have been added ${res.data} zhikrs to your plan`,
      );
      timeout = setTimeout(() => {
        setAlert(false);
        setMsg("");
        timeout = null;
        setLoad("none");
        navigate(0);
      }, 3000);

      setClicked(false);
    } catch (error) {
      if (timeout) {
        clearTimeout(timeout);
      }

      setType(false);
      setAlert(true);
      setLoad("error");
      setMsg(error.message);
      timeout = setTimeout(() => {
        setAlert(false);
        setMsg("");
        timeout = null;
        setLoad("none");
      }, 3000);
    }
  };

  return (
    <div className="z-2000000 fixed h-dvh w-dvw top-0 left-0 flex items-center justify-center">
      <Alert type={type} msg={msg} on={alert} />
      <div className=" overflow-auto no-scrollbar max-w-76 rounded-2xl p-3 shadow-[0_0_0.5rem_var(--color-accent)] border-2 border-accent/70 animate-opp bg-primary h-[80dvh] w-8/10 text-second">
        <section className="flex border p-2 rounded-lg border-second/40 justify-between items-center mb-4">
          <p className="text-sm font-bold text-accent">Select New Zhikr </p>
          <span
            className="grid place-content-center border-2 w-max rounded-full p-1"
            onClick={() => closer(false)}
          >
            <X className="w-3 stroke-3 h-3" />
          </span>
        </section>
        <section>
          <ul className="flex flex-col gap-2">
            {azhkars.map((zh, i) => (
              <li
                key={i}
                style={{
                  animationDelay: `${i * 200}ms`,
                }}
                className={`bg-accent/10 rounded-xl overflow-hidden items-center justify-between opacity-0 animate-days border border-second/30`}
                data-name={zh.name}
                onClick={zhikrAdder}
              >
                <div
                  className={`${addZhikrs.includes(zh.name) ? "bg-confirm text-primary" : "bg-accent/20"} flex gap-2 justify-between p-2`}
                >
                  <p className="w-full grid items-center font-bold capitalize">
                    <span className="flex gap-2 items-center">
                      {!addZhikrs.includes(zh.name) ? (
                        <X className="border-2 rounded-full stroke-3 w-6 h-6 p-1" />
                      ) : (
                        <Check className="border-2 rounded-full stroke-3 w-6 h-6 p-1" />
                      )}
                      {zh.name}
                    </span>
                  </p>
                  <input
                    ref={(el) => (inputRefs.current[i] = el)}
                    data-i={i}
                    style={{
                      width: `${`${zh.limit}`.length + 6}ch`,
                    }}
                    data-name={zh.name}
                    className={`min-w-10 block h-max px-2 py-0.5 rounded-sm text-xs bg-accent text-center focus:outline-0
                    ${addZhikrs.includes(zh.name) ? "text-primary" : "text-primary/70"}
                    focus:border-primary border border-primary/30 font-bold`}
                    defaultValue={zh.limit}
                    type="text"
                    readOnly={!addZhikrs.includes(zh.name)}
                    onInput={inputNumberController}
                  />
                </div>
                <p className="p-2">{zh.description}</p>
              </li>
            ))}
          </ul>
          <div>
            {clicked ? (
              <form
                ref={ref}
                onSubmit={newZhikr}
                className="flex flex-col gap-2 p-2 my-4 border border-second/10 shadow-[0_0_0.2rem_var(--color-accent)] rounded-lg animate-down"
              >
                <div className="flex flex-col gap-1">
                  <label className="font-bold px-2" htmlFor="name">
                    Zhikr Name
                  </label>
                  <input
                    className="border px-2 py-1.5 rounded-lg border-second/30 focus:outline-0 focus:border-second"
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    required
                    placeholder="Type zhikr name here"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold px-2" htmlFor="description">
                    Zhikr Description
                  </label>
                  <input
                    className="border px-2 py-1.5 rounded-lg border-second/30 focus:outline-0 focus:border-second"
                    id="description"
                    name="description"
                    autoComplete="off"
                    required
                    type="text"
                    placeholder="Type zhikr description here"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold px-2" htmlFor="number">
                    Amount Per Day
                  </label>
                  <input
                    className="border px-2 py-1.5 rounded-lg border-second/30 focus:outline-0 focus:border-second"
                    id="number"
                    name="number"
                    required
                    autoComplete="off"
                    type="text"
                    onInput={inputNumberController}
                    placeholder="Type amount you need to say per day"
                  />
                </div>
                <button
                  type="submit"
                  className="flex gap-1 bg-second text-primary font-bold w-full p-2 py-1 rounded-lg items-center justify-center hover:shadow-[0_0_0.5rem_var(--color-accent)] transition duration-300"
                >
                  <Plus className="border-2 stroke-5 rounded-full w-5 h-5 p-1" />
                  Add Zhikr
                </button>
                <div className="flex justify-end">
                  <span
                    onClick={() => setClicked(false)}
                    className="bg-second/10 text-second border-2 w-7 h-7 grid place-content-center font-black rounded-full"
                  >
                    <ChevronUp className="w-4 h-4 stroke-3" />
                  </span>
                </div>
              </form>
            ) : (
              <span
                onClick={() => setClicked(true)}
                className="flex gap-2 mt-4 animate-auth bg-accent/30 w-max p-2 rounded-xl items-center hover:shadow-[0_0_0.5rem_var(--color-second)] transition duration-300"
              >
                <Plus className="border rounded-full w-5 h-5 p-1" />
                Add Custom Zhikr
              </span>
            )}
          </div>
          <button
            onClick={submitter}
            className="bg-second shadow-[0_0_0.5rem_var(--color-accent)] border border-accent px-6 py-2 text-primary rounded-xl mt-4 mx-auto block hover:shadow-[0_0_1rem_var(--color-accent)] w-full text-center transition duration-300 font-bold animate-cta-3"
          >
            {load == "load" ? (
              <Loader className="animate-spin mx-auto" />
            ) : load == "success" ? (
              <CheckCheck className="mx-auto" />
            ) : load == "error" ? (
              <X className="mx-auto" />
            ) : (
              "Submit Zhikrs"
            )}
          </button>
        </section>
      </div>
    </div>
  );
};

export default ZhikrAdd;
