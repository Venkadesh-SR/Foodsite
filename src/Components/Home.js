import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './Home.css'
import { toast } from 'react-toastify';

function Home(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const useremail = location.state.email;
  
  const username =props.username;
  const foodname = props.name;
  const useremailcart = location.state.email;
  const usernamecart = props.username;
  const foodnamecart = props.name;
  const foodimagecart = props.image;
  const ratingcart = props.truerating;
  const pricecart = props.price;
  const [count,setCount] = useState(2);
  const [foodnamedelcart,setFoodnamedelcart] = useState(2)
  
    const notify = `hello ${usernamecart},${foodname} successfully added to yout cart`
    const [ff,setFf] = useState(false)
    
  async function changefav () {
  

    async function getfavnotify(){
     
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
    

  try{
    
    setCount(3)
       setFf(true)
       
        toast.success('Added to the cart !', {
          position: toast.POSITION.TOP_RIGHT
      });
       
       getfavnotify();
    await axios.post("http://localhost:5000/uploadcart",{
        useremailcart,usernamecart,foodnamecart,foodimagecart,pricecart,ratingcart
    })
    
  .then((res) =>{
    console.log(res.data)
   
  })
  }
  catch(e){
    console.log(e);
  
  }
  

}
async function deletecar() {
  
  try {
    const response = await axios.delete("http://localhost:5000/deleteCartItem", {
      data: { useremail, foodnamedelcart }
    });
    console.log(response.data.message); // Item removed from cart.
    // You might want to refresh the cart data after successful deletion
    setCount(2)
    
    toast.success('Deleted from the cart !', {
      position: toast.POSITION.TOP_RIGHT
  });

  } catch (e) {
    console.error(e);
  }
}


  
async function getfav (){
  try{
    await axios.post("http://localhost:5000/getfav",{
        useremailcart,foodnamecart
    })
    .then((res) =>{
      if(res.data == "include"){
      setCount(3)
     
      }
    })
   
    setFoodnamedelcart(foodnamecart)
  }
  catch(e){
    console.log(e);
  
  }
  


  
}
useEffect(() =>{
 
getfav()
},[useremailcart,foodnamecart,count,username])

  return (
    <div>
     {props.button === "Order Now" ?
     <button className='butca'><FontAwesomeIcon icon={faHeart} onClick={count === 2? changefav:deletecar}
className={count === 3  ? "heatrue" : "heafalse"} /></button>:<button className='butca'></button>}
        <div className='boxh'>
      <img src={props.image} className='imgh'/>
     <h3 className='rating'>{props.rating}</h3>
      <h3 className='fnh'>{props.name}</h3>
      <h3 className='rupe'>{props.rupees}</h3>
     <button className='fnb' onClick={() =>
      props.button ==="Order Now"?
      navigate('./Order',{state:{useremail:useremail,username:username,foodname:foodname, image:props.image,name:props.name,rating:props.rating,rupees:props.price,quotes:props.quotes,foodimage:props.image}})
    :
    ""
    }>{props.button}</button>
      
      
      </div>
      </div>
      
     
      
   
  )
}

export default Home
