import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState("");
  const [showpassword, setShowpassword] = useState(false);

  function HandleInput() {
    setShowpassword(prev => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!username || !email || !password) {
      setError('Please fill in all the details.');
      return;
    }
    if (username.length<=3 || username.length>=15){
      return setError("length of username should be btw 4-15")
    }
      if (password.length<=3 || password.length>=15){
      return setError("length of password should be btw 4-15")
    }
    if (!email.endsWith('@gmail.com')) {
      setError('Email must end with @gmail.com');
      return;
    }
    try {
      const response = await axios.post('https://back-todo-6.onrender.com/register', {
        email,
        username,
        password,
      });
      if (response.status === 201) {
        // Registration successful, redirect to login
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className='con'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          placeholder='Enter username'
          className='nameele'
          onChange={(e) => setUsername(e.target.value)}
        />
        <span id="errorname"></span>
        <input
          type='email'
          value={email}
          placeholder='Enter email'
          className='emaille'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showpassword ? 'text' : 'password'}
          value={password}
          placeholder='Enter Password'
          className='passele'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className='registerpara'>
          <input type="checkbox" onChange={HandleInput} /> Show password
        </label>
       
        <button type='submit'>Submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className='regpara' style={{fontsize: '14px',
            color: '#555',
            textalign: 'center'}}>Already i'm registered <span style={{color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/login')}}>Login</span></p>
      </form>
    </div>
  );
}

export default Signup;