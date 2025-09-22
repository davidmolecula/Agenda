import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'



const Landing = (children) => {
  return (
    <div className='w-full'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Landing