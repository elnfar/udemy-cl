
import { Video } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'


interface UncCourse {
    id:string
    title:string,
    option:string,
    category:string
    videos:string
}

export default function UncomplishedCourse({title,option,category,videos,id}:UncCourse) {

  const router = useRouter()


  

  return (
    <div>
        <div className=' bg-gray-100 p-4'>
            <h1>{id}</h1>
            <h2>{option}</h2>
            <h3>{title}</h3>
            <p>{category}</p>
            <p>{videos}</p>
        </div>
        <button onClick={() => router.push(`/teach-on-udemy/${id}`)}>Complete</button>
    </div>
  )
}
