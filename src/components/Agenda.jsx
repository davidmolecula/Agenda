"use client";

import * as React from "react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  date_picked,
  date_getagenda,
  date_update,
  date_delete,
  date_gettracking,
} from "@/store/actions/dateActions";
import { InputTracking } from "@/components/InputTracking.jsx";
import { es } from "date-fns/locale/es";
import { format } from "date-fns";
import { DialogAgregar } from "@/components/DialogAgregar.jsx";
import DataTable from "./payments/dataTable.jsx";
import { columns } from "./payments/columns.jsx";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChartBarInteractive } from "../components/BarChart.jsx";
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
  const user = useSelector((store) => store.userReducer.user);
  const agenda = useSelector((store) => store.dateReducer.agenda);
  const feriados = useSelector((store) => store.dateReducer.feriados);
  const tracking = useSelector((store) => store.dateReducer.tracking);
  const agendaYFeriados = [...agenda, ...(feriados ?? [])];
  const [date, setDate] = useState(new Date());
  // Controla si el diálogo está abierto o cerrado
  const [showStudies, setShowStudies] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showHobbie, setShowHobbie] = useState(false);
  const [filtrado, setFiltrado] = useState("");
  const [scheduledToChange, setScheduledToChange] = useState("");
  const [scheduledModified, setScheduledModified] = useState("");
  const [inputDelete, setInputDelete] = useState("");
  const [inputModify, setInputModify] = useState("");
  const [inputModified, setInputModified] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const colors = [
    "bg-red-500", // Alerta
    "bg-yellow-400", // Fecha importante
    "bg-indigo-500", // Base principal
    "bg-purple-400", // Evento especial
    "bg-blue-400", // Evento neutro
    "bg-green-400", // Evento positivo
  ];
  const colores = {
    "bg-red-500": "#ef4444", // Alerta
    "bg-yellow-400": "#facc15", // Fecha importante
    "bg-indigo-500": "#6366f1", // Base principal
    "bg-purple-400": "#a78bfa", // Evento especial
    "bg-blue-400": "#60a5fa", // Evento neutro
    "bg-green-400": "#4ade80", // Evento positivo
  };

  const handleSelect = (newDate) => {
    if (!newDate) return;
    setDate(newDate);
    dispatch(
      date_picked({
        date: date ? date.toString() : null,
      })
    );
  };

  useEffect(() => {
    handleSelect(date);
    dispatch(date_getagenda({ id: user?.id }));
    dispatch(date_gettracking({ id: user.id, date: date }));
  }, [dispatch, refresh]);

  const colorArrays = colors.reduce((acc, colorClass) => {
    acc[colorClass] = [
      ...(agenda
        ?.filter((item) => item.color === colorClass)
        .map((item) => new Date(item.date)) || []),
      ...(feriados
        ?.filter((item) => item.color === colorClass)
        .map((item) => new Date(item.date)) || []),
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
  const trackingDateNormalized = (tracking || []).map((item) => ({
    ...item,
    date: new Date(item.date),
  }));

  const dateFound = trackingDateNormalized.filter((tracking) =>
    tracking.date.getDate() == date.getDate() &&
    tracking.date.getMonth() == date.getMonth() &&
    tracking.date.getFullYear() == date.getFullYear()
      ? tracking
      : false
  );

  const chartData = tracking
    .filter((tracking) => tracking.task === "Estudio")
    .map((tracking) => ({
      date: tracking.date,
      total: tracking.meassure,
      maximo: 1,
    }));
  const chartData2 = tracking
    .filter((tracking) => tracking.task === "Entrenamiento")
    .map((tracking) => ({
      date: tracking.date,
      total: tracking.meassure,
      maximo: 1,
    }));
  const chartData3 = tracking
    .filter((tracking) => tracking.task === "Hobbie")
    .map((tracking) => ({
      date: tracking.date,
      total: tracking.meassure,
      maximo: 1,
    }));

  return (
    <>
      <div className="w-full space-x-12 h-fit flex flex-col md:flex-row flex-wrap bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% dark:from-indigo-900   dark:via-indigo-950 dark:to-black dark:to-90%">
        <div className="flex flex-col flex-wrap w-full h-screen justify-center items-center gap-10 border border-purple-500">
          <h1 className="flex self-bottom text-center text-6xl">Agenda</h1>
          <div className="flex gap-10">
            <motion.div
              initial={{ opacity: 1, x: 20 }} // Inicialmente está en su lugar, visible
              animate={{
                opacity: 1,
                x: 0, // Se mueve cuando aparece el calendario
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }} // Animación suave
              className="h-fit w-fit  border-none rounded-md text-indigo-700 hover:text-white duration-100  dark:text-white  dark:hover:text-indigo-200  text-sm font-semibold focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-white rounded-md focus:outline-hidden focus:ring-3 focus:ring-blue-300"
            >
              <div className="flex w-full h-fit justify-center gap-10">
                <div className="flex flex-col gap-3 w-56 h-72 border  dark:border-violet-500/100 justify-center shadow-2xl shadow-black rounded-xl">
                  <p className="text-center text-xl dark:text-white text-black">
                    Agenda
                  </p>
                  <DialogAgregar
                    title="Agregar"
                    fields={{
                      name: "Nombre",
                      description: "Descripcion",
                      importance: "Importancia",
                    }}
                    date={date}
                    onSave={() => setRefresh((prev) => !prev)}
                  ></DialogAgregar>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-black/75 text-white"
                        onClick={() => setIsOpen(true)}
                      >
                        Modificar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Modificar Evento</DialogTitle>
                        <DialogDescription>
                          Busca el evento que deseas Modificar.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="filter" className="text-right">
                            Buscar
                          </Label>
                          <Input
                            id="filter"
                            value={inputModify}
                            onChange={(event) => {
                              const value = event.target.value.toLowerCase();
                              setInputModify(value);
                              const filtered = agenda.filter((item) =>
                                item.name.toLowerCase().startsWith(value)
                              );
                              setScheduledToChange(filtered);
                            }}
                            className="col-span-3"
                          />
                        </div>
                        {scheduledToChange.length > 0 &&
                        inputModify.length > 0 ? (
                          <ul className="mt-2">
                            {scheduledToChange.map((item, index) => (
                              <li
                                key={item.id}
                                className="flex flex-wrap justify-between items-center gap-3 p-2 "
                              >
                                <span>{item.name}</span>
                                <div
                                  key={item.id}
                                  className="flex justify-between items-center  p-2"
                                >
                                  <span>
                                    <span>
                                      {format(item.date, "eeee", {
                                        locale: es,
                                      })}
                                    </span>
                                    , {format(item.date, "PPP", { locale: es })}
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-14">
                                  <Label
                                    htmlFor="modify"
                                    className="text-right"
                                  >
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        dispatch(
                                          date_update({
                                            id: item._id,
                                            name: inputModified,
                                          })
                                        );
                                        setScheduledToChange(
                                          scheduledToChange.filter(
                                            (f) => f._id !== item._id
                                          )
                                        );
                                      }}
                                    >
                                      Modificar
                                    </Button>
                                  </Label>
                                  <Input
                                    id={index}
                                    onChange={(event) => {
                                      const value =
                                        event.target.value.toLowerCase();
                                      setInputModified(value);
                                    }}
                                    className="col-span-3"
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          inputModify && (
                            <p className="text-gray-500">No hay resultados.</p>
                          )
                        )}
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-black/75 text-white"
                        onClick={() => setIsOpen(true)}
                      >
                        Eliminar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Eliminar Evento</DialogTitle>
                        <DialogDescription>
                          Busca el evento que deseas eliminar.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="filter" className="text-right">
                            Buscar
                          </Label>
                          <Input
                            id="filter"
                            value={inputDelete}
                            onChange={(event) => {
                              const value = event.target.value.toLowerCase();
                              setInputDelete(value);
                              const filtered = agenda.filter((item) =>
                                item.name.toLowerCase().startsWith(value)
                              );
                              setFiltrado(filtered);
                            }}
                            className="col-span-3"
                          />
                        </div>
                        {filtrado.length > 0 && inputDelete.length > 0 ? (
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
                                  <span>
                                    <span>
                                      {format(item.date, "eeee", {
                                        locale: es,
                                      })}
                                    </span>
                                    , {format(item.date, "PPP", { locale: es })}
                                  </span>
                                </div>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    dispatch(date_delete({ id: item._id }));
                                    setFiltrado(
                                      filtrado.filter((f) => f._id !== item._id)
                                    );
                                  }}
                                >
                                  Eliminar
                                </Button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          inputDelete && (
                            <p className="text-gray-500">No hay resultados.</p>
                          )
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
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Calendar
                captionLayout="dropdown-buttons"
                fromYear={2020}
                toYear={2026}
                fixedWeeks
                mode="single"
                selected={date}
                onSelect={handleSelect}
                locale={es}
                className="rounded-md border shadow-xl"
                modifiers={colorArrays} // Usamos los arrays de fechas por color como modificadores
                modifiersStyles={modifiersStyles}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <DataTable data={agendaYFeriados} date={date} columns={columns} />
          </motion.div>
        </div>

        <div className="w-full h-[700px]">
          <h1 className="w-full text-center text-6xl">Seguimientos</h1>
          <div className="w-full flex justify-center gap-10 p-5">
            <Button
              onClick={() => {
                setShowStudies(!showStudies);
              }}
            >
              Estudio
            </Button>
            <Button
              onClick={() => {
                setShowTraining(!showTraining);
              }}
            >
              Entrenamiento
            </Button>
            <Button
              onClick={() => {
                setShowHobbie(!showHobbie);
              }}
            >
              Agregar seguimiento
            </Button>
          </div>
          {showHobbie || showStudies || showTraining ? null : (
            <div className=" w-full text-white text-6xl text-center">
              HOLAAAAAAAAAAAAAAAAAAAAAAA
            </div>
          )}

          <div className="w-full flex flex-wrap bg-transparent gap-10 justify-center">
            {showStudies ? (
              <motion.div
                initial={{ opacity: 0, x: 20, y: 0 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                exit={{ opacity: 0 }}
                className="h-fit w-fit  border-none rounded-md text-indigo-700 hover:text-white duration-100  dark:text-white  dark:hover:text-indigo-200  text-sm font-semibold focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-white rounded-md focus:outline-hidden focus:ring-3 focus:ring-blue-300"
              >
                <InputTracking
                  fields={{
                    meassure: "Horas",
                  }}
                  date={date}
                  task={"Estudio"}
                  onSave={() => setRefresh((prev) => !prev)}
                ></InputTracking>

                <ChartBarInteractive
                  chartData={chartData}
                  title="Horas estudiadas"
                  description="Cantidad de horas estudiadas por día"
                ></ChartBarInteractive>
              </motion.div>
            ) : null}
            {showTraining ? (
              <motion.div
                initial={{ opacity: 0, x: 20, y: 0 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                exit={{ opacity: 0 }}
                className="h-fit w-fit  border-none rounded-md text-indigo-700 hover:text-white duration-100  dark:text-white  dark:hover:text-indigo-200  text-sm font-semibold focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-white rounded-md focus:outline-hidden focus:ring-3 focus:ring-blue-300"
              >
                <InputTracking
                  fields={{
                    meassure: "Entrenamiento",
                  }}
                  date={date}
                  task={"Entrenamiento"}
                  onSave={() => setRefresh((prev) => !prev)}
                ></InputTracking>

                <ChartBarInteractive
                  chartData={chartData2}
                  title="Horas de Entrenamiento"
                  description="Cantidad de horas de entrenamiento"
                ></ChartBarInteractive>
              </motion.div>
            ) : (
              <></>
            )}
            {showHobbie ? (
              <motion.div
                initial={{ opacity: 0, x: 20, y: 0 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                exit={{ opacity: 0 }}
                className="h-fit w-fit  border-none rounded-md text-indigo-700 hover:text-white duration-100  dark:text-white  dark:hover:text-indigo-200  text-sm font-semibold focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-white rounded-md focus:outline-hidden focus:ring-3 focus:ring-blue-300"
              >
                <InputTracking
                  fields={{
                    meassure: "Hobbie",
                  }}
                  date={date}
                  task={"Hobbie"}
                  onSave={() => setRefresh((prev) => !prev)}
                ></InputTracking>

                <ChartBarInteractive
                  chartData={chartData3}
                  title="Horas practicando"
                  description="Cantidad de horas practicadas por día"
                ></ChartBarInteractive>
              </motion.div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
