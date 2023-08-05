import { prisma } from '@/lib/prisma'
import { useParams } from 'next/navigation'
import React from 'react'
import CompleteClient from './complete/complete-client'
import getCourseById from '../../actions/getCoursesById'

interface IParams {
  courseId:string,
}
export default async function page({params} : {params:IParams}) {


  const courses = await getCourseById(params)
  console.log('this is params from page[courseId]',params);
  
  return (
    <div>
      <CompleteClient courseId={courses?.id} params={params}/>
    </div>
  )
}