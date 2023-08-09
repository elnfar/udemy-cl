import { prisma } from '@/lib/prisma'
import React from 'react'
import VideoComponent from '../videos'
import AccessClient from './acess-client';

export default async  function page({params}:{params:{id:string}}) {

    const course = await prisma.course.findUnique({
        where: {
            id: params.id
        }
    })



        const mappedVideos = course?.videos || []; // Make sure videos is an array even if it's undefined

        const allVideosLength = course?.videos.length

        console.log();
        

  return (
    <div>
      <div className='flex justify-center py-2'>
          <div>
            {/* {mappedVideos.map((item) => ( */}
              <AccessClient mappedVideos={mappedVideos} allVideosLength={allVideosLength || 0}/>
            {/* ))} */}
          </div>
        </div>
    </div>
  )
}
