import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
const db = sql("projects.db");

export function getProj() {
  return db.prepare("SELECT * FROM projects").all();
}
export function getLists(projectId) {

  
  return db.prepare("SELECT * FROM lists WHERE project_id = ?").all(projectId);
}
export function getTasks(projectId) {
  return db.prepare("SELECT * FROM tasks WHERE project_id = ?").all(projectId);
}
export function getProjectBySlug(slug) {
  const stmt = db.prepare("SELECT * FROM projects WHERE slug = ?");

  return stmt.get(slug);
}
export async function saveProj(proj) {
  proj.slug = slugify(proj.title, { lower: true });

  if (getProjectBySlug(proj.slug)) {
    throw new Error();
  }
  proj.description = xss(proj.description);

  db.prepare(
    `
  INSERT INTO projects 
    (title,description,slug)
  VALUES (
    @title,
    @description,   
    @slug
  )
  `
  ).run(proj);
}
export function saveListIntoDatabase(list) {
  console.log(list);
  db.prepare(
    `
  INSERT INTO lists
    (project_id,title)
  VALUES (
    @project_id,
    @title
  )
  `
  ).run(list);
}

export async function saveTaskIntoDatabase(task, projectSelected) {
  task.slug = slugify(task.title, { lower: true });

  task.description = xss(task.description);

  db.prepare(
    `
  INSERT INTO tasks
    (project_id,title,description,status,atList)
  VALUES (
    @project_id,
    @title,
    @description,   
    @status,
    @atList
  )
  `
  ).run(task);
}
