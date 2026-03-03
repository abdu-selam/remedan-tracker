import { useEffect, useRef, useState } from "react";
import { useLocalStore } from "../store/useStore";
import useRefresh from "../hooks/useRefresh";
import { Loader } from "lucide-react";

const Teacher = ({ page }) => {
  const ref = useRef();
  const btnRef = useRef();

  const updateStore = useLocalStore();
  const updatedDatas = updateStore.updated;
  const setUpdated = updateStore.setUpdated;

  const [load, setLoad] = useState(false);

  const data = page == "quran" ? updateStore.dashboard : updateStore.zhikr;

  const index =
    page == "quran"
      ? updatedDatas.filter((ud) => ["in", "nav", "prog"].includes(ud)).length
      : updatedDatas.filter((ud) => ["menu"].includes(ud)).length;

  const text = data[index]?.text;

  const style = data[index]?.style;

  const [curr, setCurr] = useState("flex");

  useEffect(() => {
    const submitter = async () => {
      if (curr == "flex") {
        if (page == "quran") {
          if (["in", "nav", "prog"].every((ud) => updatedDatas.includes(ud))) {
            setCurr("hidden");
          }
        } else if (page == "zhikr") {
          if (["menu"].every((ud) => updatedDatas.includes(ud))) {
            setCurr("hidden");
          }
        }

        return;
      }
      const elem = ref.current;

      const quran = ["in", "nav", "prog"];
      const zhikr = ["menu"];

      if (
        page == "quran" &&
        updatedDatas.filter((ud) => ["in", "nav", "prog"].includes(ud)).length <
          3
      ) {
        const i = updatedDatas.filter((ud) =>
          ["in", "nav", "prog"].includes(ud),
        ).length;
        try {
          setLoad(true);
          await useRefresh("/user/updated", "put", {
            updated: quran[i],
          });
          setUpdated([quran[i]]);
          setLoad(false);
        } catch (error) {
          console.log(error);
        }
      } else if (
        page == "zhikr" &&
        updatedDatas.filter((ud) => ["menu"].includes(ud)).length < 1
      ) {
        const i = updatedDatas.filter((ud) => ["menu"].includes(ud)).length;
        try {
          setLoad(true);
          await useRefresh("/user/updated", "put", {
            updated: zhikr[i],
          });
          setUpdated([zhikr[i]]);
          setLoad(false);
        } catch (error) {
          console.log(error);
        }
      }

      setTimeout(() => {
        if (updatedDatas.length < 2) {
          setCurr("flex");
        }
      }, 300);
    };

    submitter();
  }, [curr]);

  document.body.addEventListener("click", (e) => {
    if (e.target != btnRef.current) {
      e.stopPropagation();
    }
  });

  return (
    <div
      ref={ref}
      className={`h-dvh max-w-95 w-screen fixed top-0 left-1/2 -translate-x-1/2 z-10000 animate-opp transition duration-300 opacity-100 bg-primary/40 ${curr == "hidden" ? "hidden" : "block"}`}
    >
      <div
        className={`absolute ${style} animate-auth bg-primary text-second p-2 rounded-lg border border-confirm shadow-[0_0_0.5rem_var(--color-confirm)] capitalize max-w-65 flex gap-2 flex-col items-center`}
      >
        <p className="text-[0.7rem]">{text}</p>
        <button
          ref={btnRef}
          onClick={() => {
            if (load) return;
            setCurr("hidden");
          }}
          className="bg-second text-primary px-4 py-1 text-sm shadow-[0_0_0.5rem_var(--color-confirm)] rounded-lg self-end"
        >
          {load ? <Loader className="animate-spin" /> : "Okay"}
        </button>
      </div>
    </div>
  );
};

export default Teacher;
