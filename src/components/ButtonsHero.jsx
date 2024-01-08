import React from 'react'

const ButtonsHero = ({text,link}) => {
  return (
    <div className="flex items-center justify-center">
            <a href={link} target='_blank' className="rounded-md border border-transparent bg-white text-indigo-700 hover:text-white duration-100  hover:bg-gradient-to-r from-indigo-500 to-indigo-900  shadow-md shadow-black  px-3.5 p-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">{text}</a>
            </div>
  )
}

export default ButtonsHero