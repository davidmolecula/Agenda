import React from 'react'


const Me = () => {
return (
<section className='w-full '>

        <div className='flex text-white w-full h-full bg-slate-200  dark:bg-gray-900'>

                <div className='flex flex-wrap w-screen justify-center'>
                        <div className=' self-center  w-96'>
                                <p className='text-6xl p-0 font-bold text-black dark:text-white tracking-tigh '><span className='text-indigo-700'>D</span>avid <span className='text-indigo-700'>M</span>olina</p>
                                <p className=' text-3xl text-black dark:text-white tracking-tight p-1'>Desarrollador web fullstack</p>
                        </div>

                        <div className='self-end overflow-hidden w-96'>
                                        <div className='rounded-full   overflow-hidden bg-gradient-to-b from-indigo-200 to-black  dark:from-indigo-900 dark:to-black'>
                                                <img src="https://i.ibb.co/QkRSs0k/David.png" alt="David" border="0" />
                                        </div>
                        </div>
                </div>       
        </div>

</section>
)
}

export default Me