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
    <div>{props.title}</div>
  )
}

export default BlogItem