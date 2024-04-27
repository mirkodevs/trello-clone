"use server";
import { revalidatePath } from "next/cache";
import {
  saveProj,
  getProj,
  getProjectBySlug,
  saveTaskIntoDatabase,
  saveListIntoDatabase,
} from "./proj";

export async function saveProject(formData) {
  const project = {
    title: formData.get("title"),
    description: formData.get("desc"),
  };
  await saveProj(project);
}
export async function saveList(newListTitle, projectSelectedSlug) {
  const currentProj = getProjectBySlug(projectSelectedSlug);
  const newOneList = {
    project_id: currentProj.id,
    title: newListTitle
  };
  saveListIntoDatabase(newOneList);
}
export async function saveTask(formData, projectSelectedSlug, atList) {
  const currentProj = getProjectBySlug(projectSelectedSlug);

  const task = {
    project_id: currentProj.id,
    title: formData.get("title"),
    description: formData.get("desc"),
    status: formData.get("status"),
    atList: atList.replace(/\s/g, "-"),
  };
  if (isValid(task)) {
    await saveTaskIntoDatabase(task);
  } else {
  }
  revalidatePath("/" + projectSelectedSlug, "page")
}

function isValid(task) {
  if (task.title || task.description || task.status) {
    return true;
  } else return false;
}
