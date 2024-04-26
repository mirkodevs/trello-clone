"use client";
import OneTask from "./OneTask";
import classes from "./tasks.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import statusTypes from "../../../../lib/drag-types";
import AddTask from "./AddTask";
export default function TasksWrapper({ tasks }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <section className={classes.tasksWrapper}>
        {Object.keys(statusTypes).map(function (key, index) {
          const tasksFiltered = tasks.filter(
            (oneTask) => oneTask.status === statusTypes[key]
          );

          return (
            <div className={classes.colWrapper} id={key} key={key}>
              <h3 className={classes.h3} style={{ margin: "10px 0" }}>
                {statusTypes[key]}
              </h3>
              <div className={classes.oneCol}>
                {tasksFiltered.map((oneT) => {
                  return <OneTask key={oneT.id} task={oneT} />;
                })}{" "}
                <AddTask />
              </div>
            </div>
          );
        })}
      </section>{" "}
    </DndProvider>
  );
}
