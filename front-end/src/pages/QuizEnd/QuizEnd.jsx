import { Graph } from "../../components/Grapgh/Graph";
import "./end.css";

export const QuizEnd = ({ score }) => {
  return (
    <div>
      <div className="q-cont">
        <div className="quiz-end">The quiz has Ended </div>

        <div className="quiz-end">your score is : {score}</div>
      </div>
      <div className="line">Line graph</div>
      <Graph />
    </div>
  );
};
