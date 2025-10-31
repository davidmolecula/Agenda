import React, { useState } from 'react'
import { user_login } from '../store/actions/userActions'
import { useDispatch } from 'react-redux'



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch()
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })

  const handleInput=(event)=>{
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }

  const handleSignin= async(event)=>{
    event.preventDefault()
    try{
        dispatch(user_login({
          data:formData
        }))
    }catch(error){
      console.log(error)
    }
  }

  return (
<section className="relative flex flex-wrap bg-slate-200 dark:bg-gray-900 lg:h-screen lg:items-center">
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div className="mx-auto max-w-lg dark:text-white text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">¡Hola de nuevo!</h1>

      <p className="mt-4 text-gray-500">
        Proximamente iniciar sesion con Google
      </p>
    </div>

    <form onSubmit={handleSignin} action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div>
        <label htmlhtmlfor="email" className="sr-only">Email</label>

        <div className="relative">
          <input 
          onChange={handleInput}
            type="email"
            name="email"
            className="w-full text-black rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs dark: text-white"
            placeholder="Tu email"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlhtmlfor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
          onChange={handleInput}
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full text-black rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs dark:text-white"
            placeholder="Tu contraseña"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setShowPassword(!showPassword)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          No tenes cuenta?  
            <a className="underline" href="/register"> Registrate</a>
        </p>

        <button
          type="submit"
          className="rounded-xl border border-transparent text-indigo-700 hover:text-white duration-100  hover:bg-linear-to-r from-indigo-500 to-indigo-900 dark:bg-linear-to-r from-indigo-800 to-indigo-900 dark:text-white dark:hover:bg-linear-to-r dark:hover:from-gray-300 dark:hover:to-gray-300 dark:hover:text-indigo-500 shadow-md shadow-black p-2"
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  </div>

  <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
    <img
      alt="Welcome"
      src="https://i.imgur.com/udrKeeT.jpeg"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</section>
  )
}

export default Login