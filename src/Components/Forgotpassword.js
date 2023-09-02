import React,{useEffect, useState} from 'react'
import Settinglogo from './Images/Setting.png'
import './Forgotpassword.css'
import { useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
function Forgotpassword() {
   
  const[mnchange,setMnchange] = useState('');
  const[pchange,setPchange] = useState('');
  const[cpchange,setCpchange] = useState('');
  const location = useLocation();
 const[useremail,setUseremail] = useState('');
 const navigate = useNavigate();
const[fc,setFc] = useState(false)




const si = () =>{
    navigate('/Signin')
}

  const putt = async() =>{
    if(pchange === cpchange){
setFc(true)
    toast.success(`Password changed successfully  !`, {
      position: toast.POSITION.TOP_RIGHT
  });
   
    try{
        await axios.put("http://localhost:5000/forgotpassword",{
            mnchange,pchange,cpchange
        })
        .then((res) =>{
            console.log(res.data)
            setUseremail(res.data)
        }).catch((e) =>{
            console.log(e);
        })
    }
    catch(error){
        console.log(error)
    }
    
  }
  else{
    toast.success('Password does not match !', {
        position: toast.POSITION.TOP_RIGHT
    });
  }
}

 
  return (
    <div>

        <h1 className='headsetting'>Forgotpassword</h1>
        
    <div className='totalimst'>
    <img src = {Settinglogo} className="foodlogoad"/>
      <div className='subimst'>
    <h1 className='headst' >Mobile number</h1>
    <input type="text" className='inputst' onChange={(e) => setMnchange(e.target.value)} />
    <h1 className='headst'>Password</h1>
    <input type='password' className='inputst' onChange={(e) => setPchange(e.target.value)} />
    <h1 className='headst'>Confirm Password</h1>
    <input type="password"  className='inputst' onChange={(e) => setCpchange(e.target.value)} />
      <h2 className='usf'>Your Useremail : {useremail}</h2>
      
      </div>
      </div>
      
      <button className="butst" onClick={fc?si: putt}> {fc?"Signin":"Change"}</button>
     
  </div>
  )
}

export default Forgotpassword
