import { useEffect, useRef, useState } from "react";
import ZhikrCalndar from "./ZhikrCalndar";
import Loading from "./Loading";
import { MenuIcon, X } from "lucide-react";
import useStore from "../store/useStore";

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

  document.body.addEventListener("click", (e) => {
    const navs = [...zhikrRef.current, wrapper.current, menuRef.current];

    if (!navs.includes(e.target)) {
      setTimeout(() => {
        setMenu(false);
      }, 100);
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
          <div className="flex justify-between items-center">
            <p className="bg-confirm text-primary font-bold capitalize text-center p-2 w-max px-4 rounded-lg">
              {active}
            </p>
            <p className="bg-second/10 p-2 rounded-lg animate-cta-2">
              Your plan:{" "}
              <span className="font-bold text-accent">
                {data[today - 1].zhikr[active].limit}
              </span>
            </p>
            <MenuIcon
              ref={menuRef}
              onClick={() => setMenu(true)}
              className={`z-1000 border animate-opp rounded-full w-8 h-8 p-2 ${menu ? "hidden" : "block"}`}
            />
            <X
              className={`z-1000 rounded-full border w-7 h-7 p-1.5 animate-opp ${menu ? "block" : "hidden"}`}
            />
          </div>
          <ZhikrCalndar curr={active} />
        </div>
      )}
    </>
  );
};

export default ZhikrSection;
