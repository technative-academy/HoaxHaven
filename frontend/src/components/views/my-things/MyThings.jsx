import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchMyThings } from "../../../slices/thingsSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./my-things.module.css";

const MyThings = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const things = useSelector((state) => state.things.userThings);
  const status = useSelector((state) => state.things.userStatus);
  const error = useSelector((state) => state.things.userError);

  useEffect(() => {
    dispatch(fetchMyThings());
  }, [dispatch, location]);

  useEffect(() => {
    dispatch(
      setBreadcrumb([{ label: "Home", url: "/" }, { label: "My things" }])
    );
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}
      <ul className={styles.list}>
        {things.map((thing) => (
          <li className={styles.item} key={thing.id}>
            <div className={styles.itemContent}>
              <p>{thing.name}</p>
              <NavLink className={styles.link} to={`${thing.id}/edit/`}>
                Edit
              </NavLink>
              <NavLink className={styles.link} to={`${thing.id}/delete/`}>
                Delete
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyThings;
