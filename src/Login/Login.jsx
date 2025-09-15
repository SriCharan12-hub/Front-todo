import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function Login() {
    const navigate = useNavigate()
    const [password,setPassword]= useState("")
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")
    

      const handlesubmit= async(e)=>{
        e.preventDefault()
        //  if (!email || !password){
        //    return  alert("Fill all the details")
        // }
        try{
          const verifying =await  axios.post("http://localhost:8000/login",{email,password})
          if (verifying.status==200){
          Cookies.set("jwttoken",verifying.data.jwttoken)
            setEmail("")
            setPassword("")
            navigate('/home')
          }
         

        }
        catch(error){
          console.log("error",error)
          if (error.response && error.response.data.message) {
            setError(error.response.data.message);
          } 
          else {
            setError("Fill all the details");
      }
        }
        
    }
  return (
    <div className='con'>
       <input type="text" value={email} placeholder="Enter email" className="emaille" onChange={(e)=>setEmail(e.target.value)}/>
      
        <input type="text" value={password} placeholder="Enter Password" className='passele' onChange={(e)=>setPassword(e.target.value)}/>
        {error && <p style={{ color: "red" }} >{error}</p>}
        <button onClick={()=>{navigate('/')}}>Back</button>
        <button onClick={handlesubmit}>Login</button>
    </div>
  )


}
export default Login