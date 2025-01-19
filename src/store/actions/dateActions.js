import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const date_picked=createAction('date_picked',(obj)=>{
    const date=obj;
    return {
        payload:date
    }
})


export const date_agenda=createAsyncThunk('date_agenda',async(obj)=>{
    try{
        const {data}= await axios.post('http://localhost:8000/api/auth/agenda', obj.data)
            localStorage.setItem('agenda', JSON.stringify(data.response.agenda))
    return {
        success:data.success,
        agenda:data.response.agenda
    }
    }catch(error){
        return {
            success:data.success
        }
    }
})

export const date_getagenda = createAsyncThunk('date_getagenda', async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/api/agenda');
        return {
            success: data.success,
            agenda: data.agenda,
        };
    } catch (error) {
        return {
            success: false,
            agenda:[]
        };
    }
});

export const date_delete=createAsyncThunk('date_delete', async(obj)=>{
    try{

        const {data}=await axios.post('http://localhost:8000/api/agenda/delete',obj)
        return{
            success:data.success
        }
    }catch(error){
        return {
            success:false,
        }
    }
})

export const date_delete_filtered=createAction('date_delete_filtered',(obj)=>{
    
    const filtrado=obj;
    return {
        payload:filtrado
    }
})

export const resetSuccess = createAction("resetSuccess");