"use server";
import {
  saveProj,
  getProj,
  getProjectBySlug,
  saveTaskIntoDatabase,
} from "./proj";

export async function saveProject(formData) {
  const project = {
    title: formData.get("title"),
    description: formData.get("desc"),
  };
  await saveProj(project);
}

export async function saveTask(formData, projectSelectedSlug) {
  const currentProj = getProjectBySlug(projectSelectedSlug);

  const task = {
    project_id: currentProj.id,
    title: formData.get("title"),
    description: formData.get("desc"),
    status: formData.get("status"),
  };
if(isValid(task)){
  await saveTaskIntoDatabase(task);
}else {

  
}
}

function isValid(task) {
  if (task.title || task.description || task.status) {
    return true;
  } else return false;
}
