import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RepaymentForm = ({loanId,token}) => {
  const [amount,setAmount] = useState('');
  const navigate = useNavigate();

  const submitHandler = async()=>{
    try {
      const repayment = await axios.post(`http://localhost:8000/api/v1/add/${loanId}`,{amount,token})
      console.log("payment -> ",repayment)
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='my-10 h-screen flex flex-col items-center justify-center gap-8'>
      <input className='py-2 px-6 rounded-md border-none outline-none' type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} name="password" id="password" required placeholder='Enter Password' />

      <input onClick={submitHandler} className='py-2 px-8 rounded-md border-none outline-none bg-green-600 hover:cursor-pointer hover:bg-green-700 transition-all duration-100 text-white' type="submit" value="Pay" />
    </div>
  )
}

export default RepaymentForm