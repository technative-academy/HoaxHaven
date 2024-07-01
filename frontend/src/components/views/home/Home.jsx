import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./home.module.css";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumb([{ label: "Home" }]));
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <p>Welcome to the things</p>
    </div>
  );
}

export default Home;
