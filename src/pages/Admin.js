import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Admin = ({token}) => {
    const [loans,setLoans] = useState([]);

    const allLoans = async(e)=>{
        try {
            const pendingLoans = await axios.post('http://localhost:8000/api/v1/approve',{token});
        
            console.log(pendingLoans)
            setLoans(pendingLoans.data.Loans)
            
        } catch (error) {
            console.log(error)
        }
    }


    const handleApprove = async(id)=>{
        try {
            const approve = await axios.post(`http://localhost:8000/api/v1/approve/${id}`,{token})

            console.log("approve : ",approve)
            allLoans();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        allLoans();
    },[])


  return (
    <div>
        <div className='flex text-white flex-col items-center justify-center my-6'>
            <h1 className='text-3xl font-bold font-mono'>All Loans</h1>
            <div className='my-5 text-slate-300'>
                {
                    loans.length  ===  0 ? <div>No Loans</div>
                    :loans.map((loan,index)=>{
                        return <div key={index} className='my-2'>
                            
                            <div className='border py-3 px-9 flex gap-[3rem]'>
                                <div className='flex w-full items-center justify-center gap-5'>
                                    <p>customer Id : {loan.userId}</p>
                                
                                    <p>Loan Id : {loan._id}</p>
                                
                                    <p> amount : {loan.amount}</p>
                               
                                    <p>term : {loan.term}</p>

                                    <p>status : {loan.status}</p>

                                    <button disabled={loan.status === 'PENDING'?false:true} className='py-3 px-6 rounded-md border-none outline-none bg-green-600 hover:cursor-pointer hover:bg-green-700 transition-all duration-100 text-white'
                                    onClick={()=>handleApprove(loan._id)}>Approve</button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Admin