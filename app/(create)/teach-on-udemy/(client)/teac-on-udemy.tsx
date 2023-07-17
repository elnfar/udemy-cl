'use client'

import UncomplishedCourse from '@/components/course/uncomplished-course'
import { Button } from '@/components/ui/button'
import { ComboboxDemo } from '@/components/ui/dropdown'
import { Input } from '@/components/ui/input'
import { Course,Video } from '@prisma/client'
import { SearchIcon } from 'lucide-react'
import {useRouter} from 'next/navigation'


interface CourseType {
   courses:Course[]
}

const TeachOnUdemy = ({courses}:CourseType) => {

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

        <div className='flex items-center flex-col'>
            {courses.map(({title,category,option,id,videos}) => (
                <UncomplishedCourse
                title={title}
                category={category}
                option={option}
                id={id}
                videos={videos}
                />
            ))}
        </div>
    </section>
  )
}

export default TeachOnUdemy