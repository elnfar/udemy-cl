import { prisma } from "@/lib/prisma";
import CompleteClient from "./complete-client";
import getCourseById from "@/app/actions/getCoursesById";


interface IParams {
  courseId:string,
}



export default async function Complete({params} : {params:IParams}) {

  const courses = await getCourseById(params)

  return (
    <div>
        <CompleteClient courseId={courses?.id}/>
    </div>
  )
}
