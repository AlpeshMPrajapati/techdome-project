import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./pages/PrivateRoute";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import RepaymentForm from "./pages/RepaymentForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false);
  const [token,setToken] = useState('');
  const [paymentData,setPaymentData] = useState();


  useEffect(()=>{
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    }
    token !== '' ? document.cookie = `token=${token}; expires=${options.expires}; path=/;`: console.log('Loggin');
  },[])

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gray-800">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin}  />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            {isAdmin ? <Admin token = {token} /> : <Home setPaymentData={setPaymentData} token={token}/>}
          </PrivateRoute>}>
          </Route>
          <Route path="/payment" element={paymentData ? <RepaymentForm token = {token} loanId={paymentData} /> : <div className="text-white text-center my-10 font-bold text-3xl">Login Required For this Route :(  </div>}/>
      </Routes>

    </div>
  );
}
export default App;
