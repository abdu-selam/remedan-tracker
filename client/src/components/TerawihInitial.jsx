import { Moon } from "lucide-react";

const TerawihInitial = ({ func, curr }) => {
  const clickController = (e) => {
    const data = e.target.dataset.num;
    func((prev) => ({
      ...prev,
      terawih: Number(data),
    }));
  };

  return (
    <div className="text-second">
      <header className="flex flex-col items-center gap-2 mb-6 mt-12 animate-down">
        <h1 className="text-2xl text-center font-bold">
          <Moon className="inline"/> {' '} Nights of Standing
        </h1>
        <p className="text-sm max-w-120 text-center animate-days">
         In the quiet of Ramadan nights, every raka’ah becomes a gentle conversation with your Lord. Terawih is devotion rising in the dark, strengthening faith one step at a time.
        </p>
      </header>
      <hr className="border-2 border-accent rounded-2xl w-1/2 mx-auto" />
      <main className="flex flex-col items-center gap-4 mt-6 mb-20">
        <h2 className="text-lg text-center font-bold mb-8 animate-auth">Please choose the number of days you wish to pray.</h2>
        <section className="grid grid-cols-2 xsl:grid-cols-3 place-items-center w-full gap-2">
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
            "eleven",
            "twelve",
            "thirteen",
            "fourteen",
            "fifteen",
            "sixteen",
            "seventeen",
            "eighteen",
            "nineteen",
            "twenty",
            "twenty one",
            "twenty two",
            "twenty three",
            "twenty four",
            "twenty five",
            "twenty six",
            "twenty seven",
            "twenty eight",
            "twenty nine",
          ].map((num, i) => (
            <div key={i} className="flex gap-4">
              <button
                onClick={clickController}
                data-num={i + 1}
                style={{
                  animationDelay: `${i * 50}ms`
                }}
                className={` animate-days-2 opacity-0 font-bold h-max transition duration-300 min-w-27 rounded-sm py-1 ${i + 1 == curr ? "bg-accent text-primary" : "bg-second text-primary"} capitalize text-sm`}
              >
                {num}
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TerawihInitial;
