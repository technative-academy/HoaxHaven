import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { makeApiRequest } from "../../../services/apiService.js";

import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import { fetchThing, editThing } from "../../../slices/thingsSlice";
import { showToast } from "../../../slices/toastSlice";

import styles from "./edit-thing.module.css";

const EditThing = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const [thing, setThing] = useState(null);

	useEffect(() => {
		dispatch(
			setBreadcrumb([
				{ label: "Home", url: "/" },
				{ label: "My articles", url: "/my/" },
				{ label: "Edit article" },
			]),
		);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			setIsLoading(true);
			(async () => {
				const thingData = await makeApiRequest(`articles/${id}`);
				thingData.tags = thingData.tags.join(", ");
				setThing(thingData);
				setIsLoading(false);
			})();
		}
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(
			editThing({
				id,
				updatedThing: { ...thing, tags: thing.tags.split(", ") },
			}),
		);
		dispatch(showToast(`${thing.title} updated!`));
		navigate("/my/");
	};

	return (
		<div className={styles.wrapper}>
			{isLoading || thing == null ? (
				<p>Loading...</p>
			) : (
				<form className={styles.form} onSubmit={handleSubmit}>
					<label className={styles.inputContainer}>
						<p>Name</p>
						<input
							type="text"
							className={styles.input}
							value={thing.title}
							onChange={(e) =>
								setThing((thing) => ({
									...thing,
									title: e.target.value,
								}))
							}
							placeholder="Name"
							required
						/>
					</label>
					<label className={styles.inputContainer}>
						<p>Description</p>
						<textarea
							className={styles.input}
							value={thing.description}
							onChange={(e) =>
								setThing((thing) => ({
									...thing,
									description: e.target.value,
								}))
							}
							placeholder="Description"
							required
						/>
					</label>
					<label className={styles.inputContainer}>
						<p>Tag</p>
						<input
							className={styles.input}
							value={thing.tags}
							onChange={(e) =>
								setThing((thing) => ({
									...thing,
									tags: e.target.value,
								}))
							}
							required
						/>
					</label>
					<div className={styles.inputContainer}>
						<button type="submit">Edit article</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default EditThing;
