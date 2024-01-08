import { createBrowserRouter } from "react-router-dom";
import Home from "../sections/Home.jsx";
import Login from '../sections/Login.jsx'
import Landing from "../layout/Landing.jsx";

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
                element:<Login/>
            }
        ]
    }
])

export default router