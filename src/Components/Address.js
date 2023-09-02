import React,{useEffect, useState} from 'react'
import Addresslogo from './Images/Addresslogo.png'
import './Address.css'
import {useLocation} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
function Address() {
    const[door,setDoor] = useState('');
  const[village,setVillage] = useState('');
  const[district,setDistrict] = useState('');
  const[pin,setPin] = useState('');
  const location = useLocation();
  const useremail = location.state.useremail;
  const username = location.state.username;
  const [countad,setCountad] =useState(false);
  const[totaladdress,setTotaladdress] = useState([]);
const[dum1,setDum1] = useState('')
const[dum2,setDum2] = useState('')
const[dum3,setDum3] = useState('')
const[dum4,setDum4] = useState('')
const notify =`hello ${username} your address can be updated Successfully`
  useEffect(()=>{
      
getad();
      
  },[totaladdress])

 async function getad(){
     try{
        const response = await axios.post("http://localhost:5000/getaddress", {
            useremail
          });
          const data = response.data;
          setTotaladdress(data);

 } catch(error){
         console.log(error);
     }
    {totaladdress.map((item,index)=>{
        setCountad(true)
         setDum1(item.Doorno)
         setDum2(item.Village)
         setDum3(item.District)
         setDum4(item.Pincode)
     })}
     
}
  const Upload = async() =>{
    getnotifyaddress()
    toast.success('Address uploaded successfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
      setCountad(true)
      try{
          await axios.post("http://localhost:5000/addaddress",{
              username,useremail,door,village,district,pin
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

  const put = async() =>{
    getnotifyaddress()
    toast.success('Address changed successfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
    setCountad(true)
    try{
        await axios.put("http://localhost:5000/putaddress",{
            username,useremail,door,village,district,pin
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

        <h1 className='headaddress'>Address</h1>
        
    <div className='totalimad'>
    <img src = {Addresslogo} className="foodlogoad"/>
      <div className='subimad'>
       
    <h1 className='headad'>Doorno & Streetname</h1>
    <input type="text" className='inputad'onChange={(e) => setDoor(e.target.value)} defaultValue={dum1} />
    <h1 className='headad' >Village/Town/City</h1>
    <input type="text" className='inputad' onChange={(e) => setVillage(e.target.value)} defaultValue={dum2}/>
    <h1 className='headad'>District</h1>
    <input type="text" className='inputad' onChange={(e) => setDistrict(e.target.value)} defaultValue={dum3}/>
    <h1 className='headad'>Pincode</h1>
    <input type="text"  className='inputad' onChange={(e) => setPin(e.target.value)} defaultValue={dum4}/>
      
      </div>
      </div>
      
      <button className="butad" onClick={countad ? put : Upload}>{countad ?"Change":"Upload"}</button>
     
  </div>
  )
}

export default Address
