import { createReducer } from "@reduxjs/toolkit";
import { date_picked, date_agenda, resetSuccess, date_getagenda, date_delete, date_delete_filtered, date_agenda_feriado } from "../actions/dateActions";

const initialState = {
    date: "",
    agenda: [{ name: "", description: "", importance: "" }], // Estado inicial como arreglo de objetos
    success: false, // Estado para éxito general
    lastAction: null, // Para identificar la acción exitosa
}

const dateReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(date_picked, (state, action) => {
            return {
                ...state,
                date: action.payload.date
            }
        })
        .addCase(date_agenda.fulfilled, (state, action) => {
            return {
                ...state,
                success: action.payload.success,
                // Garantiza que el payload de agenda sea un arreglo
                agenda: Array.isArray(action.payload.agenda) ? action.payload.agenda : [action.payload.agenda],
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
        .addCase(date_getagenda.fulfilled, (state, action) => {
            return {
                ...state,
                success: action.payload.success,
                // También asegúrate de que el payload de agenda sea un arreglo
                agenda: Array.isArray(action.payload.agenda) ? action.payload.agenda : [action.payload.agenda]
            }
        })
        .addCase(date_delete.fulfilled,(state,action)=>{
            return {
                ...state,
                success:action.payload.success
            }
        })
        .addCase(date_delete_filtered, (state, action) => {
            return {
                ...state,
                filtrado: action.payload.filtrado
            }
        })
        .addCase(date_agenda_feriado.fulfilled, (state,action)=>{
            return {
                ...state,
                success:action.payload.success
            }
        })
)

export default dateReducer;
