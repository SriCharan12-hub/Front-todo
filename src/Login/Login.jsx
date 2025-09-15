import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showpassword, setShowpassword] = useState(false);

  const handleShowPassword = () => {
    setShowpassword(prev => !prev);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Fill all the details");
      return;
    }
    if (password.length <= 3 || password.length >= 15) {
      return setError("length of password should be btw 4-15");
    }
    if (!email.endsWith('@gmail.com')) {
      setError('Email must end with @gmail.com');
      return;
    }
    try {
      const verifying = await axios.post("https://back-todo-6.onrender.com/login", { email, password });
      if (verifying.status === 200) {
        Cookies.set("jwttoken", verifying.data.jwttoken);
        setEmail("");
        setPassword("");
        navigate('/todo');
      }
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Fill all the details");
      }
    }
  };

  return (
    <div className='con'>
      <form onSubmit={handlesubmit}>
        <input 
          type="text" 
          value={email} 
          placeholder="Enter email" 
          className="emaille" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <input 
          type={showpassword ? 'text' : 'password'}
          value={password} 
          placeholder="Enter Password" 
          className='passele' 
          onChange={(e) => setPassword(e.target.value)} 
        />

        {/* This div will be the flex container */}
        <div className="show-password-container" style={{display:"flex",alignItems:"center",gap:"8px",marginTop:"10px"}}>
          <input 
            type="checkbox" 
            id="show-password-checkbox" // Add an id for the label's 'for' attribute
            onChange={handleShowPassword}
          />
          <label htmlFor="show-password-checkbox">Show password</label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <button type="button" onClick={() => navigate('/')}>Back</button>
        <button type="submit">Login</button>
           <p className='text-para' style={{textAlign:'center'}}>Don't have an account <span style={{color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/')}}>Register</span></p>
      </form>
    </div>
  );
}

export default Login;