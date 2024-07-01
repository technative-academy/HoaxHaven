import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./site-nav.module.css";

function SiteNav() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Things", url: "/things/" },
  ];

  if (isLoggedIn) {
    navLinks.push({ label: "Users", url: "/users/" });
  }

  return (
    <div className={styles.wrapper}>
      <nav className={styles.links}>
        {navLinks.map((navLink) => (
          <NavLink
            key={navLink.url}
            to={navLink.url}
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.inactiveLink
            }
          >
            {navLink.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default SiteNav;
