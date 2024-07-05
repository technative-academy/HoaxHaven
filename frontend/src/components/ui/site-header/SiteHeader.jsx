import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { logout } from "../../../slices/authSlice";

import styles from "./site-header.module.css";

function SiteHeader() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const handleLogout = () => {
		dispatch(logout());
	};

	const navLinks = [];
	if (isLoggedIn) {
		navLinks.push(
			{ label: "My articles", url: "/my/" },
			{ label: "Add article", url: "/my/add/" },
		);
	} else {
		navLinks.push(
			{ label: "Login", url: "/login/" },
			{ label: "Register", url: "/register/" },
		);
	}

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Hoax Haven!</h1>
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
				{isLoggedIn && <button onClick={handleLogout}>Logout</button>}
			</nav>
		</div>
	);
}

export default SiteHeader;
