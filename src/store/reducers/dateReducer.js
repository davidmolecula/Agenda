import { createReducer } from "@reduxjs/toolkit";
import { date_picked, date_agenda, resetSuccess, date_getagenda } from "../actions/dateActions";


const initialState={
    date:"",
    agenda: [{
        name:"",
        description:"",
        importance:""
    }],
    success: false, // Estado para éxito general
    lastAction: null, // Para identificar la acción exitosa
}

const dateReducer=createReducer(initialState,
    (builder)=>builder
    .addCase(date_picked,(state,action)=>{
        return{
            ...state,
            date:action.payload.date
        }
    })
    .addCase(date_agenda.fulfilled,(state,action)=>{
        return{
            ...state,
            success:action.payload.success,
            agenda:action.payload.agenda,
            lastAction: "date_agenda"
        }
    })
    .addCase(date_agenda.rejected, (state) => {
        return {
            ...state,
            success: false,
            lastAction: "date_agenda",
        };
    })
    .addCase(resetSuccess, (state) => {
        return {
            ...state,
            success: false,
            lastAction: null,
        };
    })
    .addCase(date_getagenda.fulfilled, (state, action)=>{
        return{
            ...state,
            success:action.payload.success,
            agenda:action.payload.agenda
        }
    })
)

export default dateReducer