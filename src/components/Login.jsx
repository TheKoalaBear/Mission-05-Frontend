import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import styles from "./Login.module.css";
import ZEnergyLogo from "../assets/Z_Energy_logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await authService.login(formData);
      // Navigate to home page
      navigate("/home");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <img src={ZEnergyLogo} alt="Z Energy Logo" className={styles.logo} />
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <div className={styles.socialButtons}>
          <button type="button" className={styles.socialButton}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className={styles.socialIcon}
            />
            Continue with Google
          </button>
          <button type="button" className={styles.socialButton}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
              alt="Facebook"
              className={styles.socialIcon}
            />
            Continue with Facebook
          </button>
        </div>

        <p className={styles.signupLink}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
