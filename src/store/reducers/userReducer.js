import { createReducer } from "@reduxjs/toolkit";
import {/*user_encrypted*/ user_login, user_logout, user_photo, user_signup, user_token} from '../actions/userActions.js'

const initialState={
        platform:"",
        account:"",
        email:"",
        password:"",
        iv:""
}
const userReducer=createReducer(initialState,
    (builder)=> builder
    .addCase(user_photo,(state,action)=>{
        return{
            ...state,
            photo:action.payload.photo
        }
    })
    .addCase(user_login.fulfilled,(state,action)=>{
        return{
            ...state,
            user:action.payload.user,
            token:action.payload.token
        }
    })
    .addCase(user_logout.fulfilled,(state,action)=>{
        return{
            user:action.payload.user,
            token:action.payload.token
        }
    })
    .addCase(user_token,(state,action)=>{
        return{
            ...state,
            user:action.payload.user
        }
    })
    .addCase(user_signup.fulfilled,(state,action)=>{
        return{
            ...state,
            email:action.payload.email
        }
    })
    /*.addCase(user_encrypted.fulfilled,(state,action)=>{
        return{
            platform:action.payload.platform,
            account:action.payload.account,
            email:action.payload.email,
            password:action.payload.password,
            iv:action.payload.iv,
            success:action.payload.success
        }
    })*/
)
export default userReducer