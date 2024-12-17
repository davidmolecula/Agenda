"use client"

import * as React from "react"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { date_picked } from "@/store/actions/dateActions";
import { es } from "date-fns/locale/es";
import { format } from "date-fns";
import { Button } from "./ui/button";

export function CalendarDemo() {
  const [date, setDate] = useState(new Date());
  const [task,setTask]=useState(
    {
      date:"",
      description:"",
      completed:""
    }
  )
  const dispatch=useDispatch()

  const handleSelect=(newDate)=>{
    setDate(newDate)
    dispatch(date_picked({
      date:date.toString()
    }))
  }
    useEffect(()=>{
      handleSelect(date)
    },[])
  const date1=useSelector(store=>store.dateReducer.date)
  return (
    <div className="flex">
    <Calendar
      captionLayout="dropdown-buttons"
      fromYear={2015}
      toYear={2024}
      fixedWeeks showWeekNumber
      mode="single"
      selected={date}
      onSelect={handleSelect}
      className="rounded-md border"
    />
    <div className="flex items-center flex-col w-full gap-10 border border-gray-500 rounded-xl">
      {date? <div className="p-2"><span className="capitalize bg-green-400 rounded-xl p-2">{format(date, 'eeee', {locale: es})}</span>, {format(date, 'PPP', {locale: es})}</div>:<div>No hay fechas seleccionadas</div>}
      <div className="flex w-full h-full justify-center gap-10">
      <div className="flex flex-col gap-3 w-56 justify-center border border-gray-400 rounded-xl">
        <p className="text-center text-xl">Recordarios</p>
        <div className="flex flex-col gap-3">
        <Button>Agregar</Button>
        <Button>Modificar</Button>
        <Button>Eliminar</Button>
        </div>
        
      </div>
      <div className="flex flex-col gap-3 w-56 justify-center border border-gray-400 rounded-xl">
        <p className="text-center text-xl">Tareas</p>
        <div className="flex flex-col gap-3">
        <Button className="bg-red-500">Agregar</Button>
        <Button>Modificar</Button>
        <Button>Eliminar</Button>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-56 justify-center border border-gray-400 rounded-xl">
        <p className="text-center text-xl">Agenda</p>
        <div className="flex flex-col gap-3">
        <Button>Agregar</Button>
        <Button>Modificar</Button>
        <Button>Eliminar</Button>
        </div>
      </div>
      </div>   
      </div>
    </div>
  )
}
