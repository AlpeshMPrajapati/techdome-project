import Cookies from 'js-cookie'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = ({isLoggedIn,setIsLoggedIn}) => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    Cookies.remove('token')
    setIsLoggedIn(false)
    navigate('/login')
  }
  return (
    <div className='w-[95%] mx-auto py-2'>
        <ul className='flex items-center justify-end gap-11'>
            <li><NavLink to="/" className="text-gray-300 font-semibold">Home</NavLink></li>
            {
             !isLoggedIn ? <li><NavLink to="/login" className="text-gray-300 font-semibold">Login</NavLink></li> : <li className="text-gray-300 font-semibold cursor-pointer" onClick={handleLogout}>Logout</li>
            }
            {
             !isLoggedIn && <li><NavLink to="/signup" className="text-gray-300 font-semibold">Sign Up</NavLink></li>
            }
        </ul>
    </div>
  )
}

export default Navbar