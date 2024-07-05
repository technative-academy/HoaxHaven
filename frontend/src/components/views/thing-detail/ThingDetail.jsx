import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import { fetchThing } from "../../../slices/thingsSlice";

import styles from "./thing-detail.module.css";

const ThingDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const thing = useSelector((state) => state.things.currentThing);
	const status = useSelector((state) => state.things.status);
	const error = useSelector((state) => state.things.error);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	useEffect(() => {
		dispatch(fetchThing(id));
	}, [dispatch, id]);

	useEffect(() => {
		dispatch(
			setBreadcrumb([
				{ label: "Home", url: "/" },
				{ label: "Articles", url: "/articles/" },
				{ label: thing?.name || "Article" },
			]),
		);
	}, [dispatch, thing]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "failed") {
		return <div>{error}</div>;
	}

	if (!thing) {
		return <div>Article not found</div>;
	}

	return (
		<div className={styles.wrapper}>
			<p>
				<strong>Name:</strong> <em>{thing.title}</em>
			</p>
			<p>
				<strong>Description:</strong> <em>{thing.description}</em>
			</p>
			<p>
				<strong>Tags: </strong>
				<em>
					{thing.tags.map((tag) => {
						return (
							<NavLink
								style={{ marginLeft: 14 }}
								key={tag}
								className={styles.link}
								to={`/with-tag/${tag}/`}
							>
								{tag}
							</NavLink>
						);
					})}
				</em>
			</p>

			{isLoggedIn && (
				<p>
					<strong>Owner:</strong>
					<em>
						<NavLink
							className={styles.link}
							to={`/users/${thing.username}/`}
						>
							{thing.username}
						</NavLink>
					</em>
				</p>
			)}
		</div>
	);
};

export default ThingDetail;
