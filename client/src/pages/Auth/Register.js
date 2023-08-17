import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import "../../styles/authStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
        /* const REACT_APP_API = URL("http://localhost:8080")    */    //in addition
        const res = await axios.post('/api/v1/auth/register',
        {name, email, password, phone, address,answer}
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
  }
  return (
    <Layout title={'Register-Ecommerce app'}>
         <div className='form-container'>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                 <input type="text" className="form-control" 
                 value={name}
                 onChange={ (e) => setName(e.target.value)}
                 id="exampleInputName" placeholder='Enter your name' required />
                 
            </div>
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
            <div class="mb-3">
                <input type="text" class="form-control" 
                value={phone}
                onChange={ (e) => setPhone(e.target.value)}
                id="exampleInputPhone" placeholder='phone number' required />
            </div>
            <div class="mb-3">    
                <input type="text" class="form-control" 
                value={address}
                onChange={ (e) => setAddress(e.target.value)}
                id="exampleInputAddress" placeholder='Enter your address'required />
            </div>
            <div class="mb-3">    
                <input type="text" class="form-control" 
                value={answer}
                onChange={ (e) => setAnswer(e.target.value)}
                id="exampleInputAddress" placeholder='What is your favourite sports'required />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            </form>
         </div>
    </Layout>
  );
};

export default Register
