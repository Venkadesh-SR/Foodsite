import React, { useEffect } from 'react'
import axios from 'axios';
import './Order.css'
import Pizza from './Images/pizza.jpg'
import { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Order() {
    const location=useLocation();
    const[amount,setAmount] = useState(1)
    const[totalprice,setTotalprice] = useState(location.state.rupees)
    const[orderdetails,setOrderdetails] = useState('')
    const firstprice = location.state.rupees;
    const useremail = location.state.useremail;
 const username = location.state.username;
 const foodname = location.state.foodname
 const quantity = amount;
 const foodimage = location.state.foodimage;
 const navigate = useNavigate();
 const notify = `hello ${username},your orderedfood ${foodname} is sucessfully received for more details check order history`
 useEffect(() =>{
    
 },[orderdetails,foodname,quantity,totalprice])
    const inc = () =>{
        setAmount(amount+1);
        setTotalprice(parseInt(totalprice) + parseInt(firstprice))
    }
    const dec = () =>{
        if(amount > 1){
            setAmount(amount-1)
            setTotalprice(totalprice - firstprice)
        }
        
    }
    const  orderrr = async() =>{
        toast.success('Order placed Successfully !', {
            position: toast.POSITION.TOP_RIGHT
        });
        setOrderdetails("Hii")
        navigate(-1)
        try{
            
          await axios.post("http://localhost:5000/Order",{
              useremail,username,foodname,quantity,totalprice,foodimage
          }).then((res) =>{
              console.log(res.data)
          }).catch((error) =>{
              console.log(error)
          })
         
    
      }
      catch(e){
          console.log(e);
      }

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
      <div className='order'>
          <h1 className='orheado'>Order <span className='spor'>Confirmation</span></h1>
    <div className='totalordero'>
        
      <div className='boxho'>
       
       <img src={location.state.image} className='imgho'/>
       <h4 className='ratingo'>{location.state.rating}</h4>
       <h2 className='fnho'>{location.state.name}</h2>
       <h4 className='orquo'>{location.state.quotes}</h4>
       <div className='orbutido'><button className='decor' onClick={dec}>-</button><h2 className='amoor'>{amount} </h2><button onClick = {inc}className='incor'>+</button></div>
   
           <h2 className='prior'>₹  {totalprice}</h2>
      <button className='fnbo' onClick={orderrr}>Place Order </button>
      
      </div>
       </div>
    </div>
  )
}

export default Order
