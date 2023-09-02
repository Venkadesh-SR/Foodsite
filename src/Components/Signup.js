import React from 'react'
import './Signup.css'
import axios from 'axios';
import { useState } from 'react'
import logo1 from './Images/signuplogo1.png'
import logo2 from './Images/signuplogo2.png'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Signup() {
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[mobileno,setMobileno] = useState('');
    const[password,setPassword] = useState('');
    const[cpassword,setCpassword] = useState('');
const [value,setValue] = useState(' ');
const navigate = useNavigate();
    async function store (){
      if(password === cpassword){
      
     
        try{

          await axios.post("http://localhost:5000/Signup",{
              name,email,mobileno,password,cpassword
          }).then((res) =>{
            if(res.data === "exist"){
              toast.success('User already registered !', {
                position: toast.POSITION.TOP_RIGHT
            });
            }
            else{
              toast.success('Registration Successfull !', {
                position: toast.POSITION.TOP_RIGHT
            });
              navigate('/Signin')
            }
          })
         

      }
      catch(e){
          console.log(e);

      }
    }
    else{
      toast.success('Password does not match !', {
        position: toast.POSITION.TOP_RIGHT
    });
    }

  }
    
  return (
    <div className='signup'>
      <div className='masiup'>
      <h1 className='mash'>Welcome Back!</h1>
      <h2>Registration</h2></div>
      <div className='subsignup'>
<h2 className='headsiu'>Name</h2>
<input type="text" className ="insu" onChange={(e) => {setName(e.target.value)}}/>
<h2 className='headsiu'>Email</h2>
<input type="text" className ="insu" onChange={(e) => {setEmail(e.target.value)}}/>
<h2 className='headsiu'>Mobile No</h2>
<input type="text"  className ="insu"onChange={(e) => {setMobileno(e.target.value)}}/>
<h2 className='headsiu'>Password</h2>
<input type="password" className ="insu" onChange={(e) => {setPassword(e.target.value)}}/>
<h2 className='headsiu'>Confirm Password</h2>
<input type="password" className ="insu" onChange={(e) => {setCpassword(e.target.value)}}/>
<button onClick={store} className="sigsu">Register</button>
    </div>
    <div className='sigr'>
    <img src={logo1} alt="logo1"/>
    <br/>
    <h1>Sweety <span className='spsu'>Cafe</span></h1>
    <img src={logo2}/>
    
    </div>
    </div>
  )
  }

export default Signup;
