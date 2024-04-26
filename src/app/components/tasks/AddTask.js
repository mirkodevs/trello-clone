import classes from "./tasks.module.css";
import Link from "next/link";
export default function AddTask() {
  return (
    <Link 
    href={"?add-task=true"} 
    className={classes.addTask}>
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
        className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>
      <span style={{ margin: "auto 0" }}>add task</span>
    </Link>
  );
}
