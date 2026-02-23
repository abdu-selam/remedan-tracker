import React from "react";

const Progress = ({curr, max, percent}) => {
  return (
    <div className="text-xs flex w-full flex-col gap-1">
      <div className="flex justify-between px-2">
        <p>{curr} {percent ? '%': ''}</p>
        <p>{max} {percent ? '%': ''}</p>
      </div>
      <div className="w-full h-2 overflow-hidden rounded-2xl bg-amber-200">
        <div
          className="animate-progress h-full bg-black rounded-2xl"
          style={{
            width: `${(curr / max) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
