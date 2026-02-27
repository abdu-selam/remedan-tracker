import { BookOpen, Sparkles, HeartHandshake, Pen } from "lucide-react";
import logo from "../assets/logo.jpg";
import Progress from "../components/Progress";
import useStore from "../store/useStore";
import QuranCalendar from "../components/QuranCalendar";
import { useEffect, useState } from "react";
import useRefresh from "../hooks/useRefresh";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import TerawihCalendar from "../components/TerawihCalendar";
import ZhikrSection from "../components/ZhikrSection";
import { todayProgress, totalProgress } from "../utils/zhikrProgress";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.slice(1));

  const name = useStore((state) => state.user.name);
  const today = useStore((state) => state.user.today);
  const quran = useStore((state) => state.user.ibada.quran);
  const zhikr = useStore((state) => state.user.ibada.zhikr);
  const terawih = useStore((state) => state.user.ibada.terawih);
  const setQuran = useStore((state) => state.setQuran);
  const setQuranProgress = useStore((state) => state.setQuranProgress);
  const setTerawih = useStore((state) => state.setTerawih);
  const setTerawihProgress = useStore((state) => state.setTerawihProgress);
  const setZhikrProgress = useStore((state) => state.setZhikrProgress);
  const setZhikr = useStore((state) => state.setZhikr);
  const progress = useStore((state) => state.user.progress);
  const [load, setLoad] = useState(true);
  const [alert, setAlert] = useState(false);
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [currProg, setCurrProg] = useState({
    today: {
      curr: "",
      max: "",
    },
    total: {
      curr: "",
      max: "",
    },
  });
  let timeout = null;
  const texts = {
    quran: {
      text: "Quran",
      icon: () => <BookOpen className="w-4" />,
      desc: " Remedan is month of Quran recite Quran As much as you can.",
    },
    zhikr: {
      text: "Zhikr",
      icon: () => <Sparkles className="w-4" />,
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, maxime et. Error, voluptatibus harum? Alias natus obcae",
    },
    terawih: {
      text: "Terawih",
      icon: () => <HeartHandshake className="w-4" />,
      desc: "cati ea aspernatur eveniet, veritatis, quo officia autem corporis ullam accusantium quasi ab sapiente!",
    },
  };

  useEffect(() => {
    if (!["quran", "terawih", "zhikr"].includes(current)) {
      navigate("/quran", { replace: true });
    }
    setCurrent(location.pathname.slice(1));
  }, [location.pathname]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoad(true);
        const res = await useRefresh(`${current}`, "get");
        const data = res.data;

        const userData = data.data;
        const progress = data.progress;

        if (current == "quran") {
          setQuran(userData);
          setQuranProgress(progress);

          setCurrProg((_) => ({
            today: {
              curr: quran.data[today - 1]?.amount,
              max: quran.data[today - 1]?.limit,
            },
            total: {
              curr: Math.round(quran.progress),
              max: quran.data[today - 1]?.limit * 29,
            },
          }));

          if (quran.data.length) {
            setTimeout(() => {
              const message =
                "Aselamu Aleykum Werahmetullahi Weberekatuh. Don't forget to pray for me 🙏";

              if (timeout) {
                clearTimeout(timeout);
              }

              setType(true);
              setAlert(true);
              setMsg(message);
              timeout = setTimeout(() => {
                setAlert(false);
                setMsg("");
                timeout = null;
              }, 5000);
            }, 1000);

            setLoad(false);
          } else {
            setUpdate(!update);
          }
        } else if (current == "terawih") {
          setTerawih(userData);
          setTerawihProgress(progress);

          setCurrProg((_) => ({
            today: {
              curr: Number(terawih.data[today - 1]?.done),
              max: 1,
            },
            total: {
              curr: terawih.data.filter((data) => data.done).length,
              max: 29,
            },
          }));

          if (terawih.data.length) {
            setLoad(false);
          } else {
            setUpdate(!update);
          }
        } else {
          setZhikr(userData);
          setZhikrProgress(progress);

          if (zhikr.data.length > 0) {
            setLoad(false);
            setCurrProg((_) => ({
              today: {
                curr: todayProgress(zhikr.data[today - 1]),
                max: 100,
              },
              total: {
                curr: totalProgress(zhikr.data),
                max: 100,
              },
            }));
          } else {
            setUpdate(!update);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetcher();
  }, [update, current]);

  return (
    <>
      <Alert msg={msg} type={type} on={alert} />
      <div className="p-3 max-w-95 xs:border w-full grow  xs:border-black/20 rounded-xl mx-auto flex flex-col gap-2 relative mb-4">
        <header className="flex justify-between items-center border p-2 rounded-xl">
          <figure className="flex gap-1 items-center">
            <img className="w-8 rounded-full" src={logo} alt="" width={100} />
            <figcaption className="font-bold text-sm">
              <h1>{name}</h1>
            </figcaption>
          </figure>
          <p
            className={`bg-white  w-8 grid place-content-center aspect-square border-2 text-xl rounded-full `}
          >
            {today}
          </p>
        </header>

        {load ? (
          <Loading dashboard={true} />
        ) : (
          <main className="flex flex-col gap-4 border p-2 rounded-xl text-xs">
            <nav className="z-100 fixed bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-[0_0_0.2rem] left-1/2 bottom-6 -translate-x-1/2 text-[0.7rem] w-[calc(100%-2rem)] max-w-79">
              <ul className="flex justify-evenly w-full">
                {Object.keys(texts).map((key, i) => (
                  <Link key={i} to={`${key}`}>
                    <li
                      className={`transition duration-500 ${current == key ? "text-green-500 scale-105 font-bold" : ""} flex gap-1 items-center`}
                    >
                      {texts[key].icon()}
                      {texts[key].text}
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
            <section className="w-full flex flex-col gap-2">
              <section className="flex flex-col gap-2 border p-2 rounded-xl border-black/30">
                <p className="font-bold text-center">Your Monthly progress</p>
                <Progress
                  curr={Math.round(progress.total * 100)}
                  max={100}
                  percent={true}
                />
              </section>
              <section className="flex flex-col gap-2 border p-2 rounded-xl border-black/30">
                <p className="font-bold text-center">Your Today's progress</p>
                <Progress
                  curr={Math.round(progress.today * 100)}
                  max={100}
                  percent={true}
                />
              </section>
            </section>

            <section className="relative flex flex-col gap-2">
              <div className="w-max absolute top-0 right-1 aspect-square border border-black/50 rounded-full p-1.5">
                <Pen className="w-3 h-3 fill-black/50" />
              </div>
              <section>
                <h2 className="text-sm font-bold gap-1 mb-2 flex justify-center items-center">
                  {texts[current].icon()}
                  {texts[current].text}
                </h2>
                <hr className="w-1/2 mx-auto mb-2 border-black/50" />
                <p className="text-center mb-2">{texts[current].desc}</p>
                <div className="flex gap-2">
                  <div className="flex flex-col border rounded-xl p-2 items-center gap-1 w-full">
                    <div>Today</div>
                    <Progress
                      curr={currProg.today.curr}
                      max={currProg.today.max}
                      percent={current == "zhikr"}
                    />
                  </div>
                  <div className="flex flex-col border rounded-xl p-1 items-center gap-1 w-full">
                    <div>Total Month</div>
                    <Progress
                      curr={currProg.total.curr}
                      max={currProg.total.max}
                      percent={current == "zhikr"}
                    />
                  </div>
                </div>
              </section>
              <section className="border rounded-xl p-2 items-center gap-1 w-full">
                <h3 className="text-center border border-black rounded-xl mb-2 mx-auto w-max p-1 px-4 font-bold">
                  2026 / 1447
                </h3>
                <p className="text-[0.7rem] text-center mb-2">
                  In This year you have been planned to finish quran 3 times
                </p>
                <Routes>
                  <Route
                    path="/quran"
                    element={<QuranCalendar data={quran.data} />}
                  />
                  <Route
                    path="/zhikr"
                    element={<ZhikrSection data={zhikr.data} />}
                  />
                  <Route
                    path="/terawih"
                    element={<TerawihCalendar data={terawih.data} />}
                  />
                </Routes>
              </section>
            </section>
          </main>
        )}
      </div>
      <footer className="bg-black text-white flex flex-col gap-1 text-[0.7rem] items-center p-8 pb-22">
        <p className="opacity-70">Abidin Remedan Planner</p>
        <p className="font-bold text-center">
          Pray For Me To Get What I Want In This Remedan
        </p>
        <p>May Allah Recieve all Our Worships</p>
      </footer>
    </>
  );
};

export default Dashboard;
