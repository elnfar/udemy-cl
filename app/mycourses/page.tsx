import { prisma } from "@/lib/prisma"
import myUser from "../actions/getUser"
import TeachOnUdemy from "../../components/create-course/teach-udemy";
import getCoursesForCurrentUser from "../actions/getCurrentUserCourses";


export const dynamic = 'force-dynamic' 

export default async function MyCourses() {

    const user = await myUser();

    const mycourses = await getCoursesForCurrentUser();

  return (
    <div>
        {mycourses.length < 1 && (
            <h1>No course there</h1>
        )}
        
        {mycourses.map((item) => (
            <TeachOnUdemy 
            item={item}
            title={item.title}
            option={item.option}
            id={item.id}
            key={item.id}
            />
        ))}
    </div>
  )
}
