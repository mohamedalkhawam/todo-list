import React from "react";

export default function Status({ state }: any) {
  const states: any = {
    new: "bg-blue-400",
    done: "bg-green-400",
    deleted: "bg-red-400",
  };
  return (
    <div className="flex items-center gap-x-2 ">
      <div className={`w-2 h-2 rounded-full /animate-pulse ${states[state]}`} />
      <div className="text-sm">{state}</div>
    </div>
  );
}
