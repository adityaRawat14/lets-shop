"use client"
import React from 'react'
import { useParams } from 'next/navigation'
function page() {
  const params=useParams()
  const category=params.category;

  return (
    <div className='h-screen'>
        <h1 className='w-full text-4xl py-5 px-[4rem] font-mono border '>{category}</h1>

        
    </div>
  )
}

export default page