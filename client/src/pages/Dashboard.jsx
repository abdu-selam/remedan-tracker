import { Pen } from "lucide-react";
import logo from "../assets/logo.jpg";
import Progress from "../components/Progress";
import useStore from "../store/useStore";

const Dashboard = () => {
  const name = useStore((state) => state.user.name);
  const day = 6;

  return (
    <div className="p-3 max-w-95 xs:border xs:border-black/20 rounded-xl m-4 mx-auto flex flex-col gap-2">
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
            <h2 className="text-sm font-bold text-center mb-2">Plan Type</h2>
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
            <h3>2026 / 1447</h3>
            
          </section>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
