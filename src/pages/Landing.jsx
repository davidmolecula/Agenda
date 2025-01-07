import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from '@/components/ui/button'
import {CalendarDemo} from '../components/Calendario.jsx'


const Landing = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Landing