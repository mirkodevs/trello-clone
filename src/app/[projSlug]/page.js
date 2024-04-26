import { getProj, getProjectBySlug } from "../../../lib/proj";
import { notFound } from "next/navigation";
import Header from "../main-header/Header";
import TasksWrapper from "../components/tasks/TasksWrapper";
import { getTasks } from "../../../lib/proj";
import { CurrentTask } from "../../../context/currentTaskContext";
export default async function ProjPage({ params }) {
  let projectPage = getProjectBySlug(params.projSlug);
  if (projectPage === undefined) {
    notFound();
  }
  let currentTasks = getTasks(projectPage.id);
  return (
    <>
      <Header /> 
      <TasksWrapper 
      tasks={currentTasks} />
    </>
  );
}
