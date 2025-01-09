"use client"

import * as React from "react"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { date_picked, date_getagenda} from "@/store/actions/dateActions";
import { es } from "date-fns/locale/es";
import { format } from "date-fns";
import {DialogDemo} from "@/components/Dialog.jsx";
import DataTable from "./payments/dataTable.jsx";
import { columns } from "./payments/columns.jsx";
import { Button } from "@/components/ui/button";
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
    useEffect(() => {
      // Despacha la acción para obtener la agenda desde la API al cargar el componente
      dispatch(date_getagenda());
    }, [dispatch]);
    const agenda=useSelector(store=>store.dateReducer.agenda)
    console.log(agenda)
  return (
    <>
    <div className="flex w-full  space-x-12">
    <Calendar
      captionLayout="dropdown-buttons"
      fromYear={2020}
      toYear={2026}
      fixedWeeks
      mode="single"
      selected={date}
      onSelect={handleSelect}
      className="rounded-md border"
    />

    <div className="flex items-center flex-col w-96 gap-10  rounded-xl">
      {date? <div className="p-2"><span className="capitalize  rounded-xl">{format(date,'eeee',{locale: es})}</span>, {format(date, 'PPP', {locale: es})}</div>:<div>No hay fechas seleccionadas</div>}
      <div className="flex w-full h-full justify-center gap-10">
      <div className="flex flex-col gap-3 w-56 justify-center border border-gray-400 rounded-xl">
        <p className="text-center text-xl">Agenda</p>
        <div className="flex flex-col gap-3">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Ver agenda
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
        <DialogDemo title="Agregar" fields={{
                            name: "",
                            description: "",
                            importance: "",
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
        </div>
      </div>
      </div>   
      </div>
      <DataTable data={agenda} date={date} columns={columns} />
    </div>
    </>
  )
}
