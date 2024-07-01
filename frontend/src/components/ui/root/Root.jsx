import styles from "./root.module.css";

import SiteHeader from "../site-header/SiteHeader";
import SiteNav from "../site-nav/SiteNav";
import SiteFooter from "../site-footer/SiteFooter";
import MainContent from "../main-content/MainContent";
import Toast from "../toast/Toast";
import Breadcrumb from "../breadcrumb/Breadcrumb";

function Root() {
  return (
    <div className={styles.wrapper}>
      <SiteHeader />
      <SiteNav />
      <Breadcrumb />
      <MainContent />
      <SiteFooter />
      <Toast />
    </div>
  );
}

export default Root;
