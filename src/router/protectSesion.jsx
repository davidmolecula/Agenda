import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectSesion = ({children,path}) => {
    let user=useSelector(store=>store.userReducer.user)
    let email=useSelector(store=>store.userReducer.email)
    if(user||email)  return <Navigate to={path}/> 
    return children
}

export default ProtectSesion