import { useState } from "react";
import "./App.css";
import { Allroutes } from "./components/Allroutes";
import { Admin } from "./pages/Admin/Admin";
import Drag from "./pages/Admin/Drag";
import { Log } from "./pages/Auth/Log";
import { Question } from "./pages/Quesiton";
import { QuizEnd } from "./pages/QuizEnd/QuizEnd";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <Allroutes />

    </div>
  );
}

export default App;
