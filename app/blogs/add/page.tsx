"use client";
import { useSession } from 'next-auth/react';
import React from 'react'

const WriteBlog = () => {

    const { data:session } = useSession();

  return (
    <section className='w-full py-10 px-6 bg-orange-200' 
    
    >
       <div className='flex justify-between p-4 items-center'
       style={{
        backgroundImage: `url('https://static.wixstatic.com/media/d19037_a4a215b82b8c4063aaddf256b7a35653~mv2.jpg/v1/fill/w_1024,h_458,al_c,q_85,enc_avif,quality_auto/d19037_a4a215b82b8c4063aaddf256b7a35653~mv2.jpg')`,
        backgroundSize: 'cover'
      }}
       >
            <div className='w-1/4' >
                <span className='font-extrabold mx-3 text-white' >Author:</span>
                <span className='font-semibold uppercase text-white' >{session?.user?.name}</span>
            </div>
            <button className='bg-red-700 text-orange-200 px-6 focus:ring-red-900 py-3 rounded-xl 
            font-semibold shadow-xl hover:bg-red-800' >Publish</button>

       </div>
       <h1 contentEditable={true} suppressContentEditableWarning={true} className='outline-none border-none font-serif mx-auto p-4 text-2xl 
       text-center font-bold text-red-900 w-full h-28 focus:border-none ' >Enter Title!</h1>
       <div className='w-full flex' >
       <input type='file' className='md:w-[500px] sm:w-[300px] m-auto text-red-900 bg-orange-100 p-4 rounded-xl font-semibold' />
       </div>
    </section>
  )
}

export default WriteBlog