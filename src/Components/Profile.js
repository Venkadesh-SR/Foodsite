import React from 'react'
import { useNavigate,useLocation} from 'react-router-dom'
import './Profile.css'
import { toast } from 'react-toastify';
function Profile(props) {
  const navigate = useNavigate();
  const logout = () =>{
    toast.success('Logout successfully !', {
      position: toast.POSITION.TOP_RIGHT
  });
navigate('./Signin')
  }
  return (
    <div>
<div className='headp'>
      <h2>{props.profilename}</h2>
      <h2>{props.profileemail}</h2></div>
 <ul className='ulp'>
          <li onClick={() => navigate('./Cart',{state:{useremail:props.profileemail,username:props.profilename}})}>My Cart</li>
          <li onClick={() => navigate('./Notification',{state:{useremail:props.profileemail,username:props.profilename}})}>Notification</li>
          <li onClick={() => navigate('./Address',{state:{useremail:props.profileemail,username:props.profilename}})}>My Address</li>
          <li onClick={() => navigate('./Setting',{state:{useremail:props.profileemail,username:props.profilename}})}>Setting</li>
          <li onClick={logout}>Logout</li>
    
      </ul>
    </div>
  )
}

export default Profile
