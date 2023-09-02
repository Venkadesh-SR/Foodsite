import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Favorite.css'
import Addlogo from './Images/Addlogo.webp'
import axios, { all } from 'axios'
import { get } from 'mongoose'
function Favorite(props) {
  const [orderdata,setOrderdata] = useState([])
  const[orderemail,setOrderemail] = useState('')
  const [food,setfood] = useState("hgii");
  const[price,setprice] = useState('')
  const location = useLocation();
  const useremail = props.useremail
  const [allImage, setAllImage] = useState();
  const[controlord,setControlord] = useState(0);
  
  const[getordername,setGetordername] = useState('')

useEffect(() =>{
 if(controlord == 0){
  fetchorder();
 }
 
  
},[orderdata])


   
  



const fetchorder = async () => {
  try {
    const response = await axios.post("http://localhost:5000/favorite",{
      useremail});
   setOrderdata(response.data)
   console.log(orderdata)
   setGetordername(response.data.Foodname);
   setControlord(1);
   
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  {orderdata.map((item) => (
      
    setGetordername(item.Foodname),
setprice(item.Price)
  ))}
 
}




  
  return (
    <div >
      <h2 className='headfav'>Recent Orders</h2>
    <div className='favtotal'>
    
    
        {orderdata.map((food, index) => (
          <div className='boxfav' key={index}>
          <img src={`${process.env.PUBLIC_URL}${food.Foodimage}`} className='imgfav'/>
          <h3 className='fnfav'>{food.Foodname}</h3>
          <h3 className='quantitfav'>Quantity:{food.Quantity}</h3>
          <h3 className='rupfav'>₹ {food.Price}</h3>
          
          </div >
        ))}
  
      </div>
     </div>
      
  )
}

export default Favorite
