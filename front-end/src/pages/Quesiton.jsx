import "./question.css";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { QuizEnd } from "./QuizEnd/QuizEnd";
import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { addScore } from "../redux/action";
import { Progress } from "@chakra-ui/react";
import {MdTimer} from 'react-icons/md'
export const Question = () => {
  const userScore=useSelector((state)=>state.userScore);

  const [single, setSingle] = useState(1);
  const [dfl, setDfl] = useState(5);
  //if no question available => making a state to detect that
  const [noq, setNoq] = useState(true);
    const intervalRef = useRef(null);
  //counter to count the number of questions asked

  const [count, setCount] = useState(0);
  //score ,state to calculate the total score

  const [score, setScore] = useState(0);

  const [ind, setind] = useState(4);

  const [loader, setLoader] = useState(true);
  //using use dispatch to dispatch an action to redux to change value im redux
  const dispatch = useDispatch();
  const [timer,setTimer]=useState(100000);
  const [useScore,setUserScore]=useState(0);
  useEffect(()=>{
      if (timer == 0) {       
        handleCheck("somewronganswer");
        setTimer(300)
      }
  },[timer])

  useEffect(()=>{     
     intervalRef.current= setInterval(()=>{
      setTimer((p)=>p-1)     
    },1000)
       return () => {
         clearInterval(intervalRef.current);
       };
  },[])

  useEffect(() => {
    axios
      .get("http://localhost:3000/questbank/6356d83fcf8e99fdef105f23")
      .then((e) => {
        let data = e.data;
        setSingle(data);
        setLoader(false);
      })
      .then(() => {
        if (single) {
          setNoq(false);
        }
      });
  }, []);
 
  //function to check the correctness of the answer given by user ,by sending a network request to the back-end

  const handleCheck = (ans) => {
    axios
      .post(`http://localhost:3000/questbank/${single._id}?q=${ans}`)
      .then((e) => {
        if (e.data == "") {
          setind(-1);
        } else {
          let response = e.data;
          let resDifficulty = response.difficulty;
          setDfl(resDifficulty);
          setCount((p) => p + 1);
          let currDifficulty = single.difficulty;
          if (currDifficulty < resDifficulty) {
            setScore((p) => p + 5);
            setCount(count + 1);

            dispatch(addScore(score));
          } else {
            setScore((p) => p - 2);
            setCount(count + 1);

            dispatch(addScore(score));
          }
          setSingle(e.data);
        }
      });
  };
  return (
    <>
      {loader ? (
        <div className="loader">
          <Audio
            height="120"
            width="120"
            radius="9"
            color="antiquewhite"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <div>
          <div className="cont-que">
            {" "}
            {count == 10 ? (
              <QuizEnd score={score} />
            ) : (
              <div>
                {ind == -1 ? (
                  <QuizEnd score={score} />
                ) : (
                  <div>
                    <div className="box-cont">
                      <Progress hasStripe color="red" value={64} />
                      <div className="all-container">
                        <div>
                          <div className="header-q">
                            <div className="dff-que-text">
                              Difficulty level:
                            </div>
                            <div className="star-box">
                              {Array(10)
                                .fill("")
                                .map((_, i) => (
                                  <AiFillStar
                                    key={i}
                                    color={i < dfl ? "red" : "gray"}
                                  />
                                ))}
                            </div>
                            <div className="timer-icon">
                              <MdTimer />
                            </div>
                            <div className="timer">{timer}</div>
                          </div>
                          <div className="q-main">
                            <div className="q-plate">{single?.question}</div>
                            <div className="a-plate">
                              <div className="first">
                                <div
                                  className="q-1"
                                  onClick={() => {
                                    handleCheck(single?.option1);
                                  }}
                                >
                                  {single?.option1}
                                </div>
                                <div
                                  className="q-1"
                                  onClick={() => {
                                    handleCheck(single?.option2);
                                  }}
                                >
                                  {single?.option2}
                                </div>
                              </div>
                              <div className="second">
                                <div
                                  className="q-1"
                                  onClick={() => {
                                    handleCheck(single?.option3);
                                  }}
                                >
                                  {single?.option3}
                                </div>
                                <div
                                  className="q-1"
                                  onClick={() => {
                                    handleCheck(single?.option4);
                                  }}
                                >
                                  {single?.option4}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="user-name">Vishnu PS</div>
                          <div>Your over all score:{userScore}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
