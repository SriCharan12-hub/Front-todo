import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'
// import { json } from 'express'

function Start() {
    const navigate= useNavigate()
  return (
    <div>
      <GoogleLogin onSuccess={(CredentialResponse)=>{
        const data = jwtDecode(CredentialResponse.credential)
        localStorage.setItem('userid',JSON.stringify(data.name))
        navigate('/home')

      }} onError={()=>console.log("error in google oauth")}>
      </GoogleLogin>
      <button onClick={()=>{navigate('/register')}}>Register</button>
      <button onClick={()=>{navigate('/login')}}>Login</button>
    </div>
  )
}

export default Start
