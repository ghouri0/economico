import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout({login, setLogin}) {
    const navigate = useNavigate()
    useEffect(()=>{
        setLogin(false)
        navigate('/')
    })
  return (
    <div>
        
    </div>
  )
}
