import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Cart.css'

import {useLocation,useNavigate} from 'react-router-dom'
function Cart() {
  const location = useLocation();
  const useremail = location.state.useremail;
  const username = location.state.username;
  const[cartdata,setCartdata] = useState([]);
const navigate = useNavigate();
const quotes="nhogdsng";






  async function cartget(){
    try{
    const responsecart =await axios.post("http://localhost:5000/getcart",{
      useremail
    });
    setCartdata(responsecart.data)
    
   
  }
  catch(e){
    console.log(e);

  }
  
  }
  useEffect(() =>{
    cartget();
    

  },[cartdata])
  return (
    <div>
      <h1 className='carthead'>My Cart</h1>
    <div className='contentcart'> 
      {cartdata.map((food, index) => (
       
        <div className='boxcart' key={index}>
      
        <img src={`${process.env.PUBLIC_URL}${food.Foodimagecart}`} className='imgcart' alt={`Food ${index}`} />
          <h3 className='fncart'>{food.Foodnamecart}</h3>
          <h3 className='ratingcart'>{`${food.Ratingcart}/5`}</h3>
          <h3 className='rupcart'>₹ {food.Pricecart}</h3>
          <button className='fnbcart' onClick={() => navigate("./Order",{state:{rupees:food.Pricecart,foodimage:food.Foodimagecart,foodname:food.Foodnamecart,rating:`${food.Ratingcart}/5`,quotes:quotes,useremail:useremail,username:username,image:food.Foodimagecart,name:food.Foodnamecart}})}>Order now</button>
          
        
        </div>
        
      ))}
    </div>
    </div>
  )
}

export default Cart
