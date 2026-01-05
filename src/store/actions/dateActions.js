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
        console.log(obj)
        const {data}= await axios.post(`${apiUrl}/auth/agenda`, obj.data)
            localStorage.setItem('agenda', JSON.stringify(data.response.agenda))
    return {
        successAgenda:data.success,
        agenda:data.response.agenda
    }
    }catch(error){
        return {
            successAgenda:data.success
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

export const date_update=createAsyncThunk('date_update', async(obj)=>{
    try{   
        console.log('action date_update', obj)
        const {data}=await axios.post(`${apiUrl}/agenda/update`,obj)
        return{
            success:data.success
        }
    }catch(error){
        return {
            success:false,
        }
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

export const date_task = createAsyncThunk('date_task', async (dataTask) => {
    try {
        const {data}=await axios.post(`${apiUrl}/auth/task`, dataTask.data)
        return {
            success: data.success,
            task: data.response.task,
        };
    } catch (error) {
        return {
            success: false,
            task:{}
        };
    }
});

export const date_getTask = createAsyncThunk('date_gettask', async (obj) => {
    try {
        const {data}=await axios.post(`${apiUrl}/agenda/task`,obj)
        return {
            success: data.success,
            task: data.task,
        };
    } catch (error) {
        return {
            success: false,
            tracking:[]
        };
    }
});

export const color=createAction('color',(obj)=>{
    const color='bg-red-500'
    return {
        payload:color
    }
})

export const date_updateTask= createAsyncThunk('date_updateTask', async (obj) => {
    try {
        const {data}=await axios.post(`${apiUrl}/agenda/task-update`,obj)
        console.log("aca llego", obj)
        return {
            success: data.success,
            task: data.task,
        };
    } catch (error) {
        return {
            success: false,
            task:{}
        };
    }
});

export const date_mail = createAsyncThunk('date_mail', async (obj) => {
    try {
        const {data}=await axios.post(`${apiUrl}/agenda/send-email`,obj)
        return {
            success: data.success,
            ref: data.referenceId,
        };
    } catch (error) {
        return {
            success: false,
            ref:{}
        };
    }
});

export const resetSuccess = createAction("resetSuccess");