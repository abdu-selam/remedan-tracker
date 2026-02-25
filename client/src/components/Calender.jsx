import scheduler from "../utils/calendarScheduler";

const Calender = () => {
  const [maxDays, grigorian, days, today, starter] = scheduler(8);

  return (
    <section className="flex gap-1 border rounded-xl p-2">
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
      <section className="grid grid-cols-5 grid-rows-7 grid-flow-col gap-1 gap-y-3">
        {maxDays.map((day, i) => (
          <div
            className={`relative w-full ${i < starter || i > 29 + starter ? "text-black/50" : "text-black"}`}
          >
            <input
              key={i}
              className={`w-full h-full border rounded-lg text-center focus:outline-none 
                    ${today == maxDays[i] && i >= starter && i <= 29 + starter ? "border-green-600 text-green-600" : ""}
                    `}
              defaultValue={day}
              readOnly={today != maxDays[i]}
              type="text"
              disabled={i < starter || i > 29 + starter}
            />
            <p className="absolute bg-black text-white w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full -right-2/5 -bottom-4/9 -translate-1/2">
              {grigorian[i]}
            </p>
            <p className="absolute bg-green-500 text-white w-4 text-[0.5rem] z-10 aspect-square grid place-content-center border rounded-full left-1/10 top-1/8 -translate-1/2">
              {maxDays[i]}
            </p>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Calender;
