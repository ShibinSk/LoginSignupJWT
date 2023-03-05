import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: [input.value] });
  };
  const handleSubmit = async (e) => {
    e.preventDefult();
    try {
      const url = "htt://localhost:3000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
      //   console.log(err.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form
            action=""
            className={styles.form_container}
            onSubmit={handleSubmit}
          >
            <h1>Login Account</h1>

            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />

            {error && <div className={styles.error_msg}>{error}</div>}

            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
