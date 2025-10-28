"use client"

import * as React from "react"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {DialogTracking} from "@/components/DialogTracking.jsx";
import { date_picked, date_getagenda, date_delete, date_delete_filtered, date_gettracking} from "../store/actions/dateActions.js";
import { es } from "date-fns/locale/es";
import {ChartRadialShape} from "../components/RadialChart.jsx"
import {ChartBarInteractive} from '../components/BarChart.jsx'

export function Tracking() {
  const user=useSelector(store=> store.userReducer.user)
  const agenda=useSelector(store=>store.dateReducer.agenda)
  const feriados=useSelector(store=>store.dateReducer.feriados)
  const tracking=useSelector(store=>store.dateReducer.tracking)
  console.log(tracking)
  const [date, setDate] = useState(new Date());
  const [filtrado,setFiltrado]=useState("")
  const dispatch=useDispatch()  
  const colors = [
    'bg-red-500',      // Alerta
    'bg-yellow-400',   // Fecha importante
    'bg-indigo-500',   // Base principal
    'bg-purple-400',   // Evento especial
    'bg-blue-400',     // Evento neutro
    'bg-green-400',    // Evento positivo
  ];
const colores = {
  'bg-red-500': '#ef4444',      // Alerta
  'bg-yellow-400': '#facc15',   // Fecha importante
  'bg-indigo-500': '#6366f1',   // Base principal
  'bg-purple-400': '#a78bfa',   // Evento especial
  'bg-blue-400': '#60a5fa',     // Evento neutro
  'bg-green-400': '#4ade80',    // Evento positivo
};

const handleSelect = (newDate) => {
  if (!newDate) return;
  if (date && newDate.getTime() === date.getTime()) return; // evita despachos si es la misma fecha
  setDate(newDate);
};  

    useEffect(() => {
  if (!date || !user?.id) return;
  // dispatch solo si date cambió
  dispatch(date_gettracking({ id: user.id, date }));
}, []);
    useEffect(() => {
  if (!date || !user?.id) return;

  // dispatch solo si date cambió
  dispatch(date_picked({ date: date.toString() }));
}, [date, user?.id]);

    
    useEffect(() => {
      // Despacha la acción para obtener la agenda desde la API al cargar el componente
      dispatch(date_delete_filtered(filtrado))
      dispatch(date_getagenda({id:user.id}));
      dispatch(date_gettracking({id:user.id,date:date}));
    }, [dispatch]);

    const colorArrays = colors.reduce((acc, colorClass) => {
      acc[colorClass] = [
        ...(agenda?.filter((item) => item.color === colorClass).map((item) => new Date(item.date)) || []),
        ...(feriados?.filter((item) => item.color === colorClass).map((item) => new Date(item.date)) || [])
      ];
      return acc;
    }, {});

    
    // Array de colores para usar en los modificadores
    const modifiersStyles = colors.reduce((acc, colorClass) => {
      acc[colorClass] = {
        backgroundColor: colores[colorClass], // Aquí asignamos el color de fondo
        fontWeight: "bold",
        borderRadius: "4px",
        border: "1px solid black",
        color: "black", // Aseguramos que el texto sea blanco para contraste
      };
      return acc;
    }, {});

const trackingDateNormalized = (tracking||[]).map(item => ({
  ...item,
  date: new Date(item.date) 
}));

const dateFound=trackingDateNormalized.filter(tracking=>(tracking.date.getDate()==date.getDate()&&tracking.date.getMonth()==date.getMonth()&&tracking.date.getFullYear()==date.getFullYear())?tracking:false)

let meassureTotal = dateFound.reduce((accumulator, currentValue) => {
  return accumulator + (currentValue.meassure || 0);
}, 0);

const chartData=tracking.map(tracking=> ({date:tracking.date, dato2: tracking.meassure, dato3: 1  }))


  return (
    <>
    <div className="flex bg-cyan-50 dark:bg-transparent w-full space-x-12">
              <Calendar
                captionLayout="dropdown-buttons"
                fromYear={2020}
                toYear={2026}
                fixedWeeks
                mode="single"
                selected={date}
                onSelect={handleSelect}
                locale={es}
                className="rounded-md border"
                modifiers={colorArrays} // Usamos los arrays de fechas por color como modificadores
                modifiersStyles={modifiersStyles}
              /> 
                  <div className="flex justify-center">
                    <DialogTracking  title="Seguimiento de estudio" fields={{
                                                      meassure:"Horas",
                                                      }} date={date}>
                                              
                                  </DialogTracking>
      
        <ChartRadialShape  chartData={[{
                                  dato: "Nombre",
                                  meassure: meassureTotal,
                                  fill: "var(--chart-1)",
                                  
                                              endAngle:meassureTotal*360/8,
                                              innerRadius:90,
                                              outerRadius:160,
                                              cardTitle:`Horas de estudio del día ${date.getDate()}/${date.getMonth()}`,
                                              cardDescription:"Medidas en horas (máximo 8)"
                                  }]}
                                  chartConfig = {{
                                        dato: {
                                          label: "Dato",
                                        },
                                        dato2: {
                                          label: "Dato2",
                                          color: "var(--chart-2)",
                                        }}}></ChartRadialShape>
</div>
<ChartBarInteractive chartData={chartData} title='Titulo' description='Descripcion'></ChartBarInteractive>
    </div>
    </>
  )
}
