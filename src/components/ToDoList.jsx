import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { DialogToDo } from "./DialogToDo";
import { date_gettracking } from "@/store/actions/dateActions";

function ToDoList() {
const user=useSelector(store=> store.userReducer.user)
const [taskFixed, setTaskFixed]=useState([])
const [taskOfDay, setTaskOfDay]=useState([])
const dispatch=useDispatch()
const [date, setDate] = useState(new Date());
const tracking=useSelector(store=>store.dateReducer.tracking)

const trackingDateNormalized = (tracking||[]).map(item => ({
  ...item,
  date: new Date(item.date) 
}));

const dateFound=trackingDateNormalized.filter(tracking=>(tracking.date.getDate()==date.getDate()&&tracking.date.getMonth()==date.getMonth()&&tracking.date.getFullYear()==date.getFullYear())?tracking:false)
console.log(dateFound)

useEffect(() => {
  if (user&&user.id){
  // dispatch solo si date cambió
  dispatch(date_gettracking({ id: user.id, date }));
}
}, [user, dispatch]);

useEffect(()=>{
setTaskFixed(tracking)
setTaskOfDay(dateFound)
},[tracking, dispatch])

const handleCompleted=(indexToChange)=>{
  const newData = taskFixed.map((item, index) =>
      index === indexToChange
        ? {
            ...item,
            bg: item.bg === "bg-green-500" ? "bg-red-500" : "bg-green-500",
          }
        : item
    );
  setTaskFixed(newData);
}

const handleCompleted2=(indexToChange)=>{
    const newData2 = taskOfDay.map((item, index) =>
      index === indexToChange
        ? {
            ...item,
            bg: item.bg === "bg-gradient-to-r from-green-500 to-green-900" ? "bg-gradient-to-r from-red-500 to-red-900" : "bg-gradient-to-r from-green-500 to-green-900",
          }
        : item
    );
    setTaskOfDay(newData2);
}


  return (
    <div className="dark:bg-gray-900 flex flex-col border border-green-500 justify-center  items-center">
    <h1 className="text-9xl justify-self-center">Tareas</h1>
    <Button>Ver Tareas</Button>
    <DialogToDo  title="Agregar tarea" fields={{
                                                          task:"Tarea",
                                                          }} date={date}></DialogToDo>
    <div className="w-8/12 grid grid-flow-row-dense grid-cols-3 grid-rows-3 rounded-xl ">
    
    {taskFixed.map((taskFixed, index)=>taskFixed.fixed?(
      <div className={`flex justify-between col-1  rounded-xl col-span-2 text-white ${taskFixed.bg} p-2`}  key={index}><div>{taskFixed.task}</div><Button  className="rounded-3xl w-1 h-7 bg-green-700/75 text-green-300" onClick={()=>handleCompleted(index)}>✓</Button></div>
    ):(<></>)
  )}
  {taskOfDay.map((taskOfDay, index)=>taskOfDay.fixed?(
      <></>
    ):(<div className={`flex justify-between col-2  rounded-xl col-span-1 text-white ${taskOfDay.bg} p-2`}  key={index}><div>{taskOfDay.task}</div><Button  className="rounded-3xl w-1 h-7 bg-green-700/75 text-green-300" onClick={()=>handleCompleted2(index)}>✓</Button></div>)
  )}
  <div className="dark:bg-gradient-radial-[at_25%_25%] from-white to-zinc-900 to-75%">aaa</div>
    </div>
    </div>
  
)}

export default ToDoList;



/* import React, { useEffect, usetaskFixed } from "react";

function ToDoList() {
  const [data, setData] = usetaskFixed([]); // empieza vacío
  const [loading, setLoading] = usetaskFixed(true);

  useEffect(() => {
    // simulamos una petición al backend
    const fetchData = async () => {
      const response = await fetch("https://miapi.com/tareas"); // tu endpoint real
      const result = await response.json();
      setData(result); // guardamos los datos
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleClick = (indexToChange) => {
    // creamos un nuevo array cambiando solo un elemento
    const newData = data.map((item, index) =>
      index === indexToChange
        ? {
            ...item,
            bg: item.bg === "bg-red-500" ? "bg-green-500" : "bg-red-500",
          }
        : item
    );
    setData(newData); // actualiza → React re-renderiza
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data.map((item, index) => (
        <div
          key={item.id || index}
          className={`p-4 rounded-xl text-center text-white cursor-pointer ${item.bg}`}
          onClick={() => handleClick(index)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default ToDoList;

*/