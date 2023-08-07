import { prisma } from '@/lib/prisma'
import React from 'react'
import VideoComponent from '../videos'

export default async  function page({params}:{params:{id:string}}) {

    const course = await prisma.course.findUnique({
        where: {
            id: params.id
        }
    })
        console.log(course?.videos);
        
  return (
    <div>

      <div className='flex'>

        <div>

              <VideoComponent url={course?.videos[0]} big/>

        </div>


        <div className='w-[444px] flex flex-col'>
          {course?.videos.map((_,index) => (
              <button className='py-6 bg-neutral-300 border-2 px-2 w-full text-start'>
                  Content {index+1}
              </button>
          ))}
        </div>


        </div>
    </div>
  )
}
