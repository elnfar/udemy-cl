'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'



type TeachOnUdemy = {
    title:string,
    option:string
    id:string
}

export default function TeachOnUdemy({title,id,option}:TeachOnUdemy) {

    const router = useRouter()


  return (
    <div className='py-4 cursor-pointer' onClick={() => router.push(`/course/${id}`)}>

        <div className='mx-4 p-4'>
            <div className='w-[250px]'>
            {/* {images.map((item) => (
                <Image src={item.url} width={300} height={80} key={item.id} alt={item.url} className='h-[150px] w-[655px]  object-cover border-4 border-yellow-300'/>
            ))} */}
            </div>
            <p>{title}</p>
            <p>{option}</p>
        </div>
    </div>
  )
}