"use client"

import * as React from "react"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { date_picked, date_getagenda, date_delete, date_delete_filtered, date_agenda_feriado} from "@/store/actions/dateActions";
import { es } from "date-fns/locale/es";
import { format } from "date-fns";
import {DialogDemo} from "@/components/Dialog.jsx";
import DataTable from "./payments/dataTable.jsx";
import { columns } from "./payments/columns.jsx";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
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

export function CalendarDemo() {
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("idle"); // Posibles valores: "idle", "saving", "success", "error"
  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto o cerrado
  const [showCalendar, setShowCalendar] = useState(false);
  const [filtrado,setFiltrado]=useState("")
  const [nameDelete,setNameDelete]= useState("")
  const hidden="hidden"
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

useEffect(() => {
  const feriados2025 = [
    { date: new Date('2025-01-01'), name: 'Año Nuevo' },
    { date: new Date('2025-03-03'), name: 'Carnaval' },
    { date: new Date('2025-03-04'), name: 'Carnaval' },
    { date: new Date('2025-03-24'), name: 'Día Nacional de la Memoria por la Verdad y la Justicia' },
    { date: new Date('2025-04-02'), name: 'Día del Veterano y de los Caídos en la Guerra de Malvinas' },
    { date: new Date('2025-04-18'), name: 'Viernes Santo' },
    { date: new Date('2025-05-01'), name: 'Día del Trabajador' },
    { date: new Date('2025-05-25'), name: 'Día de la Revolución de Mayo' },
    { date: new Date('2025-06-16'), name: 'Paso a la Inmortalidad del General Martín Miguel de Güemes' },
    { date: new Date('2025-06-20'), name: 'Paso a la Inmortalidad del General Manuel Belgrano' },
    { date: new Date('2025-07-09'), name: 'Día de la Independencia' },
    { date: new Date('2025-08-18'), name: 'Paso a la Inmortalidad del General José de San Martín' },
    { date: new Date('2025-10-13'), name: 'Día del Respeto a la Diversidad Cultural' },
    { date: new Date('2025-11-12'), name: 'Día de la Soberanía Nacional' },
    { date: new Date('2025-12-08'), name: 'Día de la Inmaculada Concepción de María' },
    { date: new Date('2025-12-25'), name: 'Navidad' },
  ];
  dispatch(date_agenda_feriado(feriados2025));
}, [dispatch]);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  };

  const handleSelect=(newDate)=>{
    setDate(newDate)
    dispatch(date_picked({
      date:date? date.toString(): null
    }))
  }

    useEffect(()=>{
      handleSelect(date)
    },[])

    useEffect(()=>{
      dispatch(date_delete_filtered(filtrado))
    },[])
    
    useEffect(() => {
      // Despacha la acción para obtener la agenda desde la API al cargar el componente
      dispatch(date_getagenda());
    }, [dispatch]);

    const agenda=useSelector(store=>store.dateReducer.agenda)


    const colorArrays = colors.reduce((acc, colorClass) => {
      acc[colorClass] = agenda.filter((item) => item.color === colorClass).map((item) => new Date(item.date));
      return acc;
    }, {});
  
    // Array de colores para usar en los modificadores
    const modifiersStyles = colors.reduce((acc, colorClass) => {
      acc[colorClass] = {
        backgroundColor: colores[colorClass], // Aquí asignamos el color de fondo
        fontWeight: "bold",
        borderRadius: "4px",
        color: "black", // Aseguramos que el texto sea blanco para contraste
      };
      return acc;
    }, {});
  return (
    <>
    <div className="flex w-full space-x-12">
          <motion.div
              initial={{ opacity: 1, x: 20 }}  // Inicialmente está en su lugar, visible
              animate={{
                opacity: 1,
                x: showCalendar ? 0 : 20,  // Se mueve cuando aparece el calendario
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}  // Animación suave
              className="px-4 py-2 rounded-md text-indigo-700 hover:text-white duration-100   dark:text-white  dark:hover:text-indigo-200 shadow-md shadow-black  px-3.5 p-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300">
            {date? <div className="p-2 h-16"><span className="capitalize rounded-xl">{format(date,'eeee',{locale: es})}</span>, {format(date, 'PPP', {locale: es})}</div>:<div className="p-2">No hay fechas seleccionadas</div>}
            <div className="flex w-full h-full justify-center gap-10">
            <div className="flex flex-col gap-3 w-56 h-72 border border-indigo-950 dark:bg-gradient-to-r from-indigo-800 to-indigo-900 justify-center shadow-2xl shadow-black rounded-xl">
              <p className="text-center text-xl">Agenda</p>
              <div className="flex flex-col gap-3">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <Button variant="outline"  onClick={toggleCalendar}>
                
                <motion.div
              initial={{ opacity: 1, x: 0 }}  // Inicialmente está en su lugar, visible
              animate={{
                opacity: 1, 
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}  // Animación suave
              className="px-4 py-2 text-white rounded-md  focus:outline-none focus:ring focus:ring-blue-300"
              onClick={toggleCalendar}>Ver agenda</motion.div>
              </Button>

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
                <Button type="submit" >
                  hola
                </Button>
              </DialogFooter>
            </DialogContent>
              </Dialog>
              <DialogDemo title="Agregar" fields={{
                                  name: "Nombre",
                                  description: "Descripcion",
                                  importance: "Importancia",
                                  }} date={date}>
                          
              </DialogDemo>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsOpen(true)}>
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
                <Button type="submit" >
                  hola
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>


          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsOpen(true)}>
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
            </div>   
          </motion.div>
          <motion.div
            initial={{ opacity: 1, y: -100 }}
            animate={{ opacity: showCalendar ? 0 : 1, y: showCalendar ? -100 : 0 }}
            exit={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={showCalendar? `w-9/12 h-full left-64 absolute transition border translate-x-44 z-1 border-white text-center `:`w-9/12 h-full left-64 absolute border border-white text-center`}>Con esta agenda podes organizar toda tu vida universitaria</motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: showCalendar ? 1 : 0, y: showCalendar ? 0 : -10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="mt-4">
              {showCalendar && (
              <Calendar
                captionLayout="dropdown-buttons"
                fromYear={2020}
                toYear={2026}
                fixedWeeks
                mode="single"
                selected={date}
                onSelect={handleSelect}
                className="rounded-md border"
                modifiers={colorArrays} // Usamos los arrays de fechas por color como modificadores
                modifiersStyles={modifiersStyles}
              /> )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: showCalendar ? 1 : 0, y: showCalendar ? 0 : -10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="mt-4">
              {showCalendar && (
          <DataTable data={agenda} date={date} columns={columns} />)}
          </motion.div>
    </div>
    </>
  )
}
