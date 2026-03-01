import { BookOpen } from "lucide-react";

const KhitamInitial = ({ func, curr }) => {
  const clickController = (e) => {
    const data = e.target.dataset.num;
    func((prev) => ({
      ...prev,
      khitam: Number(data),
    }));
  };

  return (
    <div>
      <header className="flex flex-col items-center gap-2 mt-12 mb-6 text-second">
        <h1 className="text-2xl font-bold text-center animate-down">
          <BookOpen className="inline" /> Light of the Qur’an in Ramadan
        </h1>
        <p className="text-sm max-w-120 text-center animate-days">
          In these blessed nights, every verse feels softer and closer to the
          heart. The Qur’an becomes light in darkness, comfort in silence, and
          guidance with every page turned.
        </p>
      </header>
      <hr className="border-2 border-accent rounded-2xl w-1/2 mx-auto" />
      <main className="flex flex-col items-center gap-4 mt-6 mb-16 text-second">
        <h2 className="text-lg font-bold text-center animate-auth">
          How Many Times Do You Want to Complete (Khitam)?
        </h2>
        <section className="flex flex-col gap-2">
          {[
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
          ].map((num, i) => (
            <div key={i} className="flex gap-4">
              <button
                onClick={clickController}
                data-num={i + 1}
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
                className={`hover:shadow-[0_0_0.4rem_var(--color-second)] font-bold text-sm h-max transition duration-300 min-w-16 rounded-sm py-1 ${i + 1 == curr ? "bg-accent text-primary" : "bg-second text-primary"} capitalize transition duration-300 animate-days opacity-0`}
              >
                {num}
              </button>
              <p
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
                className={`max-w-80 border text-sm rounded-lg p-2 ${i + 1 == curr ? "border-accent text-accent" : "border-accent/10 text-second"} animate-down`}
              >
                May Allah accept your worship. You are encouraged to recite{" "}
                <span className="font-bold">{21 * (i + 1)}</span> pages each
                day.
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default KhitamInitial;
