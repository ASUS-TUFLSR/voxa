import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogItemType } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = BlogItemType;

const BlogItem = (props: Props) => {
  const plainText = props.description.replace(/<[^>]+>/g, "");
  const truncated = plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;

  return (
    <Card
      className="relative border-2 border-red-800/30 
           w-full max-w-[600px] mx-4 my-6 rounded-2xl shadow-md 
           hover:shadow-2xl overflow-hidden transition-all 
           duration-500 hover:-translate-y-2
           bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]
           bg-repeat bg-amber-50"
    >
      {/* Subtle glowing highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-200/10 to-transparent pointer-events-none"></div>

      {/* Image */}
      <CardHeader className="p-0">
        <Image
  width={600}
  height={200}
  className="h-48 w-full object-cover rounded-t-2xl"
  alt={`Blog cover image for ${props.title}`}
  src={props.imageUrl}
  loading="lazy"
/>
      </CardHeader>

      {/* Content */}
      <div className="flex flex-col flex-1 relative z-10">
        <CardTitle className="px-5 pt-4 font-serif font-bold text-2xl text-red-900">
          {props.title}
        </CardTitle>

        {/* Metadata */}
        <p className="px-5 text-xs text-gray-600 italic mb-2">
          ✍️ By {props.userId} · 📅 {new Date(props.createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
})}
        </p>

        <CardContent className="px-5 flex-1">
          <p className="tracking-wide text-gray-700 leading-relaxed">
            {truncated}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-5 pb-5 mt-auto">
          
          <Link
            href={`/blogs/view/${props.id}`}
            className="ml-auto px-4 py-2 rounded-md text-sm font-medium
                       border border-red-700 bg-red-700 text-amber-50
                       hover:bg-red-800 hover:border-red-800 hover:scale-105
                       transition-all duration-300 shadow-sm"
          >
            Read More →
          </Link>
          { props.isProfile && (<Link
            href={`/blogs/edit/${props.id}`}
            className="ml-auto px-4 py-2 rounded-md text-sm font-medium
                       border border-red-700 bg-red-700 text-amber-50
                       hover:bg-red-800 hover:border-red-800 hover:scale-105
                       transition-all duration-300 shadow-sm"
          >
            Edit →
          </Link>)}
          
        </CardFooter>
      </div>
    </Card>
  );
};

export default BlogItem;
