
import './end.css'

export const QuizEnd=({score})=>{
    return <div>
        <h2>Quize has Ended :)</h2>
        <button className="btn-end">See my score </button>
        <h1>your score is : {score}</h1>
    </div>
}