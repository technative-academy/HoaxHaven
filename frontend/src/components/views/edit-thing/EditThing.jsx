import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchThings, editThing } from "../../../slices/thingsSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import { showToast } from "../../../slices/toastSlice";
import styles from "./edit-thing.module.css";

const EditThing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thing = useSelector((state) =>
    state.things.items.find((thing) => thing.id === parseInt(id))
  );

  const [name, setName] = useState(thing ? thing.name : "");
  const [description, setDescription] = useState(
    thing ? thing.description : ""
  );

  useEffect(() => {
    dispatch(
      setBreadcrumb([
        { label: "Home", url: "/" },
        { label: "My things", url: "/my-things/" },
        { label: "Edit thing" },
      ])
    );
  }, [dispatch]);

  useEffect(() => {
    if (!thing) {
      dispatch(fetchThings());
    }
  }, [thing, dispatch]);

  useEffect(() => {
    if (thing) {
      setName(thing.name);
      setDescription(thing.description);
    }
  }, [thing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editThing({ id, updatedThing: { name, description } }));
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
        <div className={styles.inputContainer}>
          <button type="submit">Edit Thing</button>
        </div>
      </form>
    </div>
  );
};

export default EditThing;
