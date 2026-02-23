import logo from "../assets/logo.jpg";
import Button from "../components/Button";
import { CalendarClock, ClipboardCheck, CircleStar } from "lucide-react";
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className="max-w-300 p-8 mx-auto sm:min-h-screen flex flex-col justify-between gap-10">
        <header className="flex flex-col justify-center items-center p-3">
          <figure className="flex flex-col gap-2 items-center">
            <img className="rounded-xl w-40" src={logo} alt="" width={100} />
          </figure>
        </header>
        <section className="flex flex-col-reverse  items-center justify-center">
          <div>
            <h1 className="text-[1.7rem] font-bold text-center xs:text-4xl sm:text-5xl ">
              Abidin Remedan Planner
            </h1>
            <p className="text-center max-w-md mx-auto mt-4  text-xs md:w-90">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              nobis aperiam error recusandae sapiente rem rerum iusto dolore sed
              at dolores vitae eaque deleniti a iure, aliquid omnis magni quo.
            </p>
            <div className="flex gap-2 justify-center mt-4">
              <Button>
                <Link to={'/auth'}>Get Started</Link>
              </Button>
              <Button type={"log"}>
                <Link to={'/auth?type=log'}>Log In</Link>
              </Button>
            </div>
          </div>
        </section>
        <section>
          <ul className="grid grid-cols-1 place-content-center place-items-center sm:grid-cols-3 gap-2">
            <li className="flex flex-col items-center rounded-xl p-2 max-w-60">
              <CalendarClock />
              <h3 className="text-sm font-bold ">Feature Type</h3>
              <p className="text-sm text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing!
              </p>
            </li>
            <li className="flex flex-col items-center rounded-xl p-2 max-w-60">
              <CalendarClock />
              <h3 className="text-sm font-bold ">Feature Type</h3>
              <p className="text-sm text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing!
              </p>
            </li>
            <li className="flex flex-col items-center rounded-xl p-2 max-w-60">
              <CalendarClock />
              <h3 className="text-sm font-bold ">Feature Type</h3>
              <p className="text-sm text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing!
              </p>
            </li>
          </ul>
        </section>
      </div>
      <footer className="bg-black text-white flex flex-col justify-center items-center p-10 text-sm">
        <p>All rights reserved</p>
        <p className="text-xs opacity-80">&copy; copyright {new Date().getFullYear()}</p>
      </footer>
    </>
  );
};

export default Home;
