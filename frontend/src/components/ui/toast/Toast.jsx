import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../../slices/toastSlice";
import styles from "./toast.module.css";

const Toast = () => {
  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  if (!toastMessage) return null;

  return <div className={styles.toast}>{toastMessage}</div>;
};

export default Toast;
