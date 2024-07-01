import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./breadcrumb.module.css";

const Breadcrumb = () => {
  const breadcrumb = useSelector((state) => state.breadcrumb);

  return (
    <nav className={styles.wrapper}>
      {breadcrumb.map((crumb, index) => (
        <span className={styles.crumb} key={index}>
          {crumb.url ? (
            <NavLink className={styles.link} to={crumb.url}>
              {crumb.label}
            </NavLink>
          ) : (
            <span className={styles.label}>{crumb.label}</span>
          )}
          {index < breadcrumb.length - 1 && (
            <span className={styles.divider}> {" / "} </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
