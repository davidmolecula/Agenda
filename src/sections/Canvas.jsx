import React, { useEffect, useRef } from 'react'

import '../js/canvas.js'



const Canvas = () => {
    let canvas=useRef()

    useEffect(()=>{
        const canvasValue=canvas.current
        
        canvas.current.classList.add('bg-blue-500')
        const ctx=canvas.current.getContext('2d')
        
        canvas.width=700
        canvas.height=900
        console.log(canvas)
        ctx.fillRect(100,100,200,150)
    },[])
    

  return (
    <canvas ref={canvas} className='bg-black' id='canvas1'>Canvas</canvas>
  )
}

export default Canvas