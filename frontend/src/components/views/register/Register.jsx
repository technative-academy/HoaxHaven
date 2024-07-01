import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { login } from "../../../slices/authSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      setBreadcrumb([{ label: "Home", url: "/" }, { label: "Register" }])
    );
  }, [dispatch]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(name, email, password, bio);
      await dispatch(login({ email, password })).unwrap();
      navigate("/my-things/add/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleRegister}>
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

        <label className={styles.inputContainer}>
          <p>Bio</p>
          <textarea
            value={bio}
            className={styles.input}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            required
          />
        </label>

        <div className={styles.inputContainer}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
