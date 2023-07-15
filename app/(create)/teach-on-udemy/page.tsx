'use client'

import { Button } from '@/components/ui/button'
import { ComboboxDemo } from '@/components/ui/dropdown'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import {useRouter} from 'next/navigation'


export default function TeachOnUdemy() {

    const router = useRouter()

  return (
    <section>
        <h1>Courses</h1>

        <div>
            <div className='flex items-center container'>
                     <div className='flex items-center'>
                        <Input className='w-[200px] h-12 border-2 border-black rounded-none' placeholder='Search your courses '/>
                        <Button className='h-12 rounded-none'><SearchIcon/></Button>
                     </div>
                    <div className='ml-4'>
                        <ComboboxDemo/>
                    </div>
                    <div className='ml-auto'>
                        <Button className='bg-purple-600 rounded-none py-6' onClick={() => router.push('/teach-on-udemy/new-course')}>New Course</Button>
                    </div>
            </div>
        </div>
    </section>
  )
}
