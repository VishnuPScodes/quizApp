import './question.css';
import { AiFillStar } from 'react-icons/ai';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { QuizEnd } from './QuizEnd/QuizEnd';
import { Audio } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { addScore } from '../redux/action';
import { Progress } from '@chakra-ui/react';
import { MdTimer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
export const Question = () => {
  const userScore = useSelector((state) => state.userScore);
  const [loading, setLoading] = useState(false);
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
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  //using use dispatch to dispatch an action to redux to change value im redux
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const [useScore, setUserScore] = useState(0);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((p) => p + 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4001/questbank/6356d83fcf8e99fdef105f23')
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
    setLoading(true);
    axios
      .post(`http://localhost:4001/questbank/${single._id}?q=${ans}`)
      .then((e) => {
        if (e.data == '') {
          setind(-1);
          setLoading(false);
        } else {
          setLoading(false);
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
            setLoading(false);
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
            {' '}
            {count == 10 ? (
              <QuizEnd timeTaken={timer} score={score} />
            ) : (
              <div>
                {ind == -1 ? (
                  <QuizEnd timeTaken={timer} score={score} />
                ) : (
                  <div>
                    {single?.question?.length > 2 ? (
                      <div>
                        <div className="box-cont">
                          <Progress hasStripe color="red" value={64} />
                          {loading && (
                            <div className="loader-spinner">
                              <Spinner
                                speed="0.65s"
                                emptyColor="gray"
                                size="xl"
                                style={{
                                  height: '50px',
                                  width: '50px',
                                  position: 'absolute',
                                  top: '30%',
                                  left: '40%',
                                  zIndex: '3',
                                }}
                              />
                            </div>
                          )}

                          <div className="all-container">
                            <div>
                              <div className="header-q">
                                <div className="dff-que-text">
                                  Difficulty level:
                                </div>
                                <div className="star-box">
                                  {Array(10)
                                    .fill('')
                                    .map((_, i) => (
                                      <AiFillStar
                                        key={i}
                                        color={i < dfl ? 'red' : 'gray'}
                                      />
                                    ))}
                                </div>
                                <div className="timer-icon">
                                  <MdTimer />
                                </div>
                                <div className="timer">{timer}</div>
                              </div>
                              <div className="q-main">
                                <div className="q-plate">
                                  {single?.question}
                                </div>
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
                            <div className="stats-cont">
                              <div>
                                <div className="user-name">Vishnu PS</div>
                                <div className="over-score">
                                  Your over all score:{userScore}
                                </div>
                              </div>
                              <div>
                                <div>Session score:{score}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="quiz-add-text">
                          Please add questions from the admin page to
                          participate in our quiz competetion
                        </div>
                        <div
                          onClick={() => {
                            navigate('/admin');
                          }}
                          className="save-btn"
                        >
                          Add Questions
                        </div>
                      </div>
                    )}
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
