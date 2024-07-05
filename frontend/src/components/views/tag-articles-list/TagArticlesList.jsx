import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import { fetchAllArticlesByTags } from "../../../slices/thingsSlice";

import styles from "./TagArticlesList.module.css";

const TagList = () => {
	const dispatch = useDispatch();
	const things = useSelector((state) => state.things.items);
	const status = useSelector((state) => state.things.status);
	const error = useSelector((state) => state.things.error);

	useEffect(() => {
		dispatch(fetchAllArticlesByTags());
	}, [dispatch]);

	useEffect(() => {
		dispatch(
			setBreadcrumb([{ label: "Home", url: "/" }, { label: "Tags" }]),
		);
	}, [dispatch]);

	return (
		<div className={styles.wrapper}>
			{status === "loading" && <div>Loading...</div>}
			{status === "failed" && <div>{error}</div>}
			<ul className={styles.list}>
				{things.map((thing) => (
					<li className={styles.item} key={thing.id}>
						<NavLink
							className={styles.link}
							to={`/tags/${thing.tag_name}/`}
						>
							{thing.tag_name}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TagList;
