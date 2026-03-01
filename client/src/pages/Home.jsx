import { useEffect } from "react";
import logo from "../assets/logo.webp";
import Button from "../components/Button";
import { BookOpen, Repeat, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const features = [
    {
      name: "Terawih Tracker",
      description:
        "Designed to help you stay committed throughout Ramadan without losing track of your progress.",
      icon: () => <Moon />,
    },
    {
      name: "Qur’an Progress Monitor",
      description:
        "Set personal goals, measure completion percentage, and stay consistent whether you're aiming for one khatm or more.",
      icon: () => <BookOpen />,
    },
    {
      name: "Daily Dhikr Log",
      description:
        "Monitor your tasbih, tahmid, takbir, and other dhikr in a structured way that encourages consistency.",
      icon: () => <Repeat />,
    },
  ];

  const location = useLocation();

  useEffect(() => {
    location.pathname = "/";
  }, []);

  return (
    <>
      <div className="max-w-300 p-8 mx-auto sm:min-h-screen flex flex-col justify-between gap-10">
        <header className="flex flex-col justify-center items-center p-3">
          <figure className="flex flex-col gap-2 items-center animate-down w-40">
            <img
              className="rounded-xl border border-accent/10 shadow-[0_0_1rem_var(--color-accent)] animate-cta-2 w-40"
              src={logo}
              alt=""
              width={100}
            />
          </figure>
        </header>
        <main>
          <section className="flex flex-col-reverse  items-center justify-center">
            <div>
              <h1 className="text-[1.7rem] font-bold text-center xs:text-4xl sm:text-5xl animate-days">
                Abidin Remedan Planner
              </h1>
              <section className="text-center max-w-md mx-auto mt-4  text-xs md:w-90">
                <p className="font-bold animate-days-2">
                  Ramadan is not counted in days. It is counted in devotion.
                </p>
                <p className="p-2 animate-auth">
                  Abidin Ramadan Tracker is your digital companion for every
                  raka’ah of Terawih, every page of Qur’an, and every whisper of
                  dhikr.
                </p>

                <div className="flex gap-2 justify-center mt-4">
                  <Link to={"/auth"}>
                    <Button>Get Started</Button>
                  </Link>
                  <Link to={"/auth?type=log"}>
                    <Button type={"log"}>Log In</Button>
                  </Link>
                </div>

                <ul className=" mx-auto w-max flex flex-col items-center gap-2 py-2 border-x-3 rounded-xl px-3.5 font-bold my-8">
                  <li className="animate-days [animation-delay:100]">
                    Track your nightly prayers.
                  </li>
                  <li className="animate-days [animation-delay:200]">
                    Mark your Qur’an recitation progress.
                  </li>
                  <li className="animate-days [animation-delay:300]">
                    Record your daily adhkar.
                  </li>
                </ul>

                <div className="bg-second text-primary p-2 rounded-xl mb-8 shadow-[0_0_0.5rem_var(--color-second)] animate-cta font-bold">
                  Build consistency, one sincere act at a time.
                </div>

                <div className="mb-8 flex flex-col gap-3">
                  <p className="animate-opp">
                    Like a spiritual journal that fits in your pocket
                  </p>
                  <div>
                    {["Clear", "Simple", "Focused"].map((word, i) => (
                      <span
                        style={{
                          animationDelay: `${i * 100}ms`,
                        }}
                        className="px-2 py-1 mx-1 rounded-sm shadow-[0_0_0.1rem_var(--color-second)] animate-opp bg-second/20 font-bold"
                        key={i}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="bg-accent/10 text-accent font-bold text-sm rounded-xl p-2 mb-4 animate-opp">
                  Because small, consistent deeds grow into mountains.
                </p>

                <p className="text-sm animate-down">
                  Track your worship. Strengthen your discipline. Illuminate
                  your Ramadan.
                </p>
              </section>
            </div>
          </section>
          <section>
            <ul className="grid grid-cols-1 place-content-center place-items-center sm:grid-cols-3 gap-6">
              {features.map((fea, i) => (
                <li
                  style={{
                    animationDelay: `${i * 300}ms`,
                  }}
                  key={i}
                  className="flex flex-col items-center rounded-xl p-2 max-w-60 gap-2 animate-days-2 opacity-0"
                >
                  <span>{fea.icon()}</span>
                  <h2 className="text-sm font-bold ">{fea.name}</h2>
                  <p className="text-sm text-center">{fea.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <footer className="bg-second/5 text-second/90 flex flex-col justify-center items-center p-10 text-sm gap-4">
        <p className="font-bold">Abidin Ramadan Tracker</p>
        <hr className="border border-second/30 w-full" />
        <p className="text-center text-xs">
          Built to help you stay consistent in worship throughout Ramadan. Track
          Terawih. Monitor Qur’an recitation. Log daily dhikr.
        </p>

        <p className="text-center">Stay disciplined. Stay intentional.</p>
        <p className="text-center">
          &copy; {new Date().getFullYear()} Abidin Ramadan Tracker. All rights
          reserved.
        </p>
        <p className="text-center">
          Made with purpose for a more focused Ramadan.
        </p>
      </footer>
    </>
  );
};

export default Home;
