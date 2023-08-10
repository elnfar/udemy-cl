

import { prisma } from '@/lib/prisma';
import AccessClient from './acess-client';
import getCourseById from '@/app/actions/getCoursesById';

export default async  function page({params}:{params:{id:string}}) {

    const course = await prisma.course.findUnique({
        where: {
            id: params.id
        }
    })


      if(!course) {
        return "No course under this id and you cant access it!"
      }


        const mappedVideos = course?.videos || []; 
        const allVideosLength = course?.videos.length



  return (
    <div>
      <div className='flex justify-center py-2'>
          <div>
            <h1 className='text-[2.3rem]'>{course?.title}  |  {course.videos.length} videos available</h1>
              <AccessClient mappedVideos={mappedVideos} allVideosLength={allVideosLength || 0} />
          </div>
        </div>
    </div>
  )
}