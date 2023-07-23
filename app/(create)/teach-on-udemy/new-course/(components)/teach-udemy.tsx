'use client'

import { Course, Images } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'



type TeachOnUdemy = {
    title:string,
    images: Images[],
    option:string
    id:string
}

export default function TeachOnUdemy({title,id,images,option}:TeachOnUdemy) {

    const router = useRouter()


  return (
    <div className='py-4 cursor-pointer' onClick={() => router.push(`/${id}`)}>

        <div className='mx-4 p-4'>
            <div className='w-[300px]'>
            {images.map((item) => (
                <img src={item.url} key={item.id} alt={item.url} className='h-[173px] w-[300px] object-cover border-4 border-yellow-300'/>
            ))}
            </div>
            <p>{title}</p>
            <p>{option}</p>
        </div>
    </div>
  )
}