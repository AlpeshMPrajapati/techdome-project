import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';
import axios from 'axios';

const Home = ({token,setPaymentData}) => {
  const [amount,setAmount] = useState('');
  const [term,setTerm] = useState('');
  const [allLoan, setAllLoan] = useState([]);


  const handleApply = async(e)=>{
    e.preventDefault();
    try {
        const loan = await axios.post('http://localhost:8000/api/v1/create',{
            amount:amount,
            term:term,
            token
        })
        console.log(loan)

    } catch (error) {
        console.log(error)
    }
}


const handleAllLoans = async(e)=>{
  try {
      const allLoans = await axios.post('http://localhost:8000/api/v1/',{token})
      console.log(allLoans)
      setAllLoan(allLoans.data.loan)
  } catch (error) {
    console.log(error)
  }
}


useEffect(()=>{
  handleAllLoans();
},[])

console.log(allLoan)

  return (
    <div className='w-full min-h-screen'>
      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-5'>
          <h1 className='text-white font-bold font-mono text-3xl'>Apply For a Loan</h1>
          <div className='w-full min-h-[90vh] flex justify-center items-center'>
            <div className="form w-[350px] mx-auto border rounded-lg h-[350px] flex flex-col items-center justify-center gap-8">
            
                <input className="py-3 w-[70%] px-6" type="number" name="amount" id="amount" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder='Enter Loan Amount'/>

                <input className="py-3 w-[70%] px-6" type="number" name="term" id="term" value={term} onChange={(e)=>setTerm(e.target.value)} placeholder='Enter Term' />

                <input className='py-3 w-[70%] px-6 rounded-md border-none outline-none bg-green-600 hover:cursor-pointer hover:bg-green-700 transition-all duration-100 text-white' onClick={handleApply} type="submit" value="Apply" />
            </div>
          </div>
        </div>
      </div>

        <div className='my-10 flex flex-col items-center justify-center'>
          <h1 className="text-gray-300 font-bold font-mono text-2xl">Customer Loan</h1>

          <div className='my-8 w-full flex items-start justify-evenly flex-wrap'>
            {
              allLoan.length === 0 ? <div>Loans Not Found</div> :
              allLoan.map((item)=>{
                return <Card key={item._id} setPaymentData={setPaymentData} token={token} item = {item}/>
              })
            }
          </div>
        </div>
    </div>
  )
}

export default Home