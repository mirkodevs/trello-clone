"use client";
import { usePathname } from "next/navigation";
import { saveTask } from "../../../../lib/server";
import OnSubmit from "./on-submit";
import classes from "./newTask.module.css";
import { useEffect, useState } from "react";

export default function NewTask({ list }) {
  const radioGroupStyles = {
    display: "flex",
    gap: "0.6em",
  };
  const pathname = usePathname();
  const projectSelectedSlug = pathname.split("/")[1];

  const [firstChekc, setFirstCheck] = useState(true);
  useEffect(() => {
    if (firstChekc === false) {
      return;
    }

    return () => {
      setFirstCheck(false);
    };
  }, []);
  return (
    <form action={(formData) => saveTask(formData, projectSelectedSlug, list)}>
      <h3>add task</h3>
      <fieldset>
        <label>title: </label>
        <input required name="title" type="text"></input>
      </fieldset>
      <fieldset>
        <label>description:</label>
        <textarea required name="desc" type="textarea" rows = "5"></textarea>
      </fieldset>
      <fieldset>
        <label>status:</label>

        <div className={classes.container} style={radioGroupStyles}>
          <div className={classes.tabs}>
            <input
              checked={firstChekc ? firstChekc : null}
              id="radio-1"
              required
              value="done"
              type="radio"
              name="status"
            />
            <label className={classes.tab} for="radio-1">
              Done
            </label>
            <input id="radio-2" value="to do" name="status" type="radio" />
            <label className={classes.tab} for="radio-2">
              To do
            </label>
            <input
              id="radio-3"
              value="in progress"
              name="status"
              type="radio"
            />{" "}
            <label className={classes.tab} for="radio-3">
              In Progress
            </label>
            <input id="radio-4" value="planning" name="status" type="radio" />
            <label className={classes.tab} for="radio-4">
              planning
            </label>{" "}
            <span className={classes.glider}></span>
          </div>
        </div>
      </fieldset>
      <OnSubmit text="add task" />
    </form>
  );
}
