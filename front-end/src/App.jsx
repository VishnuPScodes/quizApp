import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Question } from './pages/Quesiton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     welcome
     <Question/>
    </div>
  )
}

export default App
