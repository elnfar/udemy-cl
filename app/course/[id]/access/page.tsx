import { prisma } from '@/lib/prisma'
import React from 'react'
import VideoComponent from '../videos'

export default async  function page({params}:{params:{id:string}}) {

    const course = await prisma.course.findUnique({
        where: {
            id: params.id
        }
    })

    
    
  return (
    <div className='flex'>

        <div className='w-full'>
               <VideoComponent url={course?.videos[0]} big/>
        </div>
        



        <div className='w-[500px] space-y-4'>
            <div className='border-2 border-purple-400 bg-neutral-300 py-4'>
                <button>Content</button>
            </div>

            <div className='border-2 bg-neutral-300 py-4'>
                <button>Content 2</button>
            </div>
        </div>


    </div>
  )
}
