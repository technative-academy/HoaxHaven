import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
// import { fetchThingsByUser } from "../../../slices/thingsSlice";
import { fetchUser } from "../../../slices/usersSlice";

import styles from "./user-detail.module.css";

const UserDetail = () => {
	const { username } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users.user);
	const userStatus = useSelector((state) => state.users.userStatus);
	const userError = useSelector((state) => state.users.userError);

	useEffect(() => {
		dispatch(fetchUser(username));
	}, [dispatch, username]);

	useEffect(() => {
		dispatch(
			setBreadcrumb([
				{ label: "Home", url: "/" },
				{ label: "Users", url: "/users/" },
				{ label: user?.username || "User" },
			]),
		);
	}, [dispatch, user]);

	if (userStatus === "loading") {
		return <div>Loading...</div>;
	}

	if (userStatus === "failed") {
		return <div>{userError}</div>;
	}

	if (!user) {
		return <div>User not found</div>;
	}

	return (
		<div className={styles.wrapper}>
			<p>
				<strong>Name:</strong> <em>{user.username}</em>
			</p>
			<p>
				<strong>Bio:</strong> <em>{user.bio}</em>
			</p>
			<p>
				<strong>Articles:</strong>
			</p>
			<ul>
				{user.articles.map((thing) => (
					<li key={thing.id}>
						<NavLink
							className={styles.link}
							to={`/articles/${thing.id}/`}
						>
							{thing.title}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserDetail;
