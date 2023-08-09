'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'



type TeachOnUdemy = {
    title:string,
    option:string
    id:string,
    item:any
}

export default function SingleCourseView({title,id,option,item}:TeachOnUdemy) {

    const router = useRouter()


 
  return (
    <div className='shadow-sm shadow-neutral-700'>
            <div className=' border-neutral-400'>
              <Image src={item.images[0]} width={500} height={300} alt="Image" className='w-[550px] h-[250px] object-cover opacity-50'/>
            </div>
            <div className='p-4'>
              <p className='text-[1.2rem] font-extrabold font-serif'>{title}</p>
              <p className=' text-neutral-400'>{option}</p>
            </div>
            <div className='pb-4 px-6 text-end' onClick={() => router.push(`/course/${id}`)}>
              <Button variant="secondary" className='w-[140px]'>View</Button>
            </div>
    </div>
  )
}