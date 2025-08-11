import { Card } from '@/components/ui/card';
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
    <Card>{props.title}</Card>
  )
}

export default BlogItem