import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authRequest } from "../../redux/action";
import { ThreeDots } from "react-loader-spinner";
import { AiOutlineArrowLeft } from "react-icons/ai";
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
      .post("http://localhost:3000/reg", data)
      .then((res) => {
        if (res.data == "exists") {
          alert("User already exists ,Please sign in");
          setLoading(false)
        } else {
          setLoading(false);
          alert("Registered");
          navigate("/log");
        }
      })
      .catch((er) => {
        setLoading(false);

        alert("something went wrong");
        console.log("344", er);
      });
  };
  return (
    <div>
      <div className="log-main">
        <AiOutlineArrowLeft
          onClick={() => {
            navigate("/log");
          }}
          fontSize={"32px"}
          style={{
            paddingLeft: "20px",
            paddingTop: "20px",
          }}
        />
        <div className="welcome">Let's Register</div>
        <div className="log-input">
          <input
            id="email"
            onChange={handleChange}
            className="log-input1"
            type="email"
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
        <div className="log-input">
          <input
            id="name"
            onChange={handleChange}
            className="log-input1"
            type="text"
            placeholder="Your name"
          />
        </div>

        <button onClick={handleRegister} className="log-btn1">
          {loading == true ? (
            <div className="loader">
              <ThreeDots
                style={{
                  textAlignL: "center",
                  alignSelf: "center",
                }}
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
            "Register"
          )}
        </button>
      </div>
    </div>
  );
};
