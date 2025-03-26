import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import "./auth.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/auth/forgot-password`, { email })
      .then(() => {
        setLoading(false);
        alert("Reset password link has been sent to your email");
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
        <div className="welcome">Forgot Password</div>
        <div className="log-input">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="log-input1"
            type="email"
            placeholder="Enter your email address"
          />
        </div>

        <button onClick={handleSubmit} className="log-btn1">
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