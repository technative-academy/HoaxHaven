import styles from "./site-footer.module.css";

function SiteFooter() {
  return (
    <div className={styles.wrapper}>&copy; {new Date().getFullYear()}</div>
  );
}

export default SiteFooter;
