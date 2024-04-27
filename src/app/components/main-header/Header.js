"use client";
import { usePathname } from "next/navigation";
import classes from "./main-header.module.css";
import ListsContext from "../../../../context/listContext";
import { useContext } from "react";
export default function Header() {
  const pathname = usePathname();
  const { lists, setList } = useContext(ListsContext);

  
  return (
    <header className={classes.header}>
      {pathname.split("/").map((oneP, idx) => {
        if (idx === 0 || idx === pathname.split("/").length - 1) {
          return oneP;
        }
        return oneP + " > ";
      })}
    </header>
  );
}
