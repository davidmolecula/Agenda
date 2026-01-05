import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { InputToDo } from "./InputToDo";
import { date_getTask, date_updateTask } from "@/store/actions/dateActions";

function ToDoList() {
  const user = useSelector((store) => store.userReducer.user);
  const [taskFixed, setTaskFixed] = useState([]);
  const [taskOfDay, setTaskOfDay] = useState([]);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const task = useSelector((store) => store.dateReducer.task);


  useEffect(() => {
    if (user) {
      dispatch(date_getTask({ id: user.id, date }));
      console.log("despachado getTask");
    }
  }, [user, dispatch, date]);

  useEffect(() => {
    const taskDateNormalized = (task || []).map((item) => ({
      ...item,
      date: new Date(item?.date),
    }));

    const dateFound = taskDateNormalized.filter(
      (tr) =>
        tr.date.getDate() === date.getDate() &&
        tr.date.getMonth() === date.getMonth() &&
        tr.date.getFullYear() === date.getFullYear()
    );
    setTaskFixed(taskDateNormalized);
    setTaskOfDay(dateFound);
  }, [task, dispatch]);

  const handleCompleted = (indexToChange) => {
    const newData = taskFixed.map((item, index) =>
      index === indexToChange
        ? {
            ...item,
            bg:
              item.bg ===
              ("bg-linear-to-r from-sky-500/75 via-sky-900 to-violet-950" || "")
                ? "bg-linear-to-r from-red-500 to-red-900"
                : "bg-linear-to-r from-sky-500/75 via-sky-900 to-violet-950",
            completed: !item.completed,
            checked: item.checked === "✓" ? "x" : "✓",
          }
        : item
    );
    setTaskFixed(newData);
    dispatch(
      date_updateTask({
        filter: newData[indexToChange].task,
        fields: {
          completed: newData[indexToChange].completed,
          bg: newData[indexToChange].bg,
          checked: newData[indexToChange].checked,
        },
      })
    );
    console.log("despachado updatetask");
  };

  const handleCompleted2 = (indexToChange) => {
    const newData2 = taskOfDay.map((item, index) =>
      index === indexToChange
        ? {
            ...item,
            bg:
              item.bg ===
              "bg-linear-to-r from-sky-500/75 via-sky-900 to-violet-950"
                ? "bg-linear-to-r from-red-500 to-red-900"
                : "bg-linear-to-r from-sky-500/75 via-sky-900 to-violet-950",
            completed: !item.completed,
            checked: item.checked === "✓" ? "x" : "✓",
          }
        : item
    );
    setTaskOfDay(newData2);
    dispatch(
      date_updateTask({
        filter: newData2[indexToChange].task,
        fields: {
          completed: newData2[indexToChange].completed,
          bg: newData2[indexToChange].bg,
          checked: newData2[indexToChange].checked,
        },
      })
    );
  };
  return (
    <div className="dark:bg-gray-900 flex flex-col  justify-center  items-center">
      <h1 className="text-9xl justify-self-center">Tareas</h1>
      <div className="w-8/12 border border-sky-500 grid grid-flow-row-dense grid-cols-3  rounded-xl ">
        <div className="col-1  rounded-xl col-span-2 text-white ">
          <h2 className="text-5xl text-center">Tarea permanente</h2>
          {taskFixed.map((taskFixed, index) =>
            taskFixed.fixed ? (
              <div
                className={`flex justify-between  ${taskFixed.bg} p-2 m-1 rounded-xl gap-2`}
                key={taskFixed.id}
              >
                <div  className="w-full flex justify-between items-center">
                <div>{taskFixed.task}</div>
                <Button
                  variant="ghost"
                  className={`rounded-3xl w-1 h-7 bg-black/75 !text-white ${taskFixed.bg} `}
                  onClick={() => handleCompleted(index)}
                >
                  {taskFixed.checked}
                </Button>
                </div>
                <Button variant="ghost">Eliminar</Button>
              </div>
              
            ) : (
              <></>
            )
          )}
        </div>
        <div className="col-3  align-center  rounded-xl text-white ">
          <h2 className="text-5xl text-center ">Tarea del día</h2>
          {taskOfDay.map((taskOfDay, index) =>
            taskOfDay.fixed ? (
              <></>
            ) : (
              taskOfDay.task && (
                <div
                  className={`flex justify-between col-2  rounded-xl col-span-1 text-white ${taskOfDay.bg} p-2`}
                  key={taskOfDay.id}
                >
                  <div>{taskOfDay.task}</div>
                  <Button
                    className="rounded-3xl w-1 h-7 bg-sky-700/75 text-white"
                    onClick={() => handleCompleted2(index)}
                  >
                    {taskOfDay.checked}
                  </Button>
                </div>
              )
            )
          )}
        </div>
      </div>
      <InputToDo
        title="Agregar tarea"
        fields={{
          task: "Tarea",
        }}
        date={date}
      ></InputToDo>
    </div>
  );
}

export default ToDoList;
