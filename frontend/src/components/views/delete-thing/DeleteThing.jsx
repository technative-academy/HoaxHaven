import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import { fetchThings, deleteThing } from "../../../slices/thingsSlice";
import { showToast } from "../../../slices/toastSlice";

import styles from "./delete-thing.module.css";

const DeleteThing = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const thing = useSelector((state) =>
		state.things.items.find((thing) => thing.id === parseInt(id)),
	);

	useEffect(() => {
		dispatch(
			setBreadcrumb([
				{ label: "Home", url: "/" },
				{ label: "My article", url: "/my/" },
				{ label: "Delete article" },
			]),
		);
	}, [dispatch]);

	useEffect(() => {
		if (!thing) {
			dispatch(fetchThings());
		}
	}, [thing, dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(deleteThing(thing.id));
		dispatch(showToast(`Article deleted`));
		navigate("/my/");
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit}>
				<p>{thing && thing.name}</p>
				<button type="submit">Delete article</button>
			</form>
		</div>
	);
};

export default DeleteThing;
