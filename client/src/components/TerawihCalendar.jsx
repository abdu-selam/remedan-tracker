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
            style={{
              animationDelay: `${i * 100}ms`
            }}
            className={`grid place-content-center border font-bold text-[0.65rem] rounded-lg p-1 py-2 w-16 bg-second/20 animate-days opacity-0`}
            key={i}
          >
            {day}
          </div>
        ))}
      </section>
      <section className="grid grow grid-cols-5 grid-rows-7 grid-flow-col gap-1 gap-y-3 animate-auth">
        {maxDays.map((day, i) => (
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
        ))}
      </section>
    </section>
  );
};

export default TerawihCalendar;
