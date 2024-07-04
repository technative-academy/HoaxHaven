import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import { fetchThing, editThing } from "../../../slices/thingsSlice";
import { showToast } from "../../../slices/toastSlice";

import styles from "./edit-thing.module.css";

const EditThing = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const thing = useSelector((state) => state.things.currentThing);

	const [name, setName] = useState(thing?.title ?? "");
	const [description, setDescription] = useState(thing?.description ?? "");
	const [tag, setTag] = useState(thing?.tags.join(", ") ?? "");
	// const [tag, setTag] = useState(thing ? thing.tags : "");

	console.log(thing);

	useEffect(() => {
		dispatch(
			setBreadcrumb([
				{ label: "Home", url: "/" },
				{ label: "My things", url: "/my-things/" },
				{ label: "Edit thing" },
			]),
		);
	}, []);

	useEffect(() => {
		dispatch(fetchThing(id));
	}, [id]);

	useEffect(() => {
		if (thing) {
			setName(thing.title);
			setDescription(thing.description);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(
			editThing({
				id,
				updatedThing: { title: name, description, tags: tag },
			}),
		);
		dispatch(showToast(`${name} updated!`));
		navigate("/my-things/");
	};

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label className={styles.inputContainer}>
					<p>Name</p>
					<input
						type="text"
						className={styles.input}
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						required
					/>
				</label>
				<label className={styles.inputContainer}>
					<p>Description</p>
					<textarea
						className={styles.input}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description"
						required
					/>
				</label>
				<label className={styles.inputContainer}>
					<p>Tag</p>
					<input
						className={styles.input}
						value={tag}
						onChange={(e) => setTag(e.target.value)}
						required
					/>
				</label>
				<div className={styles.inputContainer}>
					<button type="submit">Edit Thing</button>
				</div>
			</form>
		</div>
	);
};

export default EditThing;
