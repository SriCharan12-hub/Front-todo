import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"


function Home() {
    const [username,SetUsername] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        SetUsername(localStorage.getItem("userid"))
    },[])
  return (
    <div>
      <h1 className='homehead'>Hi {username} Welcome to Home Page</h1>
      <button onClick={()=>{
        localStorage.removeItem("userid")
        Cookies.remove("jwttoken")
        navigate('/login')


      }}>logout</button>
    </div>
  )
}

export default Home
