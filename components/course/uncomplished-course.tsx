
import { useRouter } from 'next/navigation'
import React from 'react'


interface UncCourse {
    id:string
    title:string,
    option:string,
    category:string
    videos:string | Object | null
}

export default function UncomplishedCourse({title,option,videos,category,id}:UncCourse) {

  const router = useRouter()


  console.log(videos);
  

  return (
    <div>
        <div className=' bg-gray-100 p-4'>
            <h1>{id}</h1>
            <h2>{option}</h2>
            <h3>{title}</h3>
            <p>{category}</p>
            <p>{JSON.stringify(videos === null ? undefined : videos)}</p>
        </div>
        <button onClick={() => router.push(`/teach-on-udemy/new-course/${id}/complete`)}>Complete</button>
    </div>
  )
}
