import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = ({setIsLoggedIn,setIsAdmin,setToken}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate();

  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      const user = await axios.post('http://localhost:8000/api/v1/login',{
        email:email,
        password:password
      })

      const token = user.data.token; // Assuming user.token contains the token
      setToken(token);
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      document.cookie = `token=${token}; expires=${options.expires}; path=/;`;

      console.log(user)
       if(user.data.user.role === "admin"){
        setIsAdmin(true)
       }
      setIsLoggedIn(true)
      navigate('/')
      
    } catch (error) {
        alert("Invalid Credentials")
        console.error(error.message)
    }
    
  }

  return (
    <div className='w-full h-screen overflow-hidden flex items-center justify-center'>
      <div className='w-[30%] h-[30vh] mx-auto flex flex-col items-center justify-center gap-4 py-9 rounded-lg'>
        <h1 className="text-center text-3xl font-bold text-white">Login</h1>
        <div className='flex flex-col w-[70%] mx-auto gap-6'>
            <input className='py-2 px-6 rounded-md border-none outline-none' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" id="email" required placeholder='Enter Email'/>

            <input className='py-2 px-6 rounded-md border-none outline-none' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password" required placeholder='Enter Password' />

            <input onClick={submitHandler} className='py-3 px-6 rounded-md border-none outline-none bg-green-600 hover:cursor-pointer hover:bg-green-700 transition-all duration-100 text-white' type="submit" value="Login" />
        </div>
      </div>
    </div>
  )
}

export default Login