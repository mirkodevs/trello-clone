'use client'
import { usePathname } from "next/navigation";
import { saveTask } from "../../../../lib/server";
import TaskSubmit from "./task-submit";
export default function NewTask() {
  const radioGroupStyles = {
    display: "flex",
    gap: "0.5em",
  };
  const pathname = usePathname();
  const projectSelectedSlug = pathname.split("/")[1];
  return (
    <form
      method="dialog"
      action={(formData) => saveTask(formData, projectSelectedSlug)}
    >
      <h3>add task</h3>
      <fieldset>
        <label>title</label>
        <input required name="title" type="text"></input>
      </fieldset>
      <fieldset>
        <label>description:</label>
        <input required name="desc" type="textarea"></input>
      </fieldset>
      <fieldset>
        <label>status:</label>
        <div style={radioGroupStyles}>
          <label>Done</label>
          <input required value="done" type="radio" name="status" />

          <label>To do</label>
          <input value="to do" name="status" type="radio" />

          <label>In Progress</label>
          <input value="in progress" name="status" type="radio" />
          <label>planning</label>
          <input value="planning" name="status" type="radio" />
        </div>
      </fieldset>
<TaskSubmit  />
    </form>
  );
}
