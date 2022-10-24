

import './auth.css'


export const Log=()=>{
  return <div>
    <div className="log-main">
      <div className='welcome' >Welcom to login page</div>
      <div className="log-input">
        <input className='log-input' type="text" placeholder="email address" />
      </div>
      <div className="log-input">
        <input className='log-input' type="password" placeholder="Password"  />
      </div>
      <div className="log-btn">
        <button className='log-btn'>Login</button>
      </div>
      <div className="log-not-reg">
        Not registerd yet ?
      </div>
      <div className="log-btn">
        <button className='log-btn'>Register</button>
      </div>
    </div>
  </div>
}