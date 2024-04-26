import classes from "./side-bar.module.css";
import Link from "next/link";
export default function SideBar({ projects, isVisible }) {
  const mobileClasses = classes.sideBarMobile + " " + classes.sideBar;
  return (
    <aside className={isVisible ? classes.sideBar : mobileClasses}>
  
        <h3>Projects</h3>
        <ul>
          {projects.map((oneP) => {
            return (
              <li key={oneP.title}>
                <Link href={"/" + oneP.slug}>{oneP.title}</Link>
              </li>
            );
          })}
        </ul>
      
    </aside>
  );
}
