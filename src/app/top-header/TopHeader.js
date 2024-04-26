"use client";
import Link from "next/link";
import AddProject from "./AddProject";
import classes from "./top-header.module.css";
import { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";

export default function TopHeader({onToggleSidebar}) {
  const modalRef = useRef();

  function addProject() {

  }

  return (
    <header id="top-header" className={classes.topHeader}>
      <div style={{display:"flex"}}>
        <button 
        onClick={()=> onToggleSidebar()}
        className={classes.openSideBar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>
        <Link style={{ display: "flex", gap: "0.3em" }} href={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-brand-trello"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
            <path d="M7 7h3v10h-3z" />
            <path d="M14 7h3v6h-3z" />
          </svg>
          <h2> Trello</h2>
        </Link>
      </div>
      <AddProject handleAdd={addProject} />
    </header>
  );
}
