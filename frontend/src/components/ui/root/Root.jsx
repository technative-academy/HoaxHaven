import Breadcrumb from "../breadcrumb/Breadcrumb";
import MainContent from "../main-content/MainContent";
import SiteFooter from "../site-footer/SiteFooter";
import SiteHeader from "../site-header/SiteHeader";
import SiteNav from "../site-nav/SiteNav";
import Toast from "../toast/Toast";

import styles from "./root.module.css";

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
