import React,{useEffect, useState} from 'react'
import Settinglogo from './Images/Setting.png'
import './Setting.css'
import {useLocation} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
function Setting() {
    const[usernamechange,setUsernamechange] = useState('');
  const[mnchange,setMnchange] = useState('');
  const[pchange,setPchange] = useState('');
  const[cpchange,setCpchange] = useState('');
  const location = useLocation();
  const useremail = location.state.useremail;
  const username = location.state.username;

  const[totaladdress,setTotaladdress] = useState([]);
const[dum1,setDum1] = useState('')
const[dum2,setDum2] = useState('')
const[dum3,setDum3] = useState('')

const notify =`hello ${username},your userdetails can be updated Successfully`
  useEffect(()=>{
      
getset();
      
  },[totaladdress])

 async function getset(){
     try{
        const response = await axios.post("http://localhost:5000/getuserdetails", {
            useremail
          });
          const data = response.data;
          setTotaladdress(data);

 } catch(error){
         console.log(error);
     }
    {totaladdress.map((item,index)=>{
       
         setDum1(item.mobileno)
         setDum2(item.password)
         setDum3(item.cpassword)
         
     })}
     
}

  const put = async() =>{
    if(pchange === cpchange){
    getnotifyaddress()
    toast.success('Userdetails changed successfully !', {
      position: toast.POSITION.TOP_RIGHT
  });
   
    try{
        await axios.put("http://localhost:5000/putuserdetails",{
            useremail,mnchange,pchange,cpchange
        })
        .then((res) =>{
            console.log(res.data)
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

  async function getnotifyaddress(){
  try{
    await axios.post("http://localhost:5000/postnotify",{
        useremail,username,notify
    }).then((res) =>{
        console.log(res.data)
    }).catch((error) =>{
        console.log(error)
    })
}
catch(e){
   console.log(e)
}
  }
  return (
    <div>

        <h1 className='headsetting'>Setting</h1>
        
    <div className='totalimst'>
    <img src = {Settinglogo} className="foodlogoad"/>
      <div className='subimst'>
      <h1 className='headst'>Useremail</h1>
    <input type="text" className='inputst' defaultValue={useremail} disabled />
    <h1 className='headst'>Username</h1>
    <input type="text" className='inputst'  defaultValue={username} disabled/>
    <h1 className='headst' >Mobile number</h1>
    <input type="text" className='inputst' onChange={(e) => setMnchange(e.target.value)} defaultValue={dum1}/>
    <h1 className='headst'>Password</h1>
    <input type='password' className='inputst' onChange={(e) => setPchange(e.target.value)} defaultValue={dum2}/>
    <h1 className='headst'>Confirm Password</h1>
    <input type="password"  className='inputst' onChange={(e) => setCpchange(e.target.value)} defaultValue={dum3}/>
      
      </div>
      </div>
      
      <button className="butst" onClick={ put}>Change</button>
     
  </div>
  )
}

export default Setting
