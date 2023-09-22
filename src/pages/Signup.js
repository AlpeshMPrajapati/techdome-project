import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = ({setIsLoggedIn}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [confirmPassword,setCofirmPassword] = useState('');
  const navigate = useNavigate();


  const submitHandler = async(e)=>{
    try {
      if(password !== confirmPassword){
        alert("password does not match !");
      }
      const user = await axios.post('http://localhost:8000/api/v1/signup',{
        name:name,
        email:email,
        password:password,
      })

      console.log(user)
      setIsLoggedIn(true)
      navigate('/')
      
    } catch (error) {
      alert("User Already Exists !")
        console.error(error.message)
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='w-[30%] h-[30vh] mx-auto flex flex-col items-center justify-center gap-4 py-9 rounded-lg'>
        <h1 className="text-center text-3xl font-bold text-white">Signup</h1>
        <div className='flex flex-col w-[70%] mx-auto gap-6'>
            <input className='py-2 px-6 rounded-md border-none outline-none' type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" id="name" required placeholder='Enter Name'/>
          
            <input className='py-2 px-6 rounded-md border-none outline-none' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" id="email" required placeholder='Enter Email'/>

            <input className='py-2 px-6 rounded-md border-none outline-none' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password" required placeholder='Enter Password' />

            <input className='py-2 px-6 rounded-md border-none outline-none' type="password" value={confirmPassword} onChange={(e)=>setCofirmPassword(e.target.value)} name="confirmPassword" id="confirmPassword" required placeholder='Enter Confirm Password' />

            <input onClick={submitHandler} className='py-3 px-6 rounded-md border-none outline-none bg-green-600 hover:cursor-pointer hover:bg-green-700 transition-all duration-100 text-white' type="submit" value="SignUp" />
        </div>
      </div>
    </div>
  )
}

export default Signup