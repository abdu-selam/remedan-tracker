import { Check, Repeat, X } from "lucide-react";
import { useRef, useState } from "react";

const ZhikrInitial = ({ func, curr, indexes, setIndexes }) => {
  const azhkars = [
  {
    name: "subhanallah",
    description: "Glorifying Allah and declaring His perfection.",
    limit: 100
  },
  {
    name: "alhamdulillah",
    description: "Expressing gratitude and praise to Allah.",
    limit: 33
  },
  {
    name: "allahu akbar",
    description: "Affirming that Allah is the Greatest.",
    limit: 34
  },
  {
    name: "la ilaha illa allah",
    description: "Declaring the oneness of Allah.",
    limit: 100
  },
  {
    name: "astaghfirullah",
    description: "Seeking forgiveness from Allah.",
    limit: 100
  },
  {
    name: "subhanallahi wa bihamdih",
    description: "Glory and praise be to Allah.",
    limit: 100
  },
  {
    name: "subhanallahi al-Azeem",
    description: "Glorifying Allah, the Most Great.",
    limit: 100
  },
  {
    name: "la hawla wa la quwwata illa billah",
    description: "Acknowledging that all power belongs to Allah.",
    limit: 100
  },
  {
    name: "salawat",
    description: "Sending blessings upon the Prophet ﷺ.",
    limit: 100
  },
  {
    name: "rabbi ighfir li",
    description: "Asking Allah for forgiveness and mercy.",
    limit: 100
  }
];
  const divRef = useRef();

  const [click, setClick] = useState(false);

  const stateChange = (data) => {
    func((prev) => ({
      ...prev,
      zhikr: data.map((obj) => ({ ...obj })),
    }));
  };

  const inputController = (e) => {
    const elem = e.currentTarget;
    const index = Number(elem.dataset.index);

    const numbers = Array.from({ length: 10 }, (_, i) => `${i}`);
    const i = elem.value.length - 1;

    if (!numbers.includes(elem.value[i])) {
      elem.value = elem.value.slice(0, i);
    }

    const data = elem.value[0] == "0" ? elem.value.slice(1, i + 1) : elem.value;
    const value = Number(data) == 0 ? 1 : Number(data);
    const current = { ...azhkars[index] };
    const zhikrs = curr.zhikr.map((z) => ({ ...z }));
    const newData = zhikrs.map((z) => {
      if (current.name == z.name) {
        return {
          name: current.name,
          description: current.description,
          limit: value,
        };
      }
      return { ...z };
    });

    stateChange([...newData]);
  };

  const adderToList = (e) => {
    const el = e.currentTarget;
    const index = Number(el.dataset.index);
    if (click) return;
    setClick(true);
    setTimeout(() => {
      setClick(false);
    }, 500);

    const data = azhkars[index];
    const zhikr = curr.zhikr.map((z) => ({ ...z }));

    const item = zhikr.filter((z) => z.name == data.name)[0];

    if (!item) {
      if (e.target.matches('input')) {
        
      }
      zhikr.push(data);
      const ind = [...indexes];
      ind.push(index);

      setIndexes([...ind]);
      stateChange([...zhikr]);
    } else {
      if (e.target.matches('input')) {
        return
      }
      const need = zhikr.filter((z) => z.name != data.name);
      stateChange([...need]);
      const ind = indexes.filter((i) => i != index);
      setIndexes([...ind]);
    }
  };

  return (
    <div>
      <header className="flex flex-col items-center gap-2 mt-12 mb-6 text-second">
        <h1 className="text-xl xs:text-2xl font-bold text-center animate-down">
          <Repeat className="inline"/> Moments of Remembrance
          </h1>
        <p className="text-sm max-w-120 text-center animate-days">
          In the quiet of your day, every dhikr is a whisper to the heart. Each
          tasbih, each praise, draws you closer to peace, softens the soul, and
          strengthens your connection with Allah.
        </p>
      </header>
      <hr className="border-2 border-accent rounded-2xl w-1/2 mx-auto" />
      <main className="flex flex-col items-center gap-4 mt-6 mb-20 text-second">
        <h2 className="text-lg font-bold text-center mb-8 animate-auth">Please choose from the following adhkar. May Allah accept your worship.</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 place-items-center w-full gap-2">
          {azhkars.map((data, i) => (
            <div 
            onClick={adderToList}
            data-index={i}
            key={i} 
            style={{
                  animationDelay: `${i * 100}ms`
                }}
            className="border rounded-xl w-full max-w-80 pb-2 overflow-hidden animate-down opacity-0">
              <div
                ref={divRef}
                className={`flex items-center py-1 px-2 justify-between w-full ${indexes.includes(i) ? "bg-confirm text-primary" : "bg-second text-primary"}`}
              >
                <span
                  onClick={adderToList}
                  data-index={i}
                  className={`${indexes.includes(i) ? "hidden" : "inline"} p-0.5 bg-denied text-second rounded-full`}
                >
                  <X data-index={i} className="w-4 h-4" />
                </span>
                <span
                  className={`${indexes.includes(i) ? "inline" : "hidden"} p-0.5 bg-accent border border-primary rounded-full`}
                >
                  <Check data-index={i} className="w-4 h-4 text-primary" />
                </span>
                <p className="w-9/10 text-sm pl-1 font-bold capitalize">
                   {data.name}
                </p>
                <input
                  className={`text-sm border p-1 w-12 text-center rounded-lg ${indexes.includes(i) ? "bg-accent text-primary font-bold" : "bg-primary/70 text-primary"} focus:outline-none focus:border-green-500`}
                  type="text"
                  defaultValue={data.limit}
                  data-index={i}
                  onInput={inputController}
                  disabled={!indexes.includes(i)}
                  autoComplete="off"
                />
              </div>
              <p className="text-sm px-2 pt-1 capitalize">
                <span className="font-bold">description</span>:{" "}
                {data.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ZhikrInitial;
