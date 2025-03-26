import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import "./auth.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { token } = useParams();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Password must contain at least one special character (!@#$%^&*)");
    }
    return errors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear errors when typing
    setErrors(prev => ({
      ...prev,
      [id]: undefined
    }));

    // Validate password
    if (id === "password") {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        setErrors(prev => ({
          ...prev,
          password: passwordErrors
        }));
      }
    }

    // Check password match
    if (id === "confirmPassword" || id === "password") {
      if (id === "confirmPassword" && value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: "Passwords do not match"
        }));
      } else if (id === "password" && value !== formData.confirmPassword && formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: "Passwords do not match"
        }));
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      !errors.password &&
      !errors.confirmPassword
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/auth/reset-password`, {
        email: formData.email,
        password: formData.password,
        token
      })
      .then(() => {
        setLoading(false);
        alert("Password reset successful");
        navigate("/log");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response?.data?.error || "Something went wrong");
      });
  };

  return (
    <div>
      <div className="log-main">
        <AiOutlineArrowLeft
          onClick={() => navigate("/log")}
          fontSize={"32px"}
          style={{
            paddingLeft: "20px",
            paddingTop: "20px",
          }}
        />
        <div className="welcome">Reset Password</div>
        
        <div className="log-input">
          <input
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="log-input1"
            type="email"
            placeholder="Enter your email address"
          />
        </div>

        <div className="log-input">
          <input
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="log-input1"
            type="password"
            placeholder="Enter new password"
          />
          {errors.password && (
            <div className="error-list">
              {errors.password.map((error, index) => (
                <div key={index} className="error-text">{error}</div>
              ))}
            </div>
          )}
        </div>

        <div className="log-input">
          <input
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="log-input1"
            type="password"
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <div className="error-text">{errors.confirmPassword}</div>
          )}
        </div>

        <button 
          onClick={handleSubmit} 
          className={`log-btn1 ${!isFormValid() ? 'disabled-btn' : ''}`}
          disabled={!isFormValid()}
        >
          {loading ? (
            <div className="loader">
              <ThreeDots
                height="25"
                width="25"
                radius="9"
                color="black"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          ) : (
            "Reset Password"
          )}
        </button>
      </div>
    </div>
  );
};