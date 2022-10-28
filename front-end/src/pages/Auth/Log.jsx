import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToken,
  authFailure,
  authRequest,
  authSuccess,
} from "../../redux/action";
import { ThreeDots } from "react-loader-spinner";
import "./auth.css";

export const Log = () => {
  //taking loading from the redux store
  const loading = useSelector((state) => state.loading);
  //getting useDispatch hook to connect with the redux from react
  const dispatch = useDispatch();
  //data ,state to store all the data from the input box

  const [data, setData] = useState([]);
  //using useNavigate to go to different page

  const navigate = useNavigate();

  //function to take the user to the registration page

  const handleReg = () => {
    navigate("/reg");
  };

  //using the data from the form to make a post request to the backend to confirm the authentication

  const handleLogin = () => {
    dispatch(authRequest());
    axios
      .post("https://digiaccel-c.herokuapp.com/log", data)
      .then((res) => {
        if (res.data.token) {
          dispatch(authSuccess());
          dispatch(addToken(res.data.token));
          alert("login successful");
          navigate("/");
        }
      })
      .catch((er) => {
        dispatch(authFailure());
        alert("something went wrong");
        console.log(er);
      });
  };

  //taking data from the form

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  return (
    <div>
      <div className="log-main">
        <div className="welcome">Welcome to login page</div>
        <div className="log-input">
          <input
            id="email"
            onChange={handleChange}
            className="log-input"
            type="text"
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
          <button className="log-btn" onClick={handleLogin}>
            {loading ? (
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
              "Login"
            )}
          </button>
        </div>
        <div className="log-not-reg">Not registered yet ?</div>
        <div className="log-btn">
          <button onClick={handleReg} className="log-btn">
            Register
          </button>
        </div>
        <div className="log-btn">
          <button
            onClick={() => {
              navigate("/Admin");
            }}
            className="log-btn"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};
