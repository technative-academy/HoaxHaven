import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchUsers } from "../../../slices/usersSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./users-list.module.css";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setBreadcrumb([{ label: "Home", url: "/" }, { label: "Users" }]));
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}
      <ul className={styles.list}>
        {users.map((user) => (
          <li className={styles.item} key={user.id}>
            <NavLink className={styles.link} to={`/users/${user.id}/`}>
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
