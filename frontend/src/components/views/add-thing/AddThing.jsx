import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import { addThing } from "../../../slices/thingsSlice";
import { showToast } from "../../../slices/toastSlice";
import styles from "./add-thing.module.css";

const AddThing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(
      setBreadcrumb([{ label: "Home", url: "/" }, { label: "Add thing" }])
    );
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addThing({ name, description }));
    dispatch(showToast(`${name} added!`));
    setName("");
    setDescription("");
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </label>
        <div className={styles.inputContainer}>
          <button type="submit">Add Thing</button>
        </div>
      </form>
    </div>
  );
};

export default AddThing;
