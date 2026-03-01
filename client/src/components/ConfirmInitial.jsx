import useStore from "../store/useStore";

const ConfirmInitial = ({ curr }) => {
  const store = useStore();

  return (
    <div className="text-second">
      <section className="p-4">
        <h2 className="pb-2 text-center font-bold text-2xl capitalize animate-down">
          {store.user.name}
        </h2>
        <p className="text-center text-sm mx-auto pb-3 max-w-75 font-bold animate-auth">
          Aselamu Aleykum Werahmetullahi Weberekatuh
        </p>

        <p className="text-center text-sm animate-opp">
          May allah accept all your worships
        </p>
        <p className="bg-second text-primary text-sm text-center p-2 max-w-70 mx-auto my-2 rounded-2xl shadow-[0_0_0.2rem_var(--color-accent)] animate-cta capitalize font-bold">
          don't forget me in your Dua 🙏
        </p>
      </section>
      <section className="py-4 mb-12 flex flex-col gap-2">
        <h2 className="text-center font-bold text-lg animate-days">
          Please confirm your commitment.
        </h2>
        <article className="border border-accent overflow-hidden rounded-xl animate-down">
          <h3 className="font-bold bg-accent text-primary p-2">Quran</h3>
          <p className="text-sm px-2 pb-2 pt-1">
            You have chosen to complete {curr.khitam} khitam(s).
            <br />
            To achieve this, you will need to read approximately{" "}
            {curr.khitam * 21} pages per day.
          </p>
        </article>
        <article className="border animate-down opacity-0 [animation-delay:100ms] border-accent overflow-hidden rounded-xl">
          <h3 className="font-bold bg-accent text-primary p-2">Zhikr</h3>
          <section className="text-sm px-2 pb-2 pt-1">
            <h4 className="text-center p-2 animate-opp [animation-delay:150ms] opacity-0">
              You have selected the following adhkars.
            </h4>
            <ul className="flex flex-col gap-1">
              {curr.zhikr.map((zhi, i) => (
                <li
                  style={{
                    animationDelay: `${i * 100 + 90}ms`,
                  }}
                  key={i}
                  className="border border-accent/40 rounded-xl p-1 flex justify-between items-center font-bold animate-days opacity-0"
                >
                  <span className="capitalize">{zhi.name}</span>{" "}
                  <span className="bg-accent/20 p-1 rounded-lg">
                    {zhi.limit} times
                  </span>
                </li>
              ))}
            </ul>
            <div className="p-2 text-center animate-opp">
              Small remembrance, done consistently, brings great reward. Please
              confirm to begin tracking.
              <p className="p-4 bg-second/10 m-1 rounded-lg animate-down opacity-0 [animation-delay:100ms]">
                I have been added those essential zhikrs on your plan. May Allah
                accept our worship.
              </p>
              <div className="flex flex-col gap-2 xs:flex-row items-center justify-center p-2">
                {["night zhikr", "morning zhikr", "evening zhikr"].map(
                  (zhikr, i) => (
                    <button
                    style={{
                  animationDelay: `${(i * 100) + 100}ms`
                }}
                      key={i}
                      className="bg-accent text-primary font-bold border-second border p-1 rounded-lg min-w-25 capitalize animate-days-2 opacity-0"
                    >
                      {zhikr}
                    </button>
                  ),
                )}
              </div>
            </div>
          </section>
        </article>
        <article className="border border-accent overflow-hidden rounded-xl animate-down">
          <h3 className="font-bold bg-accent text-primary p-2">Terawih</h3>
          <p className="text-sm px-2 pb-2 pt-1">
            You plan to pray {curr.terawih} nights of Terawih. May Allah give
            you strength and accept every raka’ah.
          </p>
        </article>
      </section>
    </div>
  );
};

export default ConfirmInitial;
