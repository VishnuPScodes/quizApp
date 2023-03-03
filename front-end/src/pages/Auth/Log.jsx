import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
 
  addScore,
  addToken,
  addUserScore,
  authFailure,
  authRequest,
  authSuccess,
} from "../../redux/action";
import { ThreeDots } from "react-loader-spinner";
import "./auth.css";
import Particles from "particles.js";

import ParticlesBg from "particles-bg";

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
      .post("http://localhost:3000/log", data)
      .then((res) => {
        if (res.data.token) {
          dispatch(authSuccess());
          dispatch(addToken(res.data.token));
          console.log(res.data.data.score)
          dispatch(addUserScore(res.data.data.score))
          alert("login successful");
          navigate("/");
        }
      })
      .catch((er) => {
        dispatch(authFailure());
        console.log('er',er)
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
      <ParticlesBg  type="cobweb" bg={true} />
      <div className="log-main">
        <div className="welcome">Let's login</div>
        <div className="log-input">
          <input
            id="email"
            onChange={handleChange}
            className="log-input1"
            type="text"
            placeholder="email address"
          />
        </div>
        <div className="log-input">
          <input
            id="password"
            onChange={handleChange}
            className="log-input1"
            type="password"
            placeholder="Password"
          />
        </div>

        <button className="log-btn1" onClick={handleLogin}>
          {loading ? (
            <div className="loader">
              <ThreeDots
                height="30"
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
            <div className="log-text">Login</div>
          )}
        </button>

        <div className="log-not-reg">Hey not yet registered ?</div>

        <button onClick={handleReg} className="log-btn1">
          Register
        </button>

        <button
          onClick={() => {
            navigate("/Admin");
          }}
          className="log-btn1"
        >
          Admin
        </button>
      </div>
    </div>
  );
};
