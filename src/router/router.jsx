import { createBrowserRouter } from "react-router-dom";
import Home from "../sections/Home.jsx";
import Login from '../pages/Login.jsx'
import Landing from "../pages/Landing.jsx";
import Register from "../pages/Register.jsx"
import ProtectedRoute from "./protectedRoute.jsx";
import ProtectSesion from "./protectSesion.jsx";
import { CalendarDemo } from "@/components/Calendario.jsx";
import {DialogDemo} from "@/components/Dialog.jsx";
import { columns } from '@/components/payments/columns.jsx';



const router=createBrowserRouter([
    {
        path:'/',
        element: <Landing/>,
        children:[
            {
                path:'/',
                element:
                <ProtectedRoute path='/'>
                    <Home/>
                </ProtectedRoute>
                
            },
            
            {
                path:'/login',
                element: 
                <ProtectSesion path='/'>
                    <Login/>
                </ProtectSesion>
            },
            {
                path:'/register',
                element:
                    <ProtectSesion path='/'>
                        <Register/>
                    </ProtectSesion>
            },
            {
                path:'/404',
                element: <h1>Error 404</h1>
            },
            {
                path:'/calendario',
                element:<CalendarDemo></CalendarDemo>  
            },
            {
                path:'/dialog',
                element:<DialogDemo></DialogDemo>
            }
        ]
    }
])

export default router