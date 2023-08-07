'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'



type TeachOnUdemy = {
    title:string,
    option:string
    id:string,
    item:any
}

export default function TeachOnUdemy({title,id,option,item}:TeachOnUdemy) {

    const router = useRouter()

console.log(item);

 
  return (
    <div className='py-4 cursor-pointer' onClick={() => router.push(`/course/${id}`)}>

        <div className='mx-4 p-4'>
            <div className='w-[250px]'>
              <img src={item.images} alt="" />
            </div>


            <p>{title}</p>
            <p>{option}</p>
        </div>
    </div>
  )
}