"use client"
import Link from 'next/link'
import React from 'react'


const Logo2 = () => {

  return (
    <Link href={"/"} className='text-gray-900 text-lg font-extrabold tracking-wider ' >
      <span className='text-red-800 font-bold text-4xl' >Voxa</span>
    </Link>
  )
}

export default Logo2