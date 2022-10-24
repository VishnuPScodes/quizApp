import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authRequest } from "../../redux/action";
import { ThreeDots } from "react-loader-spinner";
import "./auth.css";

export const Reg = () => {
  //useDispatch hook to dispatch actions to redux
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  //trying to resgiter the user to the database with the data got from the registration form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const handleRegister = () => {
    setLoading(true);
    axios
      .post("http://localhost:5001/reg", data)
      .then((res) => {
        setLoading(false);
        alert("Registered");
        navigate("/log");
      })
      .catch((er) => {
        setLoading(false);
        alert("something went wrong");
        console.log(er);
      });
  };
  return (
    <div>
      <div className="log-main">
        <div className="welcome">Welcome to registration page</div>
        <div className="log-input">
          <input
            id="email"
            onChange={handleChange}
            className="log-input"
            type="email"
            placeholder="email address"
          />
        </div>
        <div className="log-input">
          <input
            id="password"
            onChange={handleChange}
            className="log-input"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="log-btn">
          <button onClick={handleRegister} className="log-btn">
            {loading == true ? (
              <div className="loader">
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
