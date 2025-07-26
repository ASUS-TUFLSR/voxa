import React from 'react'
import Image from 'next/image'

const HomeSection = () => {
  return (
    <section className='w-full my-4' >
        <div className='w-full flex xs:flex-col md:flex-row justify-center items-center' >
            <div className='p-8 w-3/4 flex flex-col gap-3' >
              <p className='tracking-wide lg:text-6xl md:text-4xl xs:text-3xl font-semibold md:w-3/4 xs:4/4 text-start text-gray-700'>
                Lets Learn and Grow Together
              </p>
              <p className='tracking my-2 md:text-2xl xs:text-md md:w-3/4 xs:w-full font-semibold text-start text-gray-900' >
                 Learn not only theoritically but by physically
              </p>
            </div>
            <div className='md:w-2/4 xs:w-3/4 md:mx-2 xs:my-2' >
                <Image className="w-full rounded-2xl drop-shadow-2xl" alt='Carousel Image' width={300} height={200} 
                 src={"https://images.unsplash.com/photo-1556761175-b413da4baf72"}
                />
            </div>
        </div>
    </section>
  )
}

export default HomeSection