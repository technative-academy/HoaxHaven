import { Outlet } from "react-router-dom";

import styles from "./main-content.module.css";

function MainContent() {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
}

export default MainContent;
