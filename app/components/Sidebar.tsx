import { UserButton } from "@clerk/nextjs";
import styles from "../styles/Sidebar.module.css";

interface SidebarProps {
  currentView: "dashboard" | "agencies" | "contacts";
  setCurrentView: (view: "dashboard" | "agencies" | "contacts") => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>AgenciaDash</div>

      <nav className={styles.sidebarNav}>
        <a 
          onClick={() => setCurrentView("dashboard")} 
          className={`${styles.navLink} ${currentView === "dashboard" ? styles.navLinkActive : ""}`}
        >
          Dashboard
        </a>
        <a 
          onClick={() => setCurrentView("agencies")}
          className={`${styles.navLink} ${currentView === "agencies" ? styles.navLinkActive : ""}`}
        >
          Agences
        </a>
        <a 
          onClick={() => setCurrentView("contacts")}
          className={`${styles.navLink} ${currentView === "contacts" ? styles.navLinkActive : ""}`}
        >
          Contacts
        </a>
      </nav>

      <div className={styles.sidebarFooter}>
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}