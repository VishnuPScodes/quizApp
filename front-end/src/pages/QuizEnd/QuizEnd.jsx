import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Graph } from "../../components/Grapgh/Graph";
import { emptyScoreArray } from "../../redux/action";
import AOS from "aos";
import "./end.css";
import ParticlesBg from "particles-bg";
export const QuizEnd = ({ score }) => {
  const dispatch=useDispatch();
  useEffect(() => {
    axios
      .delete("http://localhost:3000/questbank")
      .then((e) => {
        console.log(e.data);
        //dispatching an action to remove all the score details from redux
        dispatch(emptyScoreArray());
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);
  return (
    <div>
      <ParticlesBg type="custom" bg={true} />
      <div className="q-cont">
        <div className="quiz-end">Congratulations! </div>
        <div className="quiz-end">You have completed the quiz </div>

        <div className="quiz-end">your score is :{score} </div>
      </div>
      <div className="q-cont">
        <div className="quiz-end-2">your score is {score}! </div>
        <div className="quiz-end-2">
          Save your scrore now ! and see it on our whole of fame dashboard{" "}
        </div>
        <div className="save-btn">Save my score</div>
      </div>
      <div className="line">Line graph</div>
      <div data-aos="fade-up">
        <Graph />
      </div>
    </div>
  );
};
