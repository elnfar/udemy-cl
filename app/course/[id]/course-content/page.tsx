import { prisma } from "@/lib/prisma";

export default async function page({params}:{params:{id:string}}) {

    const course = await prisma.course.findUnique({
        where: {
            id:params.id
        }
    })

  return (
    <div>

        {course?.title}
    </div>
  )
}
