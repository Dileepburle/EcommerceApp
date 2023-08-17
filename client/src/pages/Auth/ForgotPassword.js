import React from 'react';
import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import {Toast} from 'react-hot-toast';
import "../../styles/authStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e)=>{
      e.preventDefault()
      try{
          /* const REACT_APP_API = URL("http://localhost:8080")    */    //in addition
          const res = await axios.post('/api/v1/auth/forgot-password',
          { email,
            newPassword,
            answer
          }
          ); 
          if(res && res.data.success){
            toast.success(res.data.message);
            navigate('/login');
          }else{
            toast.error(res.data.message);
          }
      }catch(error){
        console.log(error);
        toast.error('Something went wrong');
      }
    };
  return (
    <Layout title='Forgot-Password Ecommerce-App'>
      <div className='form-container'>
            <h1>RESET PASSWORD</h1>
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <input type="email" class="form-control" 
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
                id="exampleInputEmail" placeholder='Enter your Email' required />
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" 
                value={answer}
                onChange={ (e) => setAnswer(e.target.value)}
                id="exampleInputEmail" placeholder='Enter your Favourite sports name' required />
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" 
                value={newPassword}
                onChange={ (e) => setNewPassword(e.target.value)}
                id="exampleInputPassword1" placeholder='Enter your password' required />
            </div>
            <div className='mb-3'>
            </div>
            <button type="submit" className="btn btn-primary">RESET</button>
            </form>
         </div>
    </Layout>
  )
}

export default ForgotPassword
