import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addId,
  addScore,
  addToken,
  addUserScore,
  authFailure,
  authRequest,
  authSuccess,
} from "../../redux/action";
import { ThreeDots } from "react-loader-spinner";
import "./auth.css";
import { useToast } from "@chakra-ui/react";

import ParticlesBg from "particles-bg";

export const Log = () => {
  const toast = useToast();
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleReg = () => {
    navigate("/reg");
  };

  const handleLogin = () => {
    console.log("Login data being sent:", data);

    if (!data.email || !data.password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(authRequest());
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data)
      .then((res) => {
        console.log("Login response:", res.data);
        dispatch(authSuccess());
        dispatch(addToken(res.data.token));
        dispatch(addId(res.data._id));
        dispatch(addUserScore(res.data.score));

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        toast({
          title: "Success",
          description: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        alert("login successful");
        navigate("/");
      })
      .catch((er) => {
        console.log("Login error:", er.response?.data);
        dispatch(authFailure());
        alert(er.response?.data?.error);

        toast({
          title: "Error",
          description: er.response?.data?.error || "Login failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  return (
    <div>
      <ParticlesBg type="cobweb" bg={true} />
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

        <div
          onClick={() => navigate("/forgot-password")}
          style={{
            textAlign: "right",
            width: "81%",
            margin: "auto",
            marginTop: "10px",
            cursor: "pointer",
            color: "#bb8135",
            fontFamily: "Poppins",
            fontSize: "14px",
          }}
        >
          Forgot Password?
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
