"use client"
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"} className='text-gray-900 text-lg font-extrabold tracking-wider ' >
      <span className='text-amber-200 font-bold text-2xl' >V</span>
      <span className='text-amber-100 font-bold text-2xl' >oxa</span>
    </Link>
  )
}

export default Logo