"use client"

import * as React from "react"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { date_picked, date_getagenda, date_delete, date_delete_filtered, date_gettracking} from "@/store/actions/dateActions";
import {DialogTracking} from "@/components/DialogTracking.jsx";
import { es } from "date-fns/locale/es";
import { format } from "date-fns";
import {DialogAgregar} from "@/components/Dialog.jsx";
import DataTable from "./payments/dataTable.jsx";
import { columns } from "./payments/columns.jsx";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import ExitAnimation from './ui/motion-exit.jsx'
import {ChartRadialShape} from "../components/RadialChart.jsx"
import {ChartBarInteractive} from '../components/BarChart.jsx'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";




export function Agenda() {
  const user=useSelector(store=> store.userReducer.user)
  const agenda=useSelector(store=>store.dateReducer.agenda)
  const feriados=useSelector(store=>store.dateReducer.feriados)
  const tracking=useSelector(store=>store.dateReducer.tracking)

  const agendaYFeriados=[...agenda,...feriados??[]]
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto o cerrado
  const [showCalendar, setShowCalendar] = useState(false);
  const [filtrado,setFiltrado]=useState("")
  const [nameDelete,setNameDelete]= useState("")
  const [refresh, setRefresh] = useState(false);
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


  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  };

  const handleSelect=(newDate)=>{
    if (!newDate) return;
    setDate(newDate)
    dispatch(date_picked({
      date:date? date.toString(): null
    }))
  }

    useEffect(()=>{
      handleSelect(date)
      dispatch(date_delete_filtered(filtrado))
      dispatch(date_getagenda({id:user?.id}));
      dispatch(date_gettracking({id:user.id,date:date}));
    },[dispatch, refresh])
    

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

const chartData=tracking.filter((tracking)=>tracking.meassure).map(tracking=> ({date:tracking.date, dato2: tracking.meassure, dato3: 1  }))

  return (
    <>
    <div className="flex flex-col md:flex-row flex-wrap border border-emerald-300 dark w-full space-x-12">

          <motion.div
              initial={{ opacity: 1, x: 20 }}  // Inicialmente está en su lugar, visible
              animate={{
                opacity: 1,
                x: showCalendar ? 0 : 20,  // Se mueve cuando aparece el calendario
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}  // Animación suave
              className="px-4 py-2 border border-red-500 rounded-md text-indigo-700 hover:text-white duration-100 md:mt-4 dark:text-white  dark:hover:text-indigo-200 shadow-md shadow-black  px-3.5 p-2 text-sm font-semibold focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-white rounded-md focus:outline-hidden focus:ring-3 focus:ring-blue-300">
            {date? <div className="p-2 h-16"><span className="capitalize rounded-xl">{format(date,'eeee',{locale: es})}</span>, {format(date, 'PPP', {locale: es})}</div>:<div className="p-2">No hay fechas seleccionadas</div>}
            <div className="flex w-full h-full justify-center gap-10">
            <div className="flex flex-col gap-3 w-56 h-72 border border-indigo-950 dark:bg-linear-to-r from-indigo-800 to-indigo-900 justify-center shadow-2xl shadow-black rounded-xl">
              <p className="text-center text-xl dark:text-white text-black">Agenda</p>
                <Button variant="outline"  onClick={toggleCalendar} >
                  
                  <motion.div
                initial={{ opacity: 1, x: 0 }}  // Inicialmente está en su lugar, visible
                animate={{
                  opacity: 1, 
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}  // Animación suave
                className="px-4 py-2 text-black dark:text-white rounded-md  focus:outline-hidden focus:ring-3 focus:ring-blue-300"
                onClick={toggleCalendar}>Ver agenda</motion.div>
                </Button>
              {/* Aca se usa DialogAgregar que es el dialogo especifico para "Agregar" */}
              <DialogAgregar  title="Agregar" fields={{
                                  name: "Nombre",
                                  description: "Descripcion",
                                  importance: "Importancia",
                                  }} date={date}>
                          
              </DialogAgregar>
              <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-black dark:text-white" onClick={() => setIsOpen(true)}>
                  Modificar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Titulo</DialogTitle>
                  <DialogDescription>
                    Descripcion
                  </DialogDescription>
                </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div key={1} className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={2} className="text-right">
                        label
                      </Label>
                      <Input
                        id={1}
                        name="david"
                        defaultValue="pepe"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit"  >
                    
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-black dark:text-white" onClick={() => setIsOpen(true)}>
                Eliminar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Eliminar Evento</DialogTitle>
                <DialogDescription>Busca el evento que deseas eliminar.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="filter" className="text-right">
                    Buscar
                  </Label>
                  <Input
                    id="filter"
                    value={nameDelete}
                    onChange={(event) => {
                      const value = event.target.value.toLowerCase();
                      setNameDelete(value);
                      const filtered = agenda.filter((item) =>
                        item.name.toLowerCase().startsWith(value)
                      );
                      setFiltrado(filtered);
                    }}
                    className="col-span-3"
                  />
                </div>
                {filtrado.length > 0&&nameDelete.length>0 ? (
                  <ul className="mt-2">
                    {filtrado.map((item) => (
                      
                      <li
                        key={item.id}
                        className="flex justify-between items-center border-b p-2"
                      >
                        <span>{item.name}</span>
                        <div
                        key={item.id}
                        className="flex justify-between items-center border-b p-2"
                      >
                        <span><span>{format(item.date,'eeee',{locale: es})}</span>, {format(item.date, 'PPP', {locale: es})}</span>
                      </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            dispatch(date_delete({ id: item._id }));
                            setFiltrado(filtrado.filter((f) => f._id !== item._id));
                          }}
                        >
                          Eliminar
                        </Button>
                      </li>
                      
                      
                    ))}
                  </ul>
                ) : (
                  nameDelete && <p className="text-gray-500">No hay resultados.</p>
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
              </DialogFooter>
            </DialogContent>
              </Dialog>
              </div>
            </div>
          
          </motion.div>
          
          <motion.div
            initial={{ opacity: 1, y: -10 }}
            animate={{ opacity: showCalendar ? 1 : 0, y: showCalendar ? 0 : -10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="mt-4 ">
              {showCalendar && (
              <Calendar
                captionLayout="dropdown-buttons"
                fromYear={2020}
                toYear={2026}
                fixedWeeks
                mode="single"
                selected={date}
                onSelect={handleSelect}
                locale={es}
                className="rounded-md border mt-4"
                modifiers={colorArrays} // Usamos los arrays de fechas por color como modificadores
                modifiersStyles={modifiersStyles}
              /> )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: showCalendar ? 1 : 0, y: showCalendar ? 0 : -10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="mt-4 ">
              {showCalendar && (
          <DataTable data={agendaYFeriados} date={date} columns={columns} />)}
          </motion.div>
          <div className="flex justify-center">
                              <DialogTracking  title="Seguimiento de estudio" fields={{
                                                                meassure:"Horas",
                                                                }} date={date}
                                                                onSave={() => setRefresh(prev => !prev)} >
                                                        
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
