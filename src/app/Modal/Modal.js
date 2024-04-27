"use client";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import classes from "./modal.module.css";
import NewProject from "./new-proj/NewProject";
import NewTask from "./new-task/NewTask";
import TaskOverview from "./task-overview/TaskOverview";
import Link from "next/link";
import { useContext } from "react";
import TaskContext from "../../../context/currentTaskContext";
const Modal = (props, ref) => {
  const searchParams = useSearchParams();
  const isAddingProject = searchParams.get("add-project");
  const isAddingTask = searchParams.get("add-task");
  const pathname = usePathname();


  const {currentTask,setCurrentTask} = useContext(TaskContext)

  return (
    (isAddingProject || isAddingTask || currentTask) && (
      <dialog className={classes.dialog}>
        <div className={classes.content}>
        <Link onClick={() => currentTask && setCurrentTask()} href={pathname} className={classes.close}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-x"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </Link>
          {isAddingProject && <NewProject />}
          {isAddingTask && <NewTask list={isAddingTask}/>}
          {currentTask && <TaskOverview task = {currentTask}/>}
        </div>
      </dialog>
    )
  );
};
export default Modal;
