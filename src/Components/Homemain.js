
import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home'
import ImageUpload from './ImageUpload'
import './Homemain.css'
import Profile from './Profile'
import Favorite from './Favorite'
import Addlogo from './Images/Addlogo.webp'

function Homemain() {
 const location = useLocation();

const [data,setData] = useState([])
const[username,setUsername] = useState(' ');
const[email,setEmail] = useState('');
const [mobileno,setMobileno] = useState('');
const [password,setPassword] = useState('');
const [cpassword,setCpassword] = useState('');
const[sidenav,setSidenav] = useState('')
const [isOpen, setIsOpen] = useState(false);
const[issidenav,setIssidenav] = useState(false);
const[isorder,setIsorder] = useState(false);
const[order,setOrder] = useState(' ');
const[addfood,setAddfood] = useState('');
const [allImage, setAllImage] = useState(null);


const navigate = useNavigate();
const emailinput = location.state.email;





  


useEffect(() =>{
  fetchgettt();
  fetchdata();
},[data])



  
async function fetchgettt(){
  try {
     await axios.get("http://localhost:5000/getimage")
    .then((res) =>{
      setAllImage(res.data.data);
    })
    .catch((error) =>{
      console.log(error)
    })
    
    
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
    async function fetchdata(){
    try {
       await axios.post("http://localhost:5000/Homemain",{
        emailinput})
        .then((res) =>{
          setData(res.data);
        }).catch((e) =>{
          console.log(e);
        })
    
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
    {data.map((item) => (
      
      setUsername(item.name),
      setEmail(item.email),
      setMobileno(item.mobileno),
      setPassword(item.password),
setCpassword(item.cpassword)
    ))}
  };



  
  const side = () =>{
    setIsOpen(true)
    setIssidenav(true)
    setSidenav(
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    
    <button className='closebut' onClick={close}>X</button>
      <Profile profilename = {username} profileemail={email}/>
      
    
    
   
  </div>)
}
const ord = () =>{
  setIsOpen(true)
  setIsorder(true)
setOrder(<div className={`ordh ${isOpen ? 'open' : ''}`}>
<button onClick={closeor} className="closefav">X</button>
<Favorite useremail = {emailinput}/>
</div>)
}
const closeor = () =>{
  setIsOpen(false)
  setIsorder(false)
  setOrder('')
}
  const close = () => {
   setIsOpen(false)
    setSidenav('')
    setIssidenav(false)
   
  };

const ad =() =>{
 

 navigate('./Addingfood')

}





  return (
    <div className='homemain'>
    
    <h2 className='hn'>Hello {username}!</h2>
    <h1 className='mah'>Sweety <span className='hmh'>Cafe<br/>Delivery</span> menu</h1>
    <div className='headehm'>
      <h2 onClick={side} className={`ho ${issidenav ? 'change':''}`} >Home</h2>
      {sidenav}
      <h2 className='cathm'>Categories</h2>
     <h2 onClick={ord} className={`ord ${isorder ? 'change':' '}`}>Order</h2>
     {order}
     </div>
     <div className={`content ${isOpen ? 'hidden' : ''}`}>
     {allImage === null
  ? ""
  : allImage.map((data, index) => {

      return (
        
      <div key={index}>
          <Home 
           image={`${process.env.PUBLIC_URL}/dataimages/${data.image}`}
            name={data.Foodname}
           rating={`${data.Rating}/5`}
            rupees={`₹ ${data.Price}`}      
            quotes={data.Quotes}
            button ="Order Now"
            username={username}
            price={data.Price}
            truerating={data.Rating}
           
          />
         
        </div>
      );
    })}
{emailinput === "Admin@gmail.com"?
 <div onClick={ad} > <Home  image={Addlogo} name="Addfood" button="Add Food" /></div>:""}

</div>


{addfood}


<br/>
        

</div>
  );
};
export default Homemain


