import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login.jsx'
import Landing from "../pages/Landing.jsx";
import Register from "../pages/Register.jsx"
import ProtectedRoute from "./protectedRoute.jsx";
import ProtectSesion from "./protectSesion.jsx";
import { Agenda } from "@/components/Agenda.jsx";
import ToDoList from "@/components/ToDoList.jsx";
import {Tracking} from '@/pages/Seguimiento.jsx';
import Todo from "../pages/Todo.jsx";


const router=createBrowserRouter([
    {
        path:'/',
        element: <Landing/>,
        children:[
            {
                path:'/inicio',
                element:
                <ProtectedRoute path='/'>
                    <Agenda></Agenda> 
                </ProtectedRoute> 
            },
            
            {
                path:'/',
                element: 
                <ProtectSesion path='/inicio'>
                    <Login/>
                </ProtectSesion>
            },
            /*{
                path:'/register',
                element:
                    <ProtectSesion path='/'>
                        <Register/>
                    </ProtectSesion>
            },*/
            {
                path:'/404',
                element: <h1>Error 404</h1>
            },
            {
                path:'/calendario',
                element:
                <ProtectedRoute path='/calendario'>
                    <Agenda></Agenda> 
                </ProtectedRoute> 
            },
            {
                path:'/seguimiento',
                element:
                <ProtectedRoute path='/seguimiento'>
                    <Tracking></Tracking> 
                </ProtectedRoute> 
            },
            {
                path:'/todo',
                element:
                <ProtectedRoute path='/todo'>
                    <Todo></Todo> 
                </ProtectedRoute> 
            }
        ]
    }
])

export default router