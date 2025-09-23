import Image from 'next/image'
import React from 'react'
import { MdEmail } from "react-icons/md";

const  ProfilePage = () => {
  return (
    <section className='w-full h-full flex flex-col' >
        <div className='' >
            <Image src={""} alt='User-Profile' width={200} height={200} />
        </div>
        <div className='w-2/4 mx-auto my-2' >
             <h1 className='text-4xl w-auto font-semibold bg-slate-100' >Vrinda Deshmukh</h1>
        </div>
        <div className='w-2/4 mx-auto my-2' >
             <p className='text-4xl font-semibold bg-slate-100' ><span><MdEmail />
</span>Vrinda Deshmukh</p>
        </div>
    </section>
  )
}

export default  ProfilePage