import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const feriados2025 = [
    {
      name: "Año Nuevo",
      description: "Inicio del año calendario.",
      importance: "Feriado inamovible",
      date: new Date('2025-01-01'),
      color: "bg-indigo-500",
    },
    {
      name: "Carnaval",
      description: "Celebración tradicional de carnaval.",
      importance: "Feriado inamovible",
      date: new Date('2025-03-03'),
      color: "bg-indigo-500",
    },
    {
      name: "Carnaval",
      description: "Segundo día de carnaval.",
      importance: "Feriado inamovible",
      date: new Date('2025-03-04'),
      color: "bg-indigo-500",
    },
    {
      name: "Día Nacional de la Memoria por la Verdad y la Justicia",
      description: "Conmemoración de las víctimas de la última dictadura militar.",
      importance: "Feriado inamovible",
      date: new Date('2025-03-24'),
      color: "bg-indigo-500",
    },
    {
      name: "Día del Veterano y de los Caídos en la Guerra de Malvinas",
      description: "Homenaje a los combatientes de Malvinas.",
      importance: "Feriado inamovible",
      date: new Date('2025-04-02'),
      color: "bg-indigo-500",
    },
    {
      name: "Viernes Santo",
      description: "Conmemoración cristiana de la crucifixión de Jesús.",
      importance: "Feriado religioso",
      date: new Date('2025-04-18'),
      color: "bg-indigo-500",
    },
    {
      name: "Día del Trabajador",
      description: "Día internacional del trabajo.",
      importance: "Feriado inamovible",
      date: new Date('2025-05-01'),
      color: "bg-indigo-500",
    },
    {
      name: "Día de la Revolución de Mayo",
      description: "Celebración de la Revolución de Mayo de 1810.",
      importance: "Feriado inamovible",
      date: new Date('2025-05-25'),
      color: "bg-indigo-500",
    },
    {
      name: "Paso a la Inmortalidad del General Martín Miguel de Güemes",
      description: "Homenaje al general Martín Miguel de Güemes.",
      importance: "Feriado trasladable",
      date: new Date('2025-06-16'),
      color: "bg-indigo-500",
    },
    {
      name: "Paso a la Inmortalidad del General Manuel Belgrano",
      description: "Homenaje al creador de la bandera argentina.",
      importance: "Feriado inamovible",
      date: new Date('2025-06-20'),
      color: "bg-indigo-500",
    },
    {
      name: "Día de la Independencia",
      description: "Celebración de la Declaración de Independencia en 1816.",
      importance: "Feriado inamovible",
      date: new Date('2025-07-09'),
      color: "bg-indigo-500",
    },
    {
      name: "Paso a la Inmortalidad del General José de San Martín",
      description: "Homenaje al libertador José de San Martín.",
      importance: "Feriado trasladable",
      date: new Date('2025-08-18'),
      color: "bg-indigo-500",
    },
    {
      name: "Día del Respeto a la Diversidad Cultural",
      description: "Reflexión sobre la diversidad cultural.",
      importance: "Feriado trasladable",
      date: new Date('2025-10-13'),
      color: "bg-indigo-500",
    },
    {
      name: "Día de la Soberanía Nacional",
      description: "Conmemoración de la batalla de la Vuelta de Obligado.",
      importance: "Feriado trasladable",
      date: new Date('2025-11-12'),
      color: "bg-indigo-500",
    },
    {
      name: "Día de la Inmaculada Concepción de María",
      description: "Celebración cristiana dedicada a la Virgen María.",
      importance: "Feriado inamovible",
      date: new Date('2025-12-08'),
      color: "bg-indigo-500",
    },
    {
      name: "Navidad",
      description: "Celebración cristiana del nacimiento de Jesús.",
      importance: "Feriado inamovible",
      date: new Date('2025-12-25'),
      color: "bg-indigo-500",
    },
  ];
  

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

export const date_agenda_feriado=createAsyncThunk('date_agenda_feriado',async()=>{
    try{
        console.log('holados')
        const response=await axios.get('http://localhost:8000/api/agenda')
        const datados=response.data
        const data={}
        console.log('holados')
        const datadosFiltrada=datados.filter((data)=>data.name==='Navidad'?data:null)
        console.log('hola',datadosFiltrada)

        datadosFiltrada.length>0? console.log('no se que hago'):{data}=await axios.post('http://localhost:8000/api/auth/agenda/feriados', feriados2025)
        
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