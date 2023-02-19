import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout({login, setLogin}) {
    const navigate = useNavigate()
    useEffect(()=>{
        setLogin(false)
        localStorage.setItem("SellerName", '')
        navigate('/seller')
    })
  return (
    <div>
        
    </div>
  )
}
