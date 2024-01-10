import React, { useEffect, useRef } from 'react'


const LinksHeader = ({text,link,color}) => {
  const colorRef=useRef()
  useEffect(()=>{
    colorRef.current.classList.add('bg-'+color)
  },[])
  
  return (
    <div className="flex absolute sm:static opacity-0 sm:opacity-100 items-center z-20 justify-center">
            <a href={link} ref={colorRef} target='_blank' className="rounded-md border border-transparent text-indigo-700 hover:text-white duration-100  hover:bg-gradient-to-r from-indigo-500 to-indigo-900 dark:bg-gradient-to-r from-indigo-800 to-indigo-900 dark:text-white dark:hover:bg-gradient-to-r dark:hover:from-gray-300 dark:hover:to-gray-300 dark:hover:text-indigo-500 shadow-md shadow-black  px-3.5 p-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">{text}</a>
            </div>
  )
}

export default LinksHeader