"use client";
import { getTasks } from "@/utils/getTasks.utils";
import React, { FormEvent, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";

import Status from "./Status.component";
import { deleteTask } from "@/utils/deleteTask";
import { updateTask } from "@/utils/updateTask";
export default function TasksListing() {
  const isClient = typeof window !== "undefined";
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks("tasks"));
    function handleGetTasks(event: any) {
      setTasks(getTasks("tasks"));
    }
    window.addEventListener("storage", handleGetTasks);
    return () => {
      window.removeEventListener("storage", handleGetTasks);
    };
  }, [tasks.length, isClient]);

  function handleSort(a: any) {
    if (a.state === "done") return 1;
    else return -1;
  }
  if (tasks.length === 0) {
    return (
      <section className="my-6 border py-2 text-center rounded-md">
        {"You Don't have any task..."}
      </section>
    );
  }
  return (
    <section className="max-h-[80vh] my-3 px-3 overflow-x-auto     ">
      <div className="w-full space-y-2 my-5 ">
        {tasks.sort(handleSort).map((item: any) => (
          <div
            key={item.id}
            className={`w-full even:bg-slate-700 py-2 rounded-md px-2    hover:bg-slate-600 flex items-center justify-between ${
              item.state === "done" ? "line-through opacity-70" : ""
            }`}
          >
            <div className="flex items-center  gap-x-4">
              <AiOutlineCheckCircle
                className={`${
                  item.state === "done" ? "text-green-500" : "text-gray-400"
                } cursor-pointer`}
                size="1.4rem"
                role="change state"
                onClick={() => {
                  updateTask("tasks", {
                    ...item,
                    state: item.state === "new" ? "done" : "new",
                    updated: new Date(),
                  });
                  window.dispatchEvent(new Event("storage"));
                }}
              />
              <input
                type="text"
                defaultValue={item.text}
                onBlur={(e: FormEvent<HTMLInputElement>) => {
                  updateTask("tasks", {
                    ...item,
                    text: e.currentTarget.value,
                    updated: new Date(),
                  });
                  window.dispatchEvent(new Event("storage"));
                }}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 13) {
                    e?.target?.blur();
                  }
                }}
                className=" appearance-none bg-transparent  focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500 rounded-md px-2"
              />
            </div>
            <div className="flex items-center gap-x-3">
              <div
                className={`flex flex-col items-center gap-x-2 text-xs ${
                  item.updated ? "text-yellow-500" : "text-green-500"
                }`}
              >
                <div> {item.updated ? "updated" : "created"}</div>
                {item.updated
                  ? new Date(item.updated).toLocaleTimeString()
                  : new Date(item.created).toLocaleTimeString()}
              </div>
              <Status state={item.state} />

              <AiOutlineDelete
                className="text-red-400 cursor-pointer"
                size="1.4rem"
                role="delete"
                onClick={() => {
                  deleteTask("tasks", item.id);
                  window.dispatchEvent(new Event("storage"));
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
