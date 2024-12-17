import { createReducer } from "@reduxjs/toolkit";
import { date_picked } from "../actions/dateActions";


const initialState={
    date:""
}

const dateReducer=createReducer(initialState,
    (builder)=>builder
    .addCase(date_picked,(state,action)=>{
        return{
            date:action.payload.date
        }
    })
)

export default dateReducer