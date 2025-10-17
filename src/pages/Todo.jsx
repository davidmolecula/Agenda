import React from 'react'

const Todo = () => {
  return (
    <div>
        <h1>Tareas</h1>
        <div className='flex'>
            <p className='p-1 border border-white rounded-xl bg-green-300 text-black '>Esta seria la tarea del dia</p>
            <button className='border p-1'>check</button>
        </div>
    </div>
  )
}

export default Todo