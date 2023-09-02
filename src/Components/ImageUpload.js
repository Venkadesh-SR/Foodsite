import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './ImageUpload.css'
import Addfood from './Images/Addfood.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function ImageUpload() {
  const [imagee, setImage] = useState(null);
 
  const[uploadrating,setUploadrating] = useState('');
  const[uploadPrice,setUploadPrice] = useState('');
  const[food,setFood] = useState('');
  const[uploadquotes,setUploadquotes] = useState('');
  const navigate = useNavigate();

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    
  };

  const sub = async (e) => {
    toast.success('Fooditems Uploaded successfully !', {
      position: toast.POSITION.TOP_RIGHT
  });
    navigate(-1)
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imagee);
    formData.append("foodname",food);
    formData.append("price",uploadPrice);
    formData.append("rating",uploadrating);
    formData.append("quotes",uploadquotes)

    await axios.post(
      "http://localhost:5000/up",
    formData
      );
  };
  
 

  return (
    <div>
      <div className='totalimup'>
      <img src = {Addfood} className="foodlogoiu"/>
        <div className='subimup'>
         
      <h1 className='headiu'>Select Image </h1>
      <input type="file" className='inputiui' onChange={onInputChange}></input>
      <h1 className='headiu'>Foodname</h1>
      <input type="text" className='inputiu'onChange={(e) => setFood(e.target.value)}/>
      <h1 className='headiu' >Price</h1>
      <input type="text" className='inputiu' onChange={(e) => setUploadPrice(e.target.value)}/>
      <h1 className='headiu'>Rating</h1>
      <input type="text" className='inputiu' onChange={(e) => setUploadrating(e.target.value)}/>
      <h1 className='headiu'>quotes</h1>
      <input type="text"  className='inputiu' onChange={(e) => setUploadquotes(e.target.value)}/>
        
        </div>
        </div>
        
        <button onClick={sub} className="butiu">Upload</button>
       
    </div>
  )
}

export default ImageUpload
