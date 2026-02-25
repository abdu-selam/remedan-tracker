import { BookOpen, Sparkles, HeartHandshake, Pen } from "lucide-react";
import logo from "../assets/logo.jpg";
import Progress from "../components/Progress";
import useStore from "../store/useStore";
import Calender from "../components/Calender";
import { useState } from "react";

const Dashboard = () => {
  const name = useStore((state) => state.user.name);
  const [current, setCurrrent] = useState("quran");
  const texts = {
    quran: {
      text: "Quran",
      icon: () => <BookOpen className="w-4" />,
    },
    zhikr: {
      text: "Zhikr",
      icon: () => <Sparkles className="w-4" />,
    },
    terawih: {
      text: "Terawih",
      icon: () => <HeartHandshake className="w-4" />,
    },
  };

  return (
    <>
      <div className="p-3 max-w-95 xs:border xs:border-black/20 rounded-xl m-4 mx-auto flex flex-col gap-2 relative">
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
            {6}
          </p>
        </header>
        <nav className="z-100 fixed bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-[0_0_0.2rem] left-1/2 bottom-6 -translate-x-1/2 text-[0.7rem] w-[calc(100%-2rem)] max-w-79">
          <ul className="flex justify-evenly w-full">
            {Object.keys(texts).map((key, i) => (
              <li
                key={i}
                onClick={() => setCurrrent(key)}
                className={`transition duration-500 ${current == key ? "text-green-500 scale-105 font-bold" : ""} flex gap-1 items-center`}
              >
                {texts[key].icon()}
                {texts[key].text}
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex flex-col gap-4 border p-2 rounded-xl text-xs">
          <section className="w-full flex flex-col gap-2">
            <section className="flex flex-col gap-2 border p-2 rounded-xl border-black/30">
              <p className="font-bold text-center">Your Monthly progress</p>
              <Progress curr={60} max={100} percent={true} />
            </section>
            <section className="flex flex-col gap-2 border p-2 rounded-xl border-black/30">
              <p className="font-bold text-center">Your Today's progress</p>
              <Progress curr={60} max={100} percent={true} />
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
              <p className="text-center mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, eveniet?
              </p>
              <div className="flex gap-2">
                <div className="flex flex-col border rounded-xl p-2 items-center gap-1 w-full">
                  <div>Today</div>
                  <Progress curr={9} max={21} />
                </div>
                <div className="flex flex-col border rounded-xl p-1 items-center gap-1 w-full">
                  <div>Total Month</div>
                  <Progress curr={9} max={21} />
                </div>
              </div>
            </section>
            <section className="border rounded-xl p-2 items-center gap-1 w-full">
              <h3 className="text-center border border-black rounded-xl mb-2 mx-auto w-max p-1 px-4 font-bold">
                2026 / 1447
              </h3>
              <p className="text-[0.7rem] text-center mb-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus,
                velit.
              </p>
              <Calender />
            </section>
          </section>
        </main>
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
