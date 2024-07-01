import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../slices/authSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(setBreadcrumb([{ label: "Home", url: "/" }, { label: "Login" }]));
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/my-things/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleLogin}>
        <label className={styles.inputContainer}>
          <p>Email</p>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>

        <label className={styles.inputContainer}>
          <p>Password</p>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        <div className={styles.inputContainer}>
          <button type="submit" disabled={authStatus === "loading"}>
            Login
          </button>
        </div>
        {authError && <div className={styles.error}>{authError}</div>}
      </form>
    </div>
  );
};

export default Login;
