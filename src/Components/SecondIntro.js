import React from 'react'
import './SecondIntro.css'
import { useNavigate } from 'react-router-dom'
import Secondlogo from './Images/Secondintro.png'
function SecondIntro() {
  const navigate = useNavigate();
  return (
    <div className='secondintroback' >
  
      <div className='container1'>
        <h1 className='schead'>Sweety <span className='scheads'>Cafe</span></h1>
      <img src={Secondlogo} className="sclogo"/>
      
      </div>
      <div className='contentsc'>
      <h2>All your favorites Sweet food</h2>
      <p>You can order food and bevrages anything from your mobile phone.You can also make a preorder for date and time you want</p>
    <button className='but1sc' onClick={() =>{navigate('/Thirdintro')}}>Continue</button><br/>
    <button className='but2sc' onClick={() => navigate('/Signin')}>Sign in</button>
    </div>
    </div>
  )
}

export default SecondIntro
