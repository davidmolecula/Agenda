import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "@/api.js";



export const date_picked=createAction('date_picked',(obj)=>{
    const date=obj;
    return {
        payload:date
    }
})


export const date_agenda=createAsyncThunk('date_agenda',async(obj)=>{
    try{
        const {data}= await axios.post(`${apiUrl}/auth/agenda`, obj.data)
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

export const date_getagenda = createAsyncThunk('date_getagenda', async (userId) => {
    try {
        const {data}=await axios.post(`${apiUrl}/agenda`,userId)
        const { data: feriadosResp } = await axios.post(`${apiUrl}/agenda/feriados`);
        return {
            success: data.success,
            agenda: data.agenda,
            feriados: feriadosResp.feriados || [],
        };
    } catch (error) {
        return {
            success: false,
            agenda:[],
            feriados: [],
        };
    }
});

export const date_delete=createAsyncThunk('date_delete', async(obj)=>{
    try{   
        const {data}=await axios.post(`${apiUrl}/agenda/delete`,obj)
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


export const date_tracking = createAsyncThunk('date_tracking', async (dataTracking) => {
    try {

        const {data}=await axios.post(`${apiUrl}/auth/tracking`, dataTracking.data)

        return {
            success: data.success,
            tracking: data.response.tracking,
        };
    } catch (error) {
        return {
            success: false,
            tracking:{}
        };
    }
});

export const date_gettracking = createAsyncThunk('date_gettracking', async (obj) => {
    try {
        const {data}=await axios.post(`${apiUrl}/agenda/tracking`,obj)
        return {
            success: data.success,
            tracking: data.tracking,
        };
    } catch (error) {
        return {
            success: false,
            tracking:[]
        };
    }
});

export const resetSuccess = createAction("resetSuccess");