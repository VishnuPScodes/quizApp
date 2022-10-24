

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './auth.css'


export const Reg=()=>{
    const [data,setData]=useState([]);
    const navigate=useNavigate();
//trying to resgiter the user to the database with the data got from the registration form
    const handleChange=(e)=>{
        const {id,value}=e.target;
        setData({...data,
        [id]:value
        })
    }
    const handleRegister=()=>{
        console.log('yes');
       axios.post('http://localhost:5000/reg',data).then((res)=>{
        console.log(res.data);
       }).catch((er)=>{
        console.log(er);
       })
    }
  return <div>
    <div className="log-main">
      <div className='welcome' >Welcome to registration page</div>
      <div className="log-input">
        <input id='email' onChange={handleChange} className='log-input' type="email" placeholder="email address" />
      </div>
      <div className="log-input">
        <input id='password' onChange={handleChange} className='log-input' type="password" placeholder="Password"  />
      </div>
      <div className="log-btn">
        <button onClick={handleRegister} className='log-btn'>Register</button>
      </div>
  
    </div>
  </div>
}