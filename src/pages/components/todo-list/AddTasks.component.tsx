import { addToStorage } from "@/utils/addToStorage.utils";
import React, { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
export default function AddTasks() {
  const [task, setTask] = useState("");
  const router = useRouter();
  const isDisabled = task.length === 0;
  function handleAddTasks() {
    let obj = {
      id: uuid(),
      text: task,
      state: "new",
      created: new Date(),
      updated: undefined,
    };
    addToStorage("tasks", obj);
    setTask(""); // make the input empty
    window.dispatchEvent(new Event("storage"));
  }
  function handleChangeTaskField(e: FormEvent<HTMLInputElement>) {
    setTask(e.currentTarget.value);
  }

  return (
    <section className="w-full  grid items-center grid-cols-4 gap-x-4">
      <input
        onChange={handleChangeTaskField}
        value={task}
        type="text"
        placeholder="Add You Task"
        onKeyDown={(e: any) => {
          if (e.keyCode === 13) {
            handleAddTasks();
          }
        }}
        className=" col-span-3 p-1.5 rounded-md  outline-none focus:outline-none text-gray-300 tracking-wider shadow hover:shadow-md bg-gray-200/20 "
      />
      <button
        onClick={handleAddTasks}
        disabled={isDisabled}
        className="py-1.5 rounded-md font-semibold bg-lime-600 hover:bg-lime-600/90 shaodw hover:shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed "
      >
        Add
      </button>
    </section>
  );
}
