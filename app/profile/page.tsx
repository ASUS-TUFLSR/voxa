import { blogs } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'
import { MdEmail } from "react-icons/md";
import BlogItem from '../components/BlogItem';

const  ProfilePage = () => {
  return (
    <section className='w-full h-full flex flex-col bg-orange-200' >
        <div className='mx-auto py-2' >
            <Image className='rounded-[50%]' src={"/userIcon.png"} alt='User-Profile' width={100} height={50} />
        </div>
        <div className=' mx-auto my-2 w-auto' >
             <h1 className='text-4xl w-auto font-semibold text-red-900 px-4 py-2' >Vrinda Deshmukh</h1>
        </div>
        <div className='mx-auto my-2 w-auto flex items-center gap-3'>
          <span><MdEmail /></span>{" "}
             <p className='text-xl font-semibold' >Vrinda</p>
        </div>
        <hr className='p-2' />
        <div className='w-full h-full flex flex-col ' >
          <div className='w-2/4 mx-auto' >
              <p className='text-center' >Blog Count: 7</p>
          </div>
          <div className='flex flex-wrap justify-center p-4 my-3 ' >
              {blogs.map((blog) => <BlogItem {...blog} key={blog.id}/>)}
            </div>
        </div>
    </section>
  )
}

export default  ProfilePage