import { prisma } from "@/lib/prisma";
import TeachOnUdemy from "./(client)/teac-on-udemy";
import myUser from "@/app/actions/getUser";


export default async function page() {

    const user = await myUser();

    const courses = await prisma.course.findMany({
        where: {
            userId:user?.id
        }
    })

  return (
    <main>

      {courses ? <TeachOnUdemy courses={courses}/> : 'Course not found'}
        
    </main>
  )
}
