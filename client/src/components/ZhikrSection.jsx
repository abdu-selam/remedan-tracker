import { useEffect, useState } from "react";
import ZhikrCalndar from "./ZhikrCalndar";
import Loading from "./Loading";

const ZhikrSection = ({ data }) => {
  const [zhikrs, setZhikrs] = useState([]);
  const [active, setActive] = useState("");
  const [load, setLoad] = useState(true);

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
        <Loading />
      ) : (
        <div className="flex flex-col gap-2">
          <section className="flex gap-2 w-full overflow-x-auto no-scrollbar">
            {zhikrs.map((zhikr, i) => (
              <p
                onClick={() => setActive(zhikr)}
                data-name={zhikr}
                className={`bg-black text-white p-1 rounded-lg
                ${active == zhikr ? "bg-green-500" : ""}
                `}
                key={i}
              >
                {zhikr}
              </p>
            ))}
          </section>
          <ZhikrCalndar data={data} curr={active} />
        </div>
      )}
    </>
  );
};

export default ZhikrSection;
