import { prisma } from "@/lib/prisma"
import VideoComponent from "./videos"


export default async function SingleCourse({params}:{params:{id:string}}) {
  
    const courses = await prisma.course.findFirst({
        where: {
            id: params.id
        },
        include: {
            videos:true
        }
    })

  return (
    <div>
        {courses?.videos.map((item) => (
            <VideoComponent url={item.url}/>
        ))}
    </div>
  )
}
