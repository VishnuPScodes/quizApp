import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Graph } from '../../components/Grapgh/Graph';
import { emptyScoreArray } from '../../redux/action';
import { AiFillHome } from 'react-icons/ai';
import AOS from 'aos';
import './end.css';
import ParticlesBg from 'particles-bg';
import { useNavigate } from 'react-router-dom';
export const QuizEnd = ({ score, timeTaken }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  const [userData, setUserData] = useState([]);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    axios
      .get(`https://drab-jade-viper-suit.cyclic.app/auth/profile/${userId}`)
      .then((res) => {
        setUserData(res.data);
      });
  }, []);

  const handleSave = () => {
    axios
      .patch(
        `https://drab-jade-viper-suit.cyclic.app/halloffame/update/${userId}`,
        {
          userScore: Number(score),
          time: timeTaken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert('Your score has been saved!');
        navigate('/');
      })
      .catch((err) => {
        alert('There was an error saving your score:', err);
        console.log(err);
      });
  };
  return (
    <div>
      <ParticlesBg type="custom" bg={true} />
      <div className="q-cont">
        <div className="quiz-end">Congratulations! </div>
        <div className="quiz-end">
          {userData?.name} You have completed the quiz{' '}
        </div>

        <div className="quiz-end">your score is :{score} </div>
      </div>
      <div className="q-cont">
        <div className="quiz-end-2">your score is {score}! </div>
        <div className="quiz-end-2">
          Save your scrore now ! and see it on our hall of fame dashboard{' '}
        </div>
        <div className="save-btn" onClick={handleSave}>
          Save my score
        </div>
        <div
          className="save-btn"
          onClick={() => {
            navigate('/');
          }}
        >
          <AiFillHome fontSize={'24px'} /> Home
        </div>
      </div>
      <div className="line">Line graph</div>
      <div data-aos="fade-up">
        <Graph />
      </div>
    </div>
  );
};
