"use client";
import { createContext, useState } from "react";
import { usePathname } from "next/navigation";
const ListsContext = createContext();

export function ListsProvider({ children, currentLists }) {
  const [lists, setLists] = useState(currentLists);

  function addListHandler(newListTitle) {

    setLists(function (prevLists) {
      const newOneList = {};
      newOneList.title = newListTitle;
      return [...prevLists, newOneList];
    });
  }

  return (
    <ListsContext.Provider value={{ lists, addListHandler }}>
      {children}
    </ListsContext.Provider>
  );
}
export default ListsContext;
