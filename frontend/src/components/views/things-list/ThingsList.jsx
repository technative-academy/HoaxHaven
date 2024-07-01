import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchThings } from "../../../slices/thingsSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./things-list.module.css";

const ThingsList = () => {
  const dispatch = useDispatch();
  const things = useSelector((state) => state.things.items);
  const status = useSelector((state) => state.things.status);
  const error = useSelector((state) => state.things.error);

  useEffect(() => {
    dispatch(fetchThings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setBreadcrumb([{ label: "Home", url: "/" }, { label: "Things" }]));
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}
      <ul className={styles.list}>
        {things.map((thing) => (
          <li className={styles.item} key={thing.id}>
            <NavLink className={styles.link} to={`/things/${thing.id}/`}>
              {thing.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThingsList;
