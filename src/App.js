import React from 'react'
import Intro from './Components/Intro'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SecondIntro from './Components/SecondIntro'
import ThirdIntro from './Components/ThirdIntro'
import SecondThirdMain from './Components/secondthirdmain'
import SignIn from './Components/Signin'
import Signup from './Components/Signup'
import Homemain from './Components/Homemain'
import Order from './Components/Order'
import ImageUpload from './Components/ImageUpload'
import './Style.css'
import Favorite from './Components/Favorite'
import Addingfood from './Components/Addingfood'
import Cart from './Components/Cart'
import Notification from './Components/Notification'
import Address from './Components/Address'
import Setting from './Components/Setting'
import Forgotpassword from './Components/Forgotpassword'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Intro />}/>
          <Route path="/Secondintro" element={<SecondIntro/>}/>
          <Route path="/Thirdintro" element={<ThirdIntro/>}/>
          <Route path="/Secondthirdmain" element={<SecondThirdMain/>}/>
          <Route path="/Signin" element={<SignIn/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Homemain" element={<Homemain/>}/>
          <Route path="/Homemain/Signin" element={<SignIn/>}/>
          <Route path="Homemain/Order" element={<Order/>}/>
          <Route path="Homemain/Cart/Order" element={<Order/>}/>
          <Route path="/ImageUpload" element={<ImageUpload/>}/>
          <Route path="/Homemain/Favorite" element={<Favorite/>}/>
          <Route path="/Homemain/Addingfood" element={<Addingfood/>}/>
          <Route path="/Homemain/Cart" element={<Cart/>}/>
          <Route path="/Homemain/Notification" element={<Notification/>}/>
          <Route path="/Homemain/Address" element={<Address/>}/>
          <Route path="/Homemain/Setting" element={<Setting/>}/>
          <Route path="Forgotpassword" element={<Forgotpassword/>}/>
         

        </Routes>
      </Router>
    </div>
  )
}

export default App
