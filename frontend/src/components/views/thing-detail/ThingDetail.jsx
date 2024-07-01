import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchThing } from "../../../slices/thingsSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./thing-detail.module.css";

const ThingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const thing = useSelector((state) => state.things.currentThing);
  const status = useSelector((state) => state.things.status);
  const error = useSelector((state) => state.things.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(fetchThing(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(
      setBreadcrumb([
        { label: "Home", url: "/" },
        { label: "Things", url: "/things/" },
        { label: thing?.name || "Thing" },
      ])
    );
  }, [dispatch, thing]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  if (!thing) {
    return <div>Thing not found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <p>
        <strong>Name:</strong> <em>{thing.name}</em>
      </p>
      <p>
        <strong>Description:</strong> <em>{thing.description}</em>
      </p>
      {isLoggedIn && (
        <p>
          <strong>Owner:</strong>
          <em>
            <NavLink className={styles.link} to={`/users/${thing.user_id}/`}>
              {thing.user_name}
            </NavLink>
          </em>
        </p>
      )}
    </div>
  );
};

export default ThingDetail;
