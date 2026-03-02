import { BookOpen, Sparkles, HeartHandshake, Pen } from "lucide-react";
import logo from "../assets/logo.webp";
import Progress from "../components/Progress";
import useStore, { useLocalStore } from "../store/useStore";
import QuranCalendar from "../components/QuranCalendar";
import { useEffect, useState, useRef } from "react";
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
import Teacher from "../components/Teacher";

const Dashboard = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.slice(1));

  const [teacher, setTeacher] = useState(false);
  const updateNotifies = useLocalStore((state) => state.updated);

  const initiated = useStore((state) => state.user.initiated);

  const todayInput = useRef();

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
      desc: "Let the Quran be your daily companion. Even a few verses read with sincerity can brighten your path.",
      plan: `“The best among you are those who learn the Qur’an and teach it.”`,
      ref: `Sahih al-Bukhari 5027`,
    },
    zhikr: {
      text: "Zhikr",
      icon: () => <Sparkles className="w-4" />,
      desc: "Keep your tongue moist with the remembrance of Allah. In every whisper of dhikr, the heart finds peace and light.",
      plan: `
“The example of the one who remembers his Lord and the one who does not is like the living and the dead.”`,

      ref: `Sahih al-Bukhari 6407`,
    },
    terawih: {
      text: "Terawih",
      icon: () => <HeartHandshake className="w-4" />,
      desc: "In the quiet nights of prayer, stand before Allah with hope. Every step to Terawih is a step toward mercy and forgiveness.",
      plan: `“Whoever stands in prayer during Ramadan with faith and seeking reward will have his past sins forgiven.”`,
      ref: `Sahih al-Bukhari 37, Sahih Muslim 759`,
    },
  };

  useEffect(() => {
    if (["in", "nav", "prog"].some((el) => updateNotifies.includes(el))) return;

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
  }, []);

  useEffect(() => {
    if (!initiated) {
      navigate("/initiate", { replace: true });
    } else {
      if (!["/quran", "/terawih", "/zhikr"].includes(location.pathname)) {
        navigate("/quran", { replace: true });
      }
      setCurrent(location.pathname.slice(1));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!quran.data[today - 1] || current != "quran") return;

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
  }, [quran.data[today - 1], current]);

  useEffect(() => {
    if (!zhikr.data[today - 1] || current != "zhikr") return;

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
  }, [zhikr.progress, current]);

  useEffect(() => {
    if (!terawih.data[today - 1] || current != "terawih") return;

    setCurrProg((_) => ({
      today: {
        curr: Number(terawih.data[today - 1]?.done)
          ? Number(terawih.data[today - 1]?.done)
          : 0,
        max: 1,
      },
      total: {
        curr: terawih.data.filter((data) => data.done).length,
        max: 29,
      },
    }));
  }, [terawih.data[today - 1], current]);

  useEffect(() => {
    const fetcher = async () => {
      if (!["quran", "terawih", "zhikr"].includes(current)) {
        return;
      }
      try {
        if (quran.data[today - 1] && current == "quran") {
          setLoad(false);
          return;
        }
        if (terawih.data[today - 1] && current == "terawih") {
          setLoad(false);
          return;
        }
        if (zhikr.data[today - 1] && current == "zhikr") {
          setLoad(false);
          return;
        }
        setLoad(true);

        const res = await useRefresh(`/${current}`, "get");
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
            setLoad(false);
          } else {
            setUpdate(!update);
          }
        } else if (current == "terawih") {
          setTerawih(userData);
          setTerawihProgress(progress);

          setCurrProg((_) => ({
            today: {
              curr: Number(terawih.data[today - 1]?.done)
                ? Number(terawih.data[today - 1]?.done)
                : 0,
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
        navigate("/", { replace: true });
      }
    };

    fetcher();
  }, [update, current]);

  useEffect(() => {
    if (load) return;

    if (
      location.pathname == "/quran" &&
      !["in", "nav", "prog"].every((ud) => updateNotifies.includes(ud))
    ) {
      setTimeout(() => {
        setTeacher(true);
      }, 150);
    }

    if (
      location.pathname == "/zhikr" &&
      !["menu"].every((ud) => updateNotifies.includes(ud))
    ) {
      setTimeout(() => {
        setTeacher(true);
      }, 150);
    }

    setTimeout(() => {
      const elem = todayInput.current;
      const elemPos = elem.getBoundingClientRect().top;

      const offsetPosition = elemPos + window.scrollY - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 150);
  }, [current, load]);

  return (
    <>
      <div className="min-h-screen h-max pt-4  flex flex-col justify-between text-second">
        <Alert msg={msg} type={type} on={alert} />
        {teacher && <Teacher page={current} />}
        <div className="p-3 max-w-95 xs:border w-full grow  xs:border-black/20 rounded-xl mx-auto flex flex-col gap-2 relative mb-4">
          <header className="flex justify-between items-center border p-2 rounded-xl">
            <figure className="flex gap-1 items-center animate-days">
              <img className="w-8 rounded-full" src={logo} alt="" width={100} />
              <figcaption className="font-bold text-sm">
                <h1 className="capitalize">{name}</h1>
              </figcaption>
            </figure>
            <p
              className={`w-8 grid place-content-center aspect-square border-2 text-md rounded-full animate-auth`}
            >
              {today}
            </p>
          </header>

          {load ? (
            <Loading dashboard={true} />
          ) : (
            <main className="flex flex-col gap-4 border p-2 rounded-xl text-xs">
              <nav className="z-100 fixed bg-primary/80 backdrop-blur-md text-secondary px-4 py-2 rounded-xl shadow-[0_0_0.2rem] left-1/2 bottom-6 -translate-x-1/2 text-[0.7rem] w-[calc(100%-2rem)] max-w-79 animate-nav overflow-hidden">
                <ul className="flex justify-evenly w-full">
                  {Object.keys(texts).map((key, i) => (
                    <Link key={i} to={`/${key}`}>
                      <li
                        className={`transition hover:text-confirm/80 duration-500 ${current == key ? "text-confirm scale-105 font-bold" : ""} flex gap-1 items-center
                        [animation-delay:500ms] animate-down`}
                      >
                        {texts[key].icon()}
                        {texts[key].text}
                      </li>
                    </Link>
                  ))}
                </ul>
              </nav>
              <section className="w-full flex flex-col gap-2">
                <section className="flex flex-col gap-2 border p-2 rounded-xl border-primary/30">
                  <p className="font-bold text-center animate-days">
                    Your Monthly progress
                  </p>
                  <Progress
                    curr={Math.round(progress.total * 100)}
                    max={100}
                    percent={true}
                  />
                </section>
                <section className="flex flex-col gap-2 border p-2 rounded-xl border-primary/30">
                  <p className="font-bold text-center animate-days-2">
                    Your Today's progress
                  </p>
                  <Progress
                    curr={Math.round(progress.today * 100)}
                    max={100}
                    percent={true}
                  />
                </section>
              </section>

              <section className="relative flex flex-col gap-2">
                <div className="w-max absolute top-0 right-1 aspect-square border border-secondary/50 rounded-full p-1.5">
                  <Pen className="w-3 h-3 fill-primary/50" />
                </div>
                <section>
                  <h2 className="text-sm font-bold gap-1 mb-2 flex justify-center items-center animate-auth">
                    {texts[current].icon()}
                    {texts[current].text}
                  </h2>
                  <hr className="w-1/2 mx-auto mb-2 border-second/50" />
                  <p className="text-center mb-2 animate-down">
                    {texts[current].desc}
                  </p>
                  <div className="flex gap-2">
                    <div className="flex flex-col border rounded-xl p-2 items-center gap-1 w-full animate-days">
                      <div>Today</div>
                      <Progress
                        curr={currProg.today.curr}
                        max={currProg.today.max}
                        percent={current == "zhikr"}
                      />
                    </div>
                    <div className="flex flex-col border rounded-xl p-1 items-center gap-1 w-full animate-days-2">
                      <div>Total Month</div>
                      <Progress
                        curr={currProg.total.curr}
                        max={currProg.total.max}
                        percent={current == "zhikr"}
                      />
                    </div>
                  </div>
                </section>
                <section
                  ref={todayInput}
                  className="border rounded-xl p-2 items-center gap-1 w-full animate-opp"
                >
                  <h3 className="text-center border border-second rounded-xl mb-2 mx-auto w-max p-1 px-4 font-bold">
                    2026 / 1447
                  </h3>
                  <p className="font-bold text-center mb-2">
                    The Messenger of Allah ﷺ said:
                  </p>
                  <p className="text-[0.7rem] text-center mb-2">
                    {texts[current].plan}
                  </p>
                  <p className="text-[0.7rem] text-center font-bold text-accent mb-2">
                    {texts[current].ref}
                  </p>
                  {current == "quran" ? (
                    <QuranCalendar data={quran.data} />
                  ) : current == "zhikr" ? (
                    <ZhikrSection />
                  ) : (
                    <TerawihCalendar data={terawih.data} />
                  )}
                </section>
              </section>
            </main>
          )}
        </div>
        <footer className="bg-second/5 text-second/50 flex flex-col justify-center items-center p-10 text-sm gap-4">
          <p className="font-bold">Abidin Ramadan Tracker</p>
          <hr className="border border-second/30 w-full" />
          <p className="text-center text-xs">
            Built to help you stay consistent in worship throughout Ramadan.
            Track Terawih. Monitor Qur’an recitation. Log daily dhikr.
          </p>

          <p className="text-center">Stay disciplined. Stay intentional.</p>
          <p className="text-center opacity-70">
            &copy; {new Date().getFullYear()} Abidin Ramadan Tracker. All rights
            reserved.
          </p>
          <p className="text-center">
            Made with purpose for a more focused Ramadan.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
