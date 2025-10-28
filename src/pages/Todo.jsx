import React from 'react'
import ToDoList from '../components/ToDoList.jsx'
import { columns } from "../components/payments/columns.jsx";
import { useSelector } from 'react-redux';

const Todo = () => {

  const agenda=useSelector(store=>store.dateReducer.agenda)
  const feriados=useSelector(store=>store.dateReducer.feriados)
  const agendaYFeriados=[...agenda,...feriados??[]]
  return (
    <div>
        <ToDoList></ToDoList>
    </div>
  )
}

export default Todo