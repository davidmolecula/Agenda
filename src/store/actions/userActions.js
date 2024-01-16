import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const user_photo=createAction('user_photo',(obj)=>{
    return{
        payload:obj.photo
    }
})

export const user_login=createAsyncThunk('user_login',async(obj)=>{
    try{
            const {data}= await axios.post('http://localhost:8000/api/auth/signin', obj.data)
            localStorage.setItem('token',data.response.token)
            localStorage.setItem('user', JSON.stringify(data.response.user))
            return {
                user: data.response.user,
                token: data.response.token
            }
        }catch(error){
        console.log(error)
        return {
            user:null
        }
    }
})

export const user_signup=createAsyncThunk('user_signup',async(obj)=>{
    try{
            const {data}= await axios.post('http://localhost:8000/api/auth/signup', obj.data)
            console.log(data)
            localStorage.setItem('token',data.response.token)
            localStorage.setItem('user', JSON.stringify(data.response.user))
            return {
                email:data.response.user.email
            }
        }catch(error){
        console.log(error)
        return {
            email:null
        }
    }
})

export const user_logout=createAsyncThunk('user_logout',async(obj)=>{
    try{
            const {data}= await axios.post('http://localhost:8000/api/auth/signout', obj)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            return {
                user: null,
                token: null
            }
        }catch(error){
        console.log(error)
        return {
            user:null
        }
    }
})
    

export const user_token=createAction('user_token',(user)=>{
    return {
        payload:{
            user
        }
    }
})

