import React, { useState } from 'react'
import './Signin.css'
import axios from 'axios'
import stm1 from './Images/stm1.png'
import google from './Images/Google.png'
import apple from './Images/Apple.png'
import { useNavigate } from 'react-router-dom'
import {useLocation} from 'react-router-dom';
import { toast } from 'react-toastify';
function Signin() {
  const navigate =  useNavigate();
  const location=useLocation();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const count = 0;
  
 
  async function handle(){
    try{

      await axios.post("http://localhost:5000/Signin",{
          email,password
      })
      .then(res=>{
        if(res.data=="exist"){
          navigate('/Homemain',{state:{email:email}});
          toast.success('Welcome to the site !', {
            position: toast.POSITION.TOP_RIGHT
        });
        
      }
      if(res.data=="detail"){
        toast.success('Enter the valid details !', {
          position: toast.POSITION.TOP_RIGHT
      });
      }
      else if(res.data=="notexist"){
        toast.success('Please signup to continue !', {
          position: toast.POSITION.TOP_RIGHT
      });
      }
  })
  .catch(e=>{
      alert("wrong details")
      console.log(e);
  })
    }
      catch(e){
        console.log(e);
}
  }

  
  return (
    <div className='signin'>
    <div className='totalsign'>
      <img src = {stm1} className="signim" onClick={() => navigate('/Secondthirdmain')}/>
      <h1 >Welcome Back!</h1>
      <h4>Sign to your account</h4>
     
<div className='subsignin'>
      <h3 className='headsign'>Email</h3>
      <input type="text" className='insi'placeholder='   Your email' onChange={(e) => setEmail(e.target.value)}/>
      <h3 className='headsign'>Password</h3>
      <input type="password" className='insi' placeholder='   Your password' onChange={(e) => setPassword(e.target.value)}/>
      <h3 onClick={() => navigate('/Forgotpassword')}>Forgot <span className='spsi'>Password</span></h3>


      <button className='butsi' onClick={handle}>Login</button>

      <h4>Don't have an acoount?  <span className='spsi' onClick={() => navigate('/signup')}>signup</span></h4>
<div className='underlinesi'>
     <hr className='hrl'/><h1 className='unhsi'>  Or which  </h1>
     </div>
     
    <button className='butsib' onClick={() => navigate('/Signup')}><img src = {google} className="butlogsi"/>  Sign in with Google</button><br/><br/>
    <button className='butsib'onClick={() => navigate('/Signup')}><img src = {apple} className="butlogsi"/>   Sign in with Apple</button>
    </div>
    </div>
    </div>
  )
}

export default Signin;
