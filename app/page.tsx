import { prisma } from "@/lib/prisma";
import myUser from "./actions/getUser";
import UncomplishedCourse from "@/app/uncomplished-course";
import TeachOnUdemy from "./(create)/teach-on-udemy/new-course/(components)/teach-udemy";



export default async function Home() {


  const user = await myUser();



    const courses = await prisma.course.findMany({
        include: {
          videos:true,
          images:true
        },
        
    })

  return (
    <main className="flex items-center flex-wrap">
      {courses.map((item) => (
        <TeachOnUdemy images={item.images} title={item.title} option={item.option} />
      ))}

    </main>
  )
}
