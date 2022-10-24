

import { useNavigate } from 'react-router-dom'
import './auth.css'


export const Reg=()=>{
    const navigate=useNavigate();
    const handleRegister=()=>{
        console.log('yes');
      
    }
  return <div>
    <div className="log-main">
      <div className='welcome' >Welcome to registration page</div>
      <div className="log-input">
        <input className='log-input' type="text" placeholder="email address" />
      </div>
      <div className="log-input">
        <input className='log-input' type="password" placeholder="Password"  />
      </div>
      <div className="log-btn">
        <button onClick={handleRegister} className='log-btn'>Register</button>
      </div>
  
    </div>
  </div>
}