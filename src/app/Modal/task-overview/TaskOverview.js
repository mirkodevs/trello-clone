
'use client'
import classes from "./task-overview.module.css";
import { useContext } from "react";
import TaskContext from "../../../../context/currentTaskContext";

export default function TaskOverview({task}) {
  return (
    <div>
      <h2>{task.title}

      </h2>
    </div>
  );
}
