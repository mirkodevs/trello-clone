import classes from "./newProj.module.css";
import { saveProject } from "../../../../lib/server";

export default function NewProject() {
  return (
    <form action={saveProject} className={classes.form}>
      <h3>add project</h3>
      <fieldset>
        <label>title:</label>
        <input name="title" type="text" required></input>
      </fieldset>
      <fieldset>
        <label>description:</label>
        <textarea name="desc" required></textarea>
      </fieldset>

      <button>add</button>
    </form>
  );
}
