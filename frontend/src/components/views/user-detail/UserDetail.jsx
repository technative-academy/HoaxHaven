import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../slices/usersSlice";
import { fetchThingsByUser } from "../../../slices/thingsSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./user-detail.module.css";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const userStatus = useSelector((state) => state.users.userStatus);
  const userError = useSelector((state) => state.users.userError);
  const things = useSelector((state) => state.things.userThings);
  const thingsStatus = useSelector((state) => state.things.userThingsStatus);
  const thingsError = useSelector((state) => state.things.userThingsError);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchThingsByUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(
      setBreadcrumb([
        { label: "Home", url: "/" },
        { label: "Users", url: "/users/" },
        { label: user?.name || "User" },
      ])
    );
  }, [dispatch, user]);

  if (userStatus === "loading" || thingsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (userStatus === "failed") {
    return <div>{userError}</div>;
  }

  if (thingsStatus === "failed") {
    return <div>{thingsError}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <p>
        <strong>Name:</strong> <em>{user.name}</em>
      </p>
      <p>
        <strong>Bio:</strong> <em>{user.bio}</em>
      </p>
      <p>
        <strong>Things:</strong>
      </p>
      <ul>
        {things.map((thing) => (
          <li key={thing.id}>
            <NavLink className={styles.link} to={`/things/${thing.id}/`}>
              {thing.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
