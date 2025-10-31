import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { user_logout } from '../store/actions/userActions'


const LinksHeader = ({text,link,color}) => {
  const colorRef=useRef()
  const dispatch=useDispatch()
  const [formData,setFormData]=useState({
    email:"",
    password:""
})
  const handleLogout=async()=>{
    try{
        if(text==='Cerrar sesión'){
        const user=localStorage.getItem('user')
        const data=JSON.parse(user)
        setFormData({
            email: data.email,
            password:""
        })
        }
    }catch(error){
        console.log(error)
    }
}
if(formData.email!==""){
  dispatch(user_logout(formData))
}

  useEffect(()=>{
    colorRef.current.classList.add('bg-'+color)
  },[])
  
  return (
    <div className="flex absolute sm:static opacity-0 sm:opacity-100 items-center z-20 justify-center">
            <Link to={link} ref={colorRef} onClick={handleLogout} className="rounded-md border border-transparent text-indigo-700 hover:text-white duration-100  hover:bg-linear-to-r from-indigo-500 to-indigo-900 dark:bg-linear-to-r from-indigo-800 to-indigo-900 dark:text-white dark:hover:bg-linear-to-r dark:hover:from-gray-300 dark:hover:to-gray-300 dark:hover:text-indigo-500 shadow-md shadow-black  px-3.5 p-2 text-sm font-semibold focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">{text}</Link>
            </div>
  )
}

export default LinksHeader