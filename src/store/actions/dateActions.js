import { createAction, createAsyncThunk } from "@reduxjs/toolkit";


export const date_picked=createAction('date_picked',(obj)=>{

    const date=obj;
    return {
        payload:date
    }
})