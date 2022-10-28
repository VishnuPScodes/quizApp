import "./question.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { QuizEnd } from "./QuizEnd/QuizEnd";
import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { addScore } from "../redux/action";
import { NoQuestions } from "./NoQuestions.jsx/NoQuestions";

export const Question = () => {
  const [single, setSingle] = useState(1);
  const [dfl, setDfl] = useState(5);
  //if no question available => making a state to detect that
  const [noq, setNoq] = useState(false);

  //counter to count the number of questions asked

  const [count, setCount] = useState(0);
  //score ,state to calculate the total score

  const [score, setScore] = useState(0);
  //array of scores to indicate the score on each stages

  const [data, setData] = useState([]);

  const [ind, setind] = useState(4);

  const [loader, setLoader] = useState(true);
  //using use dispatch to dispatch an action to redux to change value im redux
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://digiaccel-c.herokuapp.com/questbank/6356d83fcf8e99fdef105f23")
      .then((e) => {
        let data = e.data;

        setSingle(data);
        setLoader(false);
      });
  }, []);

  //function to check the correctness of the answer given by user

  const handleCheck = (ans) => {
    axios
      .post(`https://digiaccel-c.herokuapp.com/questbank/${single._id}?q=${ans}`)
      .then((e) => {
        if (e.data == "") {
          console.log("daaang");
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
            console.log("count is", count);
            dispatch(addScore(score));
          } else {
            setScore((p) => p - 2);
            setCount(count + 1);
            console.log("count is", count);
            dispatch(addScore(score));
          }
          console.log("dr", resDifficulty);
          console.log("recied correct");

          console.log("next question is", e.data);
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
          {noq == true ? (
            <NoQuestions />
          ) : (
            <div>
              {" "}
              {count == 10 ? (
                <QuizEnd score={score} />
              ) : (
                <div>
                  {ind == -1 ? (
                    <QuizEnd score={score} />
                  ) : (
                    <div>
                      <div>
                        <div className="header-q">
                          <div>Difficulty level:</div>
                          <div className={"df-lev-" + dfl}>{dfl}</div>
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
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
