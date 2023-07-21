import { Button } from '@/components/ui/button'
import { ComboboxDemo } from '@/components/ui/dropdown'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Course, Images } from '@prisma/client'
import Link from 'next/link'



type TeachOnUdemy = {
    title:string,
    images: Images[],
    option:string
}

export default function TeachOnUdemy({title,images,option}:TeachOnUdemy) {
  return (
    <div className='py-4'>

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
