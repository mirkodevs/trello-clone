"use client";
import classes from "./tasks.module.css";
import dragTypes from "../../../../lib/drag-types";
import { useDrag } from "react-dnd";
import { useContext, useEffect } from "react";
import TaskContext from "../../../../context/currentTaskContext";
import { months } from "../../../../lib/constant";

export default function OneTask({ task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragTypes.DONE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const { currentTask, setCurrentTask } = useContext(TaskContext);

  function handleSelectTask() {
    setCurrentTask(task);
  }
  const dateArray = task.created_at.split(" ")[0].split("-");

const displayDate = months[+dateArray[1] - 1] + " " +dateArray[2]

  return (
    <div
      onClick={handleSelectTask}
      className={classes.oneTask}
    >
      <div
        ref={drag}
        style={{
          cursor: "pointer",
        }}
        className={classes.taskContent}
      >
        <h3>{task ? task.title : "title"}</h3>
        <p>{task.description}</p>
        <time>{displayDate}</time>
      </div>
    </div>
  );
}
