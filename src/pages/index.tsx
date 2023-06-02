import { Inter } from "next/font/google";
import AddTasks from "./components/todo-list/AddTasks.component";
import TasksListing from "./components/todo-list/TasksListing.component";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} w-screen h-screen  bg-gray-800 text-gray-300 flex items-start justify-center p-8 overflow-hidden `}
    >
      <section className=" w-full lg:w-2/3 xl:w-[900px] 2xl:w-[80%] border px-3 rounded-md">
        <section className="text-center text-gray-300 font-bold   tracking-wider py-5  underline uppercase text-xl">
          Todo list app
        </section>
        <AddTasks />
        <TasksListing />
      </section>
    </main>
  );
}
