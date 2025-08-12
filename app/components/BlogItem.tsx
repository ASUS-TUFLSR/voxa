import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react'

type Props = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    categoryId: string;
    location: string; 
}

const BlogItem = (props : Props ) => {
  return (
    <Card className='hover:border-slate-950 duration-500 flex flex-col w-[400px] h-[550px] mx-4 my-2 rounded-lg' >
      <CardHeader>
        <Image width={400} height={100} className='h-48 rounded-sm' alt={props.title} src={"https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?"} />
      </CardHeader>
      <CardTitle className='p-3 font-extrabold text-2xl' >{props.title}</CardTitle>
      <CardContent className='w-full text-slate-900' >
        <div dangerouslySetInnerHTML={{__html:props.description}} className='tracking-wide w-full px-2 py-1 text-left' ></div>
      </CardContent>
      </Card>
  )
}

export default BlogItem