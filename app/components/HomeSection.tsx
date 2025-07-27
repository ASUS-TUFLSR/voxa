import React from 'react';
import Image from 'next/image';

const HomeSection = () => {
  return (
    <section className="w-full my-8 px-4">
      <div className="w-full flex flex-col md:flex-row justify-center items-center max-w-6xl mx-auto gap-8">
        {/* Text Section */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <p className="tracking-wide text-balance text-3xl sm:text-4xl lg:text-6xl font-semibold text-start text-gray-700 leading-tight">
            Lets Learn and Grow Together
          </p>
          <p className="text-md sm:text-lg md:text-2xl font-medium text-start text-gray-900">
            Learn not only theoretically but by practically experiencing it.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
        <div className='w-3/4 sm:w-2/3 md:w-full' >
             <Image
            className="w-full h-auto rounded-2xl shadow-xl"
            alt="Learning Image"
            width={600}
            height={400}
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
          />
        </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
