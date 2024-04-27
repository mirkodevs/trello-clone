import { getProjectBySlug } from "../../../lib/proj";
import { notFound } from "next/navigation";
import Header from "../components/main-header/Header";
import TasksWrapper from "../components/tasks/TasksWrapper";
import { getTasks } from "../../../lib/proj";
import { ListsProvider } from "../../../context/listContext";
import { getLists } from "../../../lib/proj";

export default async function ProjPage({ params }) {
  let projectPage = getProjectBySlug(params.projSlug);
  if (projectPage === undefined) {
    notFound();
  }
  let currentTasks = getTasks(projectPage.id);
let currentLists = getLists(projectPage.id)

  return (
    <ListsProvider projectPage = {projectPage} currentLists={currentLists}>
      <Header /> 
      <TasksWrapper 
      tasks={currentTasks} />
    </ListsProvider>
    
  );
}
