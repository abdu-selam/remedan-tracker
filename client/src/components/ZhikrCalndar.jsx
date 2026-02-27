import { useEffect, useRef, useState } from "react";
import scheduler from "../utils/calendarScheduler";
import Alert from "./Alert";
import api from "../config/api.config";
import useRefresh from "../hooks/useRefresh";
import useStore from "../store/useStore";
import { Check, X } from "lucide-react";

const ZhikrCalndar = ({ data, curr }) => {
  const store = useStore();
  const [maxDays, grigorian, days, today, starter, updatedData] = scheduler(
    Number(store.user.today),
    data,
    "zhikr",
    curr,
  );
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
            className="grid place-content-center border font-bold text-[0.6rem] rounded-lg p-1 py-2 w-16"
            key={i}
          >
            {day}
          </div>
        ))}
      </section>
      <section className="grid w-full grid-cols-5 grid-rows-7 grid-flow-col gap-1 gap-y-3">
        {["night", "morning", "sleep"].includes(curr)
          ? maxDays.map((day, i) => (
              <div
                key={i}
                className={`relative w-full ${i < starter || i > 29 + starter ? "text-black/50" : "text-black"}`}
              >
                <div
                  className={`w-full h-full border rounded-lg text-center grid place-content-center 
                    ${today == maxDays[i] && i >= starter && i <= 29 + starter ? "border-green-600 text-green-600" : ""}
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
                  ${i < starter || i > 29 + starter ? "bg-black/40 text-black/0" : today == maxDays[i] && i >= starter && i <= 29 + starter ? "bg-green-500 text-white" : "bg-green-500/50 text-white"}
                  `}
                    ></Check>
                  ) : (
                    <X
                      className={`w-4 h-4 p-0.5 rounded-full 
                  ${i < starter || i > 29 + starter ? "bg-black/40 text-black/0" : today == maxDays[i] && i >= starter && i <= 29 + starter ? "bg-red-500 text-white" : "bg-red-500/50 text-white"}
                  `}
                    ></X>
                  )}
                </div>
                <p
                  className={`absolute w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full -right-2/5 -bottom-4/9 -translate-1/2
              ${i < starter || i > 29 + starter ? "bg-neutral-400 text-white" : "bg-black text-white"}
              `}
                >
                  {grigorian[i]}
                </p>
                <p
                  className={`absolute w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full left-1/10 top-1/8 -translate-1/2
              ${i < starter || i > 29 + starter ? "bg-green-300 text-white" : "bg-green-500 text-white"}
              `}
                >
                  {day}
                </p>
              </div>
            ))
          : maxDays.map((day, i) => (
              <div
                key={i}
                className={`relative w-full ${i < starter || i > 29 + starter ? "text-black/50" : "text-black"}`}
              >
                <input
                  className={`w-full h-full border rounded-lg text-center focus:outline-none zhikr-input
                    ${today == maxDays[i] && i >= starter && i <= 29 + starter ? "border-green-600 text-green-600" : ""}
                    `}
                  value={updatedData[i]?.amount ?? ""}
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
                  className={`absolute w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full -right-2/5 -bottom-4/9 -translate-1/2
              ${i < starter || i > 29 + starter ? "bg-neutral-400 text-white" : "bg-black text-white"}
              `}
                >
                  {grigorian[i]}
                </p>
                <p
                  className={`absolute w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full left-1/10 top-1/8 -translate-1/2
              ${i < starter || i > 29 + starter ? "bg-green-300 text-white" : "bg-green-500 text-white"}
              `}
                >
                  {day}
                </p>
              </div>
            ))}
      </section>
    </section>
  );
};

export default ZhikrCalndar;
