import React from 'react'
import NewCourse from '../../../../(components)/create-course-form'
import { prisma } from '@/lib/prisma'
import myUser from '@/app/actions/getUser'

export default async function page() {

  const user = await myUser()
  const course = await prisma.course.findFirst({
    where: {
      userId:user?.id
    }
  })


  return (
    <div>
      <NewCourse />
    </div>
  )
}
