import { Check, X } from "lucide-react";
import scheduler from "../utils/calendarScheduler";
import useStore from "../store/useStore";
import { useRef, useState } from "react";
import Alert from "./Alert";
import useRefresh from "../hooks/useRefresh";
import api from "../config/api.config";

const TerawihCalendar = ({ data }) => {
  const store = useStore();
  const [maxDays, grigorian, days, today, starter, updatedData] = scheduler(
    Number(store.user.today),
    data,
    "terawih",
  );
  const divRef = useRef();
  const [focused, setFocused] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState(true);
  let timeout = null;

  const submitter = async (e) => {
    const target = divRef.current;
    const value = target.dataset.val == "false";
    const day = target.dataset.day;
    const dataI = target.dataset.i;

    if (day != today) return;

    try {
      const res = await useRefresh("/terawih/tick", "put", {
        year: `${new Date().getFullYear()}`,
        date: `${today}`,
        ticked: value,
      });

      store.setSingleDayTerawih(res.data);
      store.setTodayProgress(res.progress.today);
      store.setTotalProgress(res.progress.total);
      store.setTerawihProgress(res.progress.terawih);
      updatedData[dataI].done = !updatedData[dataI].done;
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
      <section className="grid grow grid-cols-5 grid-rows-7 grid-flow-col gap-1 gap-y-3">
        {maxDays.map((day, i) => (
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
              data-val={updatedData[i]?.done}
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
              {updatedData[i]?.done ? (
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
        ))}
      </section>
    </section>
  );
};

export default TerawihCalendar;
