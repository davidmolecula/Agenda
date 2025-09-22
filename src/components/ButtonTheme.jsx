import React, {useEffect, useRef, useState } from 'react'


const ButtonsTheme = ()=> {
    const moonRef=useRef()
    const sunRef=useRef()
    const [theme, setTheme]=useState(()=>{
        if(window.matchMedia('(prefers-color-scheme: dark)').matches)
        {
            return 'dark'
        }
        return 'light'
    })
    useEffect(()=>{
        if(theme==='light')
        {
            document.querySelector('html').classList.remove('dark')
            document.querySelector('body').classList.remove('dark')
            sunRef.current.classList.add('hidden')
        }else{
            document.querySelector('html').classList.add('dark')
            document.querySelector('body').classList.add('dark')
            sunRef.current.classList.remove('hidden') 
        }
    },[theme])
    const handleTheme=()=>{
        setTheme(prev=>prev==='dark'?"light":"dark")
    }
    
return (
        <button onClick={handleTheme} className='relative z-50 px-5 py-2.5 sm:flex sm:gap-4'>
        <img ref={moonRef} src="https://i.ibb.co/rZXfJKj/luna.png" alt="luna" border="0" className='absolute dark:hidden top-0 left-0 h-10 w-10 p-1'/>
        <img ref={sunRef}  src="https://i.ibb.co/yk738p8/brightness.png" alt="brightness" border="0" className='absolute bg-slate-200 rounded-xl hidden top-0 left-0  h-10 w-10 p-1' />
        </button>
)
}

export default ButtonsTheme