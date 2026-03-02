import { useEffect, useRef, useState } from "react";
import scheduler from "../utils/calendarScheduler";
import Alert from "./Alert";
import useRefresh from "../hooks/useRefresh";
import useStore from "../store/useStore";
import Button from "./Button";
import { CheckCheck, Loader, X } from "lucide-react";

const Calender = ({ data }) => {
  const store = useStore();
  const [maxDays, grigorian, days, today, starter, updatedData] = scheduler(
    Number(store.user.today),
    data,
  );
  const [focused, setFocused] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState(true);
  let timeout = null;

  const todayInput = useRef();

  const updateBtn = useRef();
  const [focus, setFocus] = useState("initial");

  const inputController = (e) => {
    const elem = e.target;
    const curr = elem.value[elem.value.length - 1];

    const numbers = Array.from({ length: 10 }, (_, i) => `${i}`);
    if (!numbers.includes(curr)) {
      elem.value = elem.value.slice(0, elem.value.length - 1);
    }
  };

  const submitter = async (e) => {
    if (focus != "focus") return;
    if (e.key) {
      if (e.key != "Enter") return;
    }
    setFocus("load");

    const elem = todayInput.current;

    const value = Number(elem.value);
    const day = elem.dataset.day;

    if (day != today) return;

    try {
      const res = await useRefresh("/quran/tick", "put", {
        year: `${new Date().getFullYear()}`,
        date: `${today}`,
        amount: value,
      });

      store.setSingleDayQuran(res.data);
      store.setTodayProgress(res.progress.today);
      store.setTotalProgress(res.progress.total);
      store.setQuranProgress(res.progress.quran);
      if (timeout) {
        clearTimeout(timeout);
      }

      setType(true);
      setFocused(true);
      setMsg("Todays data has been updated");
      setFocus("update");

      setTimeout(() => {
        setFocus("initial");
      }, 3000);
      timeout = setTimeout(() => {
        setFocused(false);
        timeout = null;
      }, 5000);
    } catch (error) {
      if (timeout) {
        clearTimeout(timeout);
      }

      setFocus("fail");

      setTimeout(() => {
        setFocus("initial");
      }, 3000);

      setType(false);
      setFocused(true);
      setMsg(error.message);
      timeout = setTimeout(() => {
        setFocused(false);
        timeout = null;
      }, 5000);
    }
  };

  document.body.addEventListener("click", (e) => {
    const updateElems = [];
    if (updateBtn.current) {
      const elems = updateBtn.current.querySelectorAll("button");

      elems.forEach((btn) => {
        updateElems.push(btn);
      });
    }
    if (
      e.target != todayInput.current &&
      e.target != updateBtn.current &&
      !updateElems.includes(e.target)
    ) {
      setFocus("initial");
    }
  });

  return (
    <section className="flex flex-col items-center gap-1 rounded-xl p-1">
      <div
        ref={updateBtn}
        className={`transition duration-300
          ${focus != "initial" ? "opacity-100" : "opacity-30"}
          `}
        onClick={submitter}
      >
        <Button>
          {focus == "load" ? (
            <Loader className="animate-spin" />
          ) : focus == "update" ? (
            <CheckCheck />
          ) : focus == "fail" ? (
            <X />
          ) : (
            "Update"
          )}
        </Button>
      </div>
      <Alert msg={msg} type={type} on={focused} />
      <section className="flex gap-1 rounded-xl p-1">
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
        <section className="grid grid-cols-5 grid-rows-7 grid-flow-col gap-1 gap-y-3 animate-auth">
          {maxDays.map((day, i) => (
            <div
              key={i}
              className={`relative w-full ${i < starter || i > 29 + starter ? "text-second/50" : "text-second"}`}
            >
              <input
                className={`w-full h-full border rounded-lg text-center focus:outline-none 
                    ${today == maxDays[i] && i >= starter && i <= 29 + starter ? "border-confirm text-primary font-bold shadow-[0_0_0.4rem_var(--color-confirm)] bg-confirm/80 text-sm animate-cta-2" : ""}
                    `}
                defaultValue={updatedData[i]?.amount}
                readOnly={today != maxDays[i]}
                autoComplete="off"
                type="text"
                disabled={i < starter || i > 29 + starter}
                onInput={inputController}
                onClick={
                  today == maxDays[i] && i >= starter && i <= 29 + starter
                    ? () => setFocus("focus")
                    : () => {}
                }

                ref={
                  today == maxDays[i] && i >= starter && i <= 29 + starter
                    ? todayInput
                    : null
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
      </section>
    </section>
  );
};

export default Calender;
