import { useEffect, useRef, useState } from "react";
import scheduler from "../utils/calendarScheduler";
import Alert from "./Alert";
import useRefresh from "../hooks/useRefresh";
import useStore from "../store/useStore";
import { Check, X } from "lucide-react";
import Loading from "./Loading";

const ZhikrCalndar = ({ curr }) => {
  const store = useStore();
  const data = store.user.ibada.zhikr.data;
  const [maxDays, setMaxDays] = useState([]);
  const [grigorian, setGrigorian] = useState([]);
  const [days, setDays] = useState([]);
  const [today, setToday] = useState(0);
  const [starter, setStarter] = useState(0);
  const [updatedData, setUpdatedData] = useState([]);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    const [maxDays, grigorian, days, today, starter, updatedData] = scheduler(
      Number(store.user.today),
      data,
      "zhikr",
      curr,
    );

    setMaxDays(maxDays);
    setGrigorian(grigorian);
    setDays(days);
    setToday(today);
    setStarter(starter);
    setUpdatedData(updatedData);

    setTimeout(() => {
      setLoad(false);
    }, 100);
  }, [curr]);

  const divRef = useRef();

  const [focused, setFocused] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState(true);
  let timeout = null;

  const inputController = (e) => {
    const elem = e.target;
    const curr = elem.value[elem.value.length - 1];

    const numbers = Array.from({ length: 10 }, (_, i) => `${i}`);
    if (!numbers.includes(curr)) {
      elem.value = elem.value.slice(0, elem.value.length - 1);
    }
  };

  const focusController = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (focused) return;
    setType(true);
    setFocused(true);
    setMsg("Type Enter to save your progress");
    timeout = setTimeout(() => {
      setFocused(false);
      timeout = null;
    }, 5000);
  };

  const submitter = async (e) => {
    const isSpecial = ["night", "morning", "sleep"].includes(curr);
    if (e.key != "Enter" && !isSpecial) return;
    const target = isSpecial ? divRef.current : null;

    const value = isSpecial
      ? target.dataset.val == "false"
      : Number(e.target.value);
    const day = isSpecial ? target.dataset.day : e.target.dataset.day;

    const dataI = target ? Number(target.dataset.i) : null;

    if (day != today) return;

    try {
      const res = await useRefresh("/zhikr/tick", "put", {
        year: `${new Date().getFullYear()}`,
        date: `${today}`,
        amount: value,
        name: curr,
      });

      store.setSingleDayZhikr(res.data);
      store.setTodayProgress(res.progress.today);
      store.setTotalProgress(res.progress.total);
      store.setZhikrProgress(res.progress.zhikr);
      if (isSpecial) {
        updatedData[dataI].amount = res.data.amount;
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      setType(true);
      setFocused(true);
      setMsg("Todays data has been updated");
      timeout = setTimeout(() => {
        setFocused(false);
        timeout = null;
      }, 5000);
    } catch (error) {
      if (timeout) {
        clearTimeout(timeout);
      }

      setType(false);
      setFocused(true);
      setMsg(error.message);
      timeout = setTimeout(() => {
        setFocused(false);
        timeout = null;
      }, 5000);
    }
  };

  return (
    <section className="flex gap-1 border rounded-xl p-2">
      <Alert msg={msg} type={type} on={focused} />
      <section className="flex flex-col gap-3">
        {days.map((day, i) => (
          <div
            style={{
              animationDelay: `${i * 100}ms`,
            }}
            className={`grid place-content-center border font-bold text-[0.65rem] rounded-lg p-1 py-2 w-16 bg-second/20 animate-days opacity-0`}
            key={i}
          >
            {day}
          </div>
        ))}
      </section>
      {load ? (
        <section className="w-full">
          <Loading dashboard={true} />
        </section>
      ) : (
        <section className="grid w-full grid-cols-5 grid-rows-7 grid-flow-col gap-1 gap-y-3 animate-auth">
          {["night", "morning", "sleep"].includes(curr)
            ? maxDays.map((day, i) => (
                <div
                  key={i}
                  className={`relative w-full ${i < starter || i > 29 + starter ? "text-second/50" : "text-second"}`}
                >
                  <div
                    className={`w-full h-full border rounded-lg text-center grid place-content-center 
                    ${today == maxDays[i] && i >= starter && i <= 29 + starter ? "border-confirm text-confirm  shadow-[0_0_0.4rem_var(--color-confirm)] animate-cta-2" : ""}
                    `}
                    data-day={day}
                    data-i={i}
                    data-val={updatedData[i]?.amount != 0}
                    onClick={
                      today == maxDays[i] && i >= starter && i <= 29 + starter
                        ? submitter
                        : () => {}
                    }
                    ref={
                      today == maxDays[i] && i >= starter && i <= 29 + starter
                        ? divRef
                        : null
                    }
                  >
                    {updatedData[i]?.amount ? (
                      <Check
                        className={`w-4 h-4 p-0.5 rounded-full
                  ${i < starter || i > 29 + starter ? "bg-black/40 text-black/0" : today == maxDays[i] && i >= starter && i <= 29 + starter ? "bg-confirm text-second" : "bg-confirm/50 text-second"}
                  `}
                      ></Check>
                    ) : (
                      <X
                        className={`w-4 h-4 p-0.5 rounded-full 
                  ${i < starter || i > 29 + starter ? "bg-black/40 text-black/0" : today == maxDays[i] && i >= starter && i <= 29 + starter ? "bg-denied text-second" : "bg-denied/50 text-second"}
                  `}
                      ></X>
                    )}
                  </div>
                  <p
                    className={`absolute w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full -right-2/5 -bottom-4/9 -translate-1/2 font-bold
              ${i < starter || i > 29 + starter ? "bg-second/80 text-primary" : "bg-second text-primary"}
              `}
                  >
                    {grigorian[i]}
                  </p>
                  <p
                    className={`absolute font-bold w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full left-1/10 top-1/8 -translate-1/2
              ${i < starter || i > 29 + starter ? "bg-accent text-primary" : "bg-confirm text-primary"}
              `}
                  >
                    {day}
                  </p>
                </div>
              ))
            : maxDays.map((day, i) => (
                <div
                  key={i}
                  className={`relative w-full ${i < starter || i > 29 + starter ? "text-second/50" : "text-second"}`}
                >
                  <input
                    className={`w-full h-full border rounded-lg text-center focus:outline-none zhikr-input
                    ${today == maxDays[i] && i >= starter && i <= 29 + starter ? "border-confirm text-confirm shadow-[0_0_0.4rem_var(--color-confirm)] animate-cta-2" : ""}
                    `}
                    autoComplete="off"
                    defaultValue={updatedData[i]?.amount ?? ""}
                    readOnly={today != maxDays[i]}
                    type="text"
                    disabled={i < starter || i > 29 + starter}
                    onInput={inputController}
                    onFocus={
                      today == maxDays[i] && i >= starter && i <= 29 + starter
                        ? focusController
                        : () => {}
                    }
                    data-day={day}
                    onKeyDown={submitter}
                  />
                  <p
                    className={`absolute w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full -right-2/5 -bottom-4/9 -translate-1/2 font-bold
              ${i < starter || i > 29 + starter ? "bg-second/80 text-primary" : "bg-second text-primary"}
              `}
                  >
                    {grigorian[i]}
                  </p>
                  <p
                    className={`absolute font-bold w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full left-1/10 top-1/8 -translate-1/2
              ${i < starter || i > 29 + starter ? "bg-accent text-primary" : "bg-confirm text-primary"}
              `}
                  >
                    {day}
                  </p>
                </div>
              ))}
        </section>
      )}
    </section>
  );
};

export default ZhikrCalndar;
