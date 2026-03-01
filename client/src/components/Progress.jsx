import React from "react";

const Progress = ({curr, max, percent}) => {
  return (
    <div className="text-xs flex w-full flex-col gap-1">
      <div className="flex justify-between px-2">
        <p>{curr} {percent ? '%': ''}</p>
        <p>{max} {percent ? '%': ''}</p>
      </div>
      <div className="w-full h-2 overflow-hidden border border-accent rounded-2xl bg-accent">
        <div
          className="origin-left animate-progress w-full h-full bg-primary transition duration-300"
          style={{
            transform: `scaleX(${(curr / max)})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
