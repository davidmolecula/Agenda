import { createBrowserRouter } from "react-router-dom";
import Home from "../sections/Home.jsx";
import Login from '../pages/Login.jsx'
import Landing from "../pages/Landing.jsx";
import Register from "../pages/Register.jsx"
import ProtectedRoute from "./protectedRoute.jsx";

const router=createBrowserRouter([
    {
        path:'/',
        element: <Landing/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element: <ProtectedRoute path='/'>
                    <Login/>
                    </ProtectedRoute>
            },
            {
                path:'/register',
                element:<ProtectedRoute path='/'>
                    <Register/>
                </ProtectedRoute>
            },
            {
                path:'/404',
                element: <h1>Error 404</h1>
            }
        ]
    }
])

export default router