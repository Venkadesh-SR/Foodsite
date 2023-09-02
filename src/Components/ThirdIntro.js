import React from 'react'
import './ThirdIntro.css'

import Thirdlogo from './Images/Thirdlogo.png'
import { useNavigate } from 'react-router-dom'
function ThirdIntro() {
  const navigate = useNavigate();
  return (
    <div className='thirdintroback' >
  
      <div className='container1t'>
        <h1 className='thead'>Sweety <span className='theads'>Cafe</span></h1>
      <img src={Thirdlogo} className="tlogo"/>
      
      </div>
      <div className='contentt'>
      <h2>Get delivery at your door step</h2>
      <p>We will deliver your order on time</p>
    <button className='but1t' onClick={() => navigate('/Signup')}>Get Started</button><br/>
    <button className='but2t'  onClick={() => navigate('/Signin')}>Sign Up</button>
    </div>
    </div>
  )
}

export default ThirdIntro
