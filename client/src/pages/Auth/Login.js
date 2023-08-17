import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios'; 
import {useNavigate, useLocation} from 'react-router-dom'
import { toast } from 'react-toastify';
import {Toast} from 'react-hot-toast';
import "../../styles/authStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
        /* const REACT_APP_API = URL("http://localhost:8080")    */    //in addition
        const res = await axios.post('/api/v1/auth/login',
        { email, password}
        ); 
        if(res && res.data.success){
          toast.success(res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem('auth', JSON.stringify(res.data))
          navigate(location.state || '/');
        }else{
          toast.error(res.data.message);
        }
    }catch(error){
      console.log(error);
      toast.error('Something went wrong');
    }
  }
  return (
    <Layout title={'Register-Ecommerce app'}>
         <div className='form-container'>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <input type="email" class="form-control" 
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
                id="exampleInputEmail" placeholder='Enter your Email' required />
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" 
                value={password}
                onChange={ (e) => setPassword(e.target.value)}
                id="exampleInputPassword1" placeholder='Enter your password' required />
            </div>
            <div className='mb-3'>
              <button type="button" className="btn btn-primary"
                onClick={() =>{navigate('/forgot-password')}}
                 >FORGOT PASSWORD
                </button>
            </div>
            <button type="submit" className="btn btn-primary">LOGIN</button>
            </form>
         </div>
    </Layout>
  );
};

export default Login
