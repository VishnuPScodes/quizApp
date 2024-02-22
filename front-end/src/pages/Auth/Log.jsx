import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addId,
  addScore,
  addToken,
  addUserScore,
  authFailure,
  authRequest,
  authSuccess,
} from '../../redux/action';
import { ThreeDots } from 'react-loader-spinner';
import './auth.css';
import { useToast } from '@chakra-ui/react';

import ParticlesBg from 'particles-bg';

export const Log = () => {
  const toast = useToast();
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
    navigate('/reg');
  };

  //using the data from the form to make a post request to the backend to confirm the authentication

  const handleLogin = () => {
    toast({
      title: 'Alert!',
      description: 'Your message here.',
      status: 'success',
      duration: 3000, // 3 seconds
      isClosable: true,
    });
    dispatch(authRequest());
    axios
      .post('http://localhost:4001/auth/login', data)
      .then((res) => {
        console.log('into then');
        console.log('ress', res.data.token);
        dispatch(authSuccess());
        dispatch(addToken(res.data.token));
        dispatch(addId(res.data.user._id));

        dispatch(addUserScore(res.data.user.score));
        alert('login successful');
        navigate('/');
      })
      .catch((er) => {
        dispatch(authFailure());
        alert(er.response.data.error);
        console.log('eer', er.response.data.error);
      });
  };

  //taking data from the form

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
            navigate('/Admin');
          }}
          className="log-btn1"
        >
          Admin
        </button>
      </div>
    </div>
  );
};
