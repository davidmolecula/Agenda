import React, { useEffect } from 'react'
import LinksProjects from './LinksProjects'

const Ceit = () => {
    const imgUrl=[
        {
        'url':"https://i.ibb.co/xJgs7pB/html.png",
        'alt':'html',
        'key':'1ceit'
        },
        {
        'url':'https://i.ibb.co/vYZw4CT/css-3.png',
        'alt':'css3',
        'key':'2ceit'
        },
        {
        'url':'https://imgfz.com/i/1ROrg2h.png',
        'alt':'js',
        'key':'3ceit'
        }
    ] 
    return (
    <div className='pt-8 md:w-6/12  md:h-5/6  overflow-hidden dark:bg-gray-900 flex  items-center justify-center'>
    <div className='md:grid grid-cols-2 bg-gradient-to-r from-indigo-500 to-indigo-900  dark:bg-gradient-to-r dark:from-black  relative z-100 flex flex-col justify-center sm:w-full md:w-10/12 md:h-3/6 border  border-t-transparent shadow-slate-500  shadow-lg border border-transparent dark:hover:border-blue-500 rounded-xl dark:hover:shadow-blue-500 duration-300'> 
            <div className='w-10/12 rounded-xl text-white self-center flex flex-col items-center justify-center'>      
                <div className='md:text-3xl dark:text-white font-bold tracking-tight text-center sm:text-3xl'>Web del centro de estudiantes
                </div>
                <div className='flex'>
                    {imgUrl.map(img=> <img src={img.url} key={img.key} alt={img.alt} border="0"
                    className='w-12 h-12 hover:scale-125  duration-500 p-1 ' />)}
                </div>
                <LinksProjects text='Visitar' link='https://ceitfra.com.ar' color='gray-100'/>
            </div>  
            <div className='grid grid-cols-3 auto-rows-min self-center gap-2 rounded-xl overflow-hidden '>
                <img src="https://images.unsplash.com/photo-1704000599375-9224c9faaab9?q=80&w=1620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className='col-span-3 hover:scale-105  duration-500'/>
                <img src="https://i.ibb.co/CmF9dGS/ceit-explorando.jpg" 
                alt="ceit-explorando" 
                border="0"
                className='hover:scale-105 md:h-16 duration-500  w-full'/>
                <img src="https://i.ibb.co/51nQHjD/ceit-info.jpg" 
                alt="ceit-info" 
                border="0"
                className='hover:scale-105 md:h-16 duration-500  w-full' />
                <img src="https://i.ibb.co/mRtddG9/ceit-foto-gab.png" 
                alt="ceit-foto-gab" 
                border="0"
                className='hover:scale-105  duration-500 md:h-16 w-full'  />
            </div>  
    </div>
</div>
    )
}

export default Ceit