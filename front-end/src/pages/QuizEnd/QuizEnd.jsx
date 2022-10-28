import axios from "axios";
import { useEffect } from "react";
import { Graph } from "../../components/Grapgh/Graph";
import "./end.css";

export const QuizEnd = ({ score }) => {
  useEffect(() => {
    axios
      .delete("https://digiaccel-c.herokuapp.com/questbank")
      .then((e) => {
        console.log(e.data);
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
