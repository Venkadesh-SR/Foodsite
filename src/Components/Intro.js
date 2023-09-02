import React from 'react'
import { useNavigate } from 'react-router-dom'
import Intrologo from './Images/Introimage.png'
import './Intro.css'


function Intro () {
   const navigate = useNavigate();
  return (
    <div className='introback'>
          
    <div className='container'>
    
      <img src={Intrologo} className="image" onClick={() =>{navigate('/Secondthirdmain')}}/>
      </div>
      <div>
      <h2 className='h2'>Sweety cafe</h2>
      </div>
    </div>
  )
}

export default Intro
