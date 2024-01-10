import React from 'react'
import LinksProjects from './LinksProjects'


const Chauvin = () => {
  return (
    <div className='pt-8 md:w-6/12 md:h-5/6 overflow-hidden dark:bg-gray-900 flex  items-center justify-center'>
      <div className='md:grid grid-cols-2 bg-gradient-to-r from-indigo-500 to-indigo-900 relative z-100 dark:bg-gradient-to-r dark:from-black   flex flex-col justify-center sm:w-full md:w-10/12 h-3/6 border  border-t-transparent shadow-slate-500  shadow-lg border border-transparent dark:hover:border-blue-500 rounded-xl dark:hover:shadow-blue-500 duration-300'>
        <div className='w-10/12  rounded-xl dark:text-white self-center flex flex-col items-center justify-center'>
        <h2 className='md:text-3xl font-bold text-white tracking-tight text-center sm:text-3xl'>Chauvin Arquitectura</h2>
          <div className='flex'>
              <img src="https://i.ibb.co/xJgs7pB/html.png" alt="html" border="0"
                          className='w-12 h-12 hover:scale-105  duration-500 p-1' />
              <img src="https://i.ibb.co/vYZw4CT/css-3.png" alt="css-3" border="0"  
                      className='w-12 h-12 hover:scale-105  duration-500 p-1'/>
              <img src="https://i.ibb.co/CbD2NNt/Bootstrap-logo-svg.png" alt="Bootstrap-logo-svg" border="0" 
                      className='w-12 h-12 p-1'/>
              <img src="https://imgfz.com/i/1ROrg2h.png" alt="javascript" border="0"
                          className='w-12 h-12  hover:scale-105  duration-500 p-1' />
          </div>
          <LinksProjects text='Visitar' link='https://chauvinarquitectura.com' color='gray-100'/>
        </div>
        <div className="grid grid-cols-3 auto-rows-min self-center gap-2 rounded-xl overflow-hidden border border-transparent">
            <img src="https://i.ibb.co/vLHY2Y3/chauvin-main.jpg" alt="chauvin-main" border="0" className='col-span-3 '/>
            <img src="https://i.ibb.co/stCcB1k/chauvin-proy.jpg" alt="chauvin-proy" border="0" className=' w-full md:h-16'  />
            <img src="https://i.ibb.co/DGhSg49/chauvin-nos.jpg" alt="chauvin-nos" border="0" className=' w-full md:h-16'/>
            <img src="https://i.ibb.co/DtBM5GZ/chauvin-servicios.jpg" alt="chauvin-servicios" border="0" className='w-full md:h-16'/>
        </div>
    </div>
  </div>

  )
}

export default Chauvin