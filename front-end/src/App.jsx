import { useState } from "react";
import "./App.css";
import { Allroutes } from "./components/Allroutes";
import { Log } from "./pages/Auth/Log";
import { Question } from "./pages/Quesiton";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <Allroutes />
      {/* <Question/>
     <Log/> */}
    </div>
  );
}

export default App;
