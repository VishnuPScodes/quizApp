import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Graph } from "../../components/Grapgh/Graph";
import { emptyScoreArray } from "../../redux/action";
import "./end.css";

export const QuizEnd = ({ score }) => {
  const dispatch=useDispatch();
  useEffect(() => {
    axios
      .delete("https://digiaccel-c.herokuapp.com/questbank")
      .then((e) => {
        console.log(e.data);
        //dispatching an action to remove all the score details from redux
        dispatch(emptyScoreArray())
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);
  return (
    <div>
      <div className="q-cont">
        <div className="quiz-end">The quiz has Ended </div>

        <div className="quiz-end">your score is :{score} </div>
      </div>
      <div className="line">Line graph</div>
      <Graph />
    </div>
  );
};
