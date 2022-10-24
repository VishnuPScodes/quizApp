import "./question.css";
import { Badge, flatten, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { QuizEnd } from "./QuizEnd/QuizEnd";
import { Audio } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { addScore } from "../redux/action";

export const Question = () => {
  const [dfl, setDfl] = useState(5);
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
      .get("http://localhost:5001/question")
      .then((res) => {
        setData(res.data);
      })
      .then(() => {
        setLoader(false);
      });
  }, []);

  //function to check the correctness of the answer given by user

  const handleCheck = (ans) => {
    if (ans == data[ind].answer) {
      if (ind == 9) {
        setind(-1);
      } else {
        setLoader(true);
        setCount((count) => count + 1);
        let array = [...data];
        let questionis = array.filter((a) => {
          return a.difficulty == data[ind].difficulty + 1;
        });
        let index = Number(questionis[0].id) - 1;
        setDfl(index + 1);
        setind(index);
        setScore((p) => p + 5);
        dispatch(addScore(score));
        setLoader(false);
      }
    } else {
      if (ind == 0) {
        setind(-1);
      } else {
        setLoader(true);
        setCount((p) => p + 1);
        let array = [...data];
        let questionis = array.filter((a) => {
          return a.difficulty == data[ind].difficulty - 1;
        });
        let index = Number(questionis[0].id) - 1;
        setDfl(index + 1);
        setScore((p) => p - 2);
        dispatch(addScore(score));
        setind(index);
        setLoader(false);
      }
    }
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
          {" "}
          {count == 10 ? (
            <QuizEnd score={score} />
          ) : (
            <div>
              {ind == -1 ? (
                <QuizEnd score={score} />
              ) : (
                <div>
                  <div className="header-q">
                    <div>Difficulty level:</div>
                    <div className={"df-lev-" + dfl}>{dfl}</div>
                  </div>
                  <div className="q-main">
                    <div className="q-plate">{data[ind]?.question}</div>
                    <div className="a-plate">
                      <div className="first">
                        <div
                          className="q-1"
                          onClick={() => {
                            handleCheck(data[ind]?.option1);
                          }}
                        >
                          {data[ind]?.option1}
                        </div>
                        <div
                          className="q-1"
                          onClick={() => {
                            handleCheck(data[ind]?.option2);
                          }}
                        >
                          {data[ind]?.option2}
                        </div>
                      </div>
                      <div className="second">
                        <div
                          className="q-1"
                          onClick={() => {
                            handleCheck(data[ind]?.option3);
                          }}
                        >
                          {data[ind]?.option3}
                        </div>
                        <div
                          className="q-1"
                          onClick={() => {
                            handleCheck(data[ind]?.option4);
                          }}
                        >
                          {data[ind]?.option4}
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
    </>
  );
};
