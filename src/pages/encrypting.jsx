import 'dotenv/config.js'
import React, { useState } from 'react'
/*import { user_encrypted } from '../store/actions/userActions'*/
import { useDispatch, useSelector } from 'react-redux'





/*

const encrypting = () => {

    let dispatch=useDispatch()
    const data=useSelector((store)=>store.userReducer)
    console.log(data)

    const [formData,setFormData]=useState({
        platform:"",
        account:"",
        email:"",
        password:"",
        iv:""
    })

    const handleContra=(event)=>{
        setFormData({
        ...formData,
        [event.target.name]:event.target.value
        })
    }

    const handleContraEncrypted=(event)=>{
            event.preventDefault()
            dispatch(user_encrypted({
                data:formData
            }))
        }
return (
    <>
        <div className='w-full bg-black flex justify-center border border-black'>
            <form onSubmit={handleContraEncrypted} action="#" className="mt-8 w-96 grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
                <label
                htmlhtmlfor="Platform"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                Plataforma
                </label>

                <input
                type="text"
                id="platform"
                name="platform"
                onChange={handleContra}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
                <label
                htmlhtmlfor="Account"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                Cuenta
                </label>

                <input
                type="text"
                id="account"
                name="account"
                onChange={handleContra}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
            </div>

            <div className="col-span-6">
                <label htmlhtmlfor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
                </label>

                <input
                type="email"
                id="email"
                name="email"
                onChange={handleContra}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
                <label
                htmlhtmlfor="Password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                Password
                </label>

                <input
                type="password"
                id="password"
                name="password"
                onChange={handleContra}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
            </div>


            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                Guardar contraseña
                </button>
            </div>
            </form>
            </div>
    </>
)
}

export default encrypting */