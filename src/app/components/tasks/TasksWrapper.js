"use client";
import OneTask from "./OneTask";
import classes from "./tasks.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddTask from "./AddTask";
import { Suspense, useContext, useState } from "react";
import ListsContext from "../../../../context/listContext";
import { saveList } from "../../../../lib/server";
import { usePathname } from "next/navigation";

export default function TasksWrapper({ tasks }) {
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState();
  const { lists, addListHandler } = useContext(ListsContext);
  const pathname = usePathname();
  const projectSelectedSlug = pathname.split("/")[1];
  function changeNewListTitleHandler(event) {
    const newValue = event.target.value;
    setNewListTitle(newValue);
  }

  function startAddingList() {
    setIsAddingList(true);
  }
  function stopAddingList() {
    setIsAddingList(false);
  }
  function onAddList() {
    addListHandler(newListTitle.trim());
    stopAddingList();
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={classes.tasksWrapper}>
        {lists.map(function (oneList, index) {
          const tasksFiltered = tasks.filter((oneTask) => {
            return (
              oneTask.atList.trim().replace(/\s/g, "-").toLowerCase() ===
              oneList.title.trim().replace(/\s/g, "-").toLowerCase()
            );
          });

          return (
            <div
              className={classes.colWrapper}
              id={oneList.title}
              key={oneList.title}
            >
              <h3 className={classes.h3} style={{ margin: "10px 0" }}>
                {oneList.title}
              </h3>
              <div className={classes.oneCol}>
                {tasksFiltered.map((oneT) => {
                  return (
                  <Suspense fallBack = {<p>Loading...</p>}>
                  <OneTask key={oneT.id} task={oneT} />
                  </Suspense>
                  
                  );
                })}

                <AddTask list={oneList.title} />
              </div>
            </div>
          );
        })}
        <div className={classes.colWrapper}>
          <div className={classes.oneCol}>
            {!isAddingList ? (
              <div onClick={startAddingList} className={classes.addList}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M9 12h6" />
                  <path d="M12 9v6" />
                </svg>
                <span>add List</span>
              </div>
            ) : (
              <form
                action={() => {
                  onAddList(newListTitle);

                  saveList(newListTitle, projectSelectedSlug);
                }}
                style={{ display: "flex", gap: "1em", flexDirection: "column" }}
                className={classes.oneTask}
              >
                <div>
                  <input
                    onChange={(e) => changeNewListTitleHandler(e)}
                    value={newListTitle}
                  ></input>
                </div>
                <div className={classes.buttonGroup}>
                  <button type="submit">add list</button>
                  <button type="button" onClick={stopAddingList}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M18 6l-12 12" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </DndProvider>
  );
}
