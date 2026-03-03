import { useEffect, useRef, useState } from "react";
import ZhikrCalndar from "./ZhikrCalndar";
import Loading from "./Loading";
import { MenuIcon, Plus, X } from "lucide-react";
import useStore from "../store/useStore";
import ZhikrAdd from "./ZhikrAdd";

const ZhikrSection = () => {
  const [zhikrs, setZhikrs] = useState([]);
  const [active, setActive] = useState("");
  const [load, setLoad] = useState(true);
  const [menu, setMenu] = useState(false);
  const data = useStore((state) => state.user.ibada.zhikr.data);
  const today = useStore((state) => state.user.today);
  const wrapper = useRef();
  const zhikrRef = useRef([]);
  const menuRef = useRef();

  const [addZhikr, setAddZhikr] = useState(false);

  document.body.addEventListener("click", (e) => {
    const navs = [...zhikrRef.current, wrapper.current, menuRef.current];

    if (!navs.contains(e.target)) {
      setMenu(false);
    }
  });

  useEffect(() => {
    if (data[0]) {
      const need = [];
      for (const key in data[0].zhikr) {
        need.push(key);
      }

      setZhikrs([...need]);
      setActive(need[0]);
      setLoad(false);
    }
  }, []);

  return (
    <>
      {load ? (
        <section className="w-full h-80">
          <Loading dashboard={true} />
        </section>
      ) : (
        <div className="flex flex-col relative gap-2">
          {addZhikr && <ZhikrAdd zhikrs={zhikrs} closer={setAddZhikr} />}
          <section
            ref={wrapper}
            className={`flex transition duration-300 origin-top-right ${menu ? "scale-100" : "scale-0"} flex-col z-100 bg-primary border border-second/30 rounded-xl p-2 pr-8 absolute gap-2 w-full overflow-x-auto no-scrollbar`}
          >
            {zhikrs.map((zhikr, i) => (
              <p
                ref={(el) => (zhikrRef.current[i] = el)}
                onClick={() => {
                  setMenu(!menu);
                  setActive(zhikr);
                }}
                data-name={zhikr}
                className={`grow w-full p-1 border-b 
                ${active == zhikr ? "text-confirm" : "text-second"}
                `}
                key={i}
              >
                {zhikr}
              </p>
            ))}
          </section>
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <p className="bg-confirm text-primary font-bold capitalize text-center p-2 w-max px-4 rounded-lg">
                {active}
              </p>
              <p className="bg-second/10 p-2 rounded-lg animate-cta-2 w-max">
                Your plan:{" "}
                <span className="font-bold text-accent">
                  {data[today - 1].zhikr[active].limit}
                </span>
              </p>
            </div>
            <MenuIcon
              ref={menuRef}
              onClick={(e) => {
                e.stopPropagation();
                setMenu(true);
              }}
              className={`z-10000 border animate-opp rounded-full w-8 h-8 p-2 ${menu ? "hidden" : "block"}`}
            />
            <X
              className={`z-1000 rounded-full border w-8 h-8 p-2 animate-opp ${menu ? "block" : "hidden"}`}
            />
          </div>
          <ZhikrCalndar curr={active} />
          <div
            onClick={() => setAddZhikr(true)}
            className="flex animate-days-2 gap-2 items-center justify-center rounded-xl mx-auto bg-second border border-accent shadow-[0_0_0.5rem_var(--color-accent)] transition duration-300 hover:shadow-[0_0_1rem_var(--color-accent)] hover:scale-103 text-primary font-bold my-2 w-max px-4 py-1"
          >
            <span className="border-2 rounded-full p-1 w-6 h-6 grid place-content-center">
              <Plus className="inline stroke-3 w-4 h-4" />
            </span>
            <span>Add new Zhikr</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ZhikrSection;
