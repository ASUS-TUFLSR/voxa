"use client"
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"} className='text-gray-900 text-lg font-extrabold tracking-wider ' >
      <span className='text-violet-900 font-bold text-2xl' >V</span>
      {"oxa"}
    </Link>
  )
}

export default Logo