"use client"
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"} className='text-gray-900 text-lg font-extrabold tracking-wider ' >
      <span className='text-amber-100 font-bold text-2xl' >Voxa</span>
    </Link>
  )
}

export default Logo