import { prisma } from "@/lib/prisma";
import myUser from "./actions/getUser";
import UncomplishedCourse from "@/app/uncomplished-course";



export default async function Home() {


  const user = await myUser();



    const courses = await prisma.course.findMany({
        where: {
            userId:user?.id,
        },
        
    })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {courses.map((item) => (
      <UncomplishedCourse img={''} id={item.id} title={item.title} option={item.option} category={item.category} />
      ))}

    </main>
  )
}
