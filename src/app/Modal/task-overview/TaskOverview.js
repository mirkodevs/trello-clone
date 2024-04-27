"use client";
import classes from "./task-overview.module.css";
import { useContext } from "react";
import TaskContext from "../../../../context/currentTaskContext";
import { months } from "../../../../lib/constant";
export default function TaskOverview({ task }) {
  const dateArray = task.created_at.split(" ")[0].split("-");
  const displayDate = months[+dateArray[1] - 1] + " " + dateArray[2];

  return (
    <div className={classes.overview}>
      <h2>{task.title}</h2>
      
      <p>{task.description}</p>
<p>
  created_at :  
<time> {displayDate}</time>
</p>

    </div>
  );
}
