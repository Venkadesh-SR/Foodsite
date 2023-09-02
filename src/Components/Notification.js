import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Notification.css'
import Notificationlogo from './Images/Notificationimage.png'
function Notification() {
const[getnotify,setGetnotify] = useState(null)
const location = useLocation();
const useremail = location.state.useremail;

useEffect(()=>{
  notified();
},[])
async function notified() {
  try {
    await axios.post("http://localhost:5000/getnot", {
     useremail
    }).then((res) =>{
      setGetnotify(res.data)
      
    }).catch((error) =>{
      console.log(error)
    })
  } catch (e) {
    console.error(e);
  }
}

  return (
    <div>
      <h2  className='headno'>Notification</h2>
      <div className='totalimno'>
      <img src = {Notificationlogo} className="foodlogono"/>
        <div className='subimno'>
      
      {getnotify === null
  ? ""
  : getnotify.map((data, index) => {

      return (
        
      <div key={index}>
         
              <ul className='ulno'>
          <li>{data.Notification}</li>
          </ul>
          
         
        </div>
      );
    })}
    </div>
    </div>
    </div>
  )
}

export default Notification
