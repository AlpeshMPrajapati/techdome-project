import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({item,setPaymentData}) => {
  const navigate = useNavigate();

  const handlePayment = (loanId)=>{
    setPaymentData(loanId)
    navigate('/payment')
  }
  return (
    <div className='w-[320px]'>
        <div className='border text-white flex flex-col items-start justify-center gap-1 py-4 px-4'>
            <p>Loan Id : <span className='text-slate-300'>{item._id}</span></p>
            <p>amount :  <span className='text-slate-300'>{item.amount}</span></p>
            <p>term : <span className='text-slate-300'>{item.term}</span></p>
            <p>status : <span className='text-slate-300'>{item.status}</span></p>
            <div className='flex flex-col items-start my-2 justify-center text-slate-300'>
              <p className='font-semibold text-yellow-200 '>Schedule : </p>
              {
                item.scheduledRepayments.map((data)=>{
                  return<div>{new Date(data.dueDate).toLocaleString().split(',')[0]} -- {data.amount.toFixed(2)} -- {data.status}</div>
                })
              }
            </div>
            <button disabled={item.status === 'APPROVED'?false:true} className='w-full py-1 px-2 rounded-md border-none outline-none bg-green-600 hover:cursor-pointer hover:bg-green-700 transition-all duration-100 text-white' onClick={()=>handlePayment(item._id)}>Pay</button>
        </div>
    </div>
  )
}

export default Card