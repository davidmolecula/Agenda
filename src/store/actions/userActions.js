import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";
import axios from 'axios'
import encriptar from "../../crypto/cypher";




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
            const {data}= await axios.post('http://localhost:8000/api/auth/agenda', obj.data)
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

export const user_encrypted=createAsyncThunk('user_encrypted',async(formData)=>{
    try{
        const datosEncriptados=encriptar(formData.data.account,formData.data.password)
        const formDataEncriptado=formData.data
        formDataEncriptado.account=datosEncriptados.encryptedAcc
        formDataEncriptado.password=datosEncriptados.encryptedPass
        formDataEncriptado.iv=datosEncriptados.iv
        const response= await axios.post('http://localhost:8000/api/users/encrypted', formDataEncriptado)
        //localStorage.setItem('account',data.response.user.account)
        //localStorage.setItem('password', JSON.stringify(data.response.user.password))
        return{
                platform:formDataEncriptado.platform,
                account:response.data.account,
                email:formDataEncriptado.email,
                password:response.data.password,
                iv:formDataEncriptado.iv,
                success:response.data.success
        }
    }catch(error){
        console.log(error)
}
})

