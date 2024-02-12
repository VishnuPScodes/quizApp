
import { useStatStyles } from '@chakra-ui/react';
import axios from 'axios';
import ParticlesBg from 'particles-bg';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './mystats.module.css'

export const Mystats=()=>{
    const [userData,setUserData]=useState([]);
    const userId=useSelector((state)=>state.userId);
    const navigate=useNavigate();
    useEffect(()=>{
        axios
          .get(`https://crocodile-scrubs.cyclic.app/reg/${userId}`)
          .then((res) => {
            setUserData(res.data);
          });
    },[])
    console.log('data',userData);
    return (
      <div>
        <ParticlesBg type="ball" bg={true} />
        <div className={styles.container}>
          <AiOutlineArrowLeft
            onClick={() => {
              navigate("/");
            }}
            fontSize={"32px"}
            style={{
              paddingLeft: "20px",
              paddingTop: "20px",
            }}
          />
          <div className={styles.welcome}> Welcome {userData.name}</div>
          <div className={styles.textCont}>
            <div className={styles.score}>
              {" "}
              Your Total score:{userData?.score}
            </div>
            <div className={styles.score}> Total games played :{userData?.totalgamesplayed}</div>
            <div className={styles.score}> Highest score :10 </div>
            <div className={styles.score}> Lowest score :1 </div>
            <div className={styles.score}> Your best time :{userData?.time?<div>{userData?.time}s</div>:"Not available yet!"} </div>
          </div>
          <div className={styles.thank}>Thank you for playing quiz app! </div>
          <div className={styles.imp}>Wanna improve your stats?</div>
          <div
            onClick={() => {
              navigate("/quiz");
            }}
            className={styles.btn}
          >
            Play Quiz Game!
          </div>
        </div>
        this is my stats
      </div>
    );
}