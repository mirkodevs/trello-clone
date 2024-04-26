"use client";
import TopHeader from "./top-header/TopHeader";
import SideBar from "./SideBar";
import Modal from "./Modal/Modal";
import { useState } from "react";
export default function ClientView({ children, projects }) {
  const [modalSidebar, setModalSidebar] = useState(false);
  function toggleSidebarHandler() {
    setModalSidebar((prevValue) => setModalSidebar(!prevValue));
  }
  return (
    <>
      <TopHeader
      onToggleSidebar = {toggleSidebarHandler}
      />
      <main>
        <SideBar projects={projects} isVisible={modalSidebar} />
        <section id="main-section">{children}</section>
      </main>
      <Modal />
    </>
  );
}
