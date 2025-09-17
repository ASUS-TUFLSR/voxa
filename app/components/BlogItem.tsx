import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogItemType } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = BlogItemType;

const BlogItem = (props: Props) => {
  // Strip HTML tags before truncating to avoid breaking tags
  const plainText = props.description.replace(/<[^>]+>/g, "");
  const truncated = plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;



  return (
  <Card
  className="border-red-800 duration-500 
             flex flex-col w-[600px] mx-4 my-2 border-4 bg-orange-100 rounded-sm
             overflow-hidden transform transition-transform hover:scale-101"
>
  {/* Image */}
  <CardHeader className="p-0">
    <Image
      width={600}
      height={200}
      className="h-44 w-full p-1 object-cover"
      alt={props.title}
      src={props.imageUrl}
    />
  </CardHeader>

  {/* Middle Content */}
  <div className="flex flex-col flex-1">
    <CardTitle className="px-4 pt-3 font-bold font-serif text-xl text-red-900">
      {props.title}
    </CardTitle>

    <CardContent className="px-4 flex-1">
      <div
        dangerouslySetInnerHTML={{ __html: truncated }}
        className="tracking-wide w-full text-left break-words"
      ></div>
    </CardContent>

    {/* Footer */}
    <CardFooter className="px-4 pb-4 mt-auto">
      <Link href={`/blogs/view/${props.id}`} className="ml-auto border-2 border-red-700 p-1 rounded-sm text-amber-100 bg-red-700 hover:bg-red-800 hover:text-amber-200 duration-500">
        View More
      </Link>
      {/* Add Link To View More sButton */}
    </CardFooter>
  </div>
</Card>


  );
};

export default BlogItem;


