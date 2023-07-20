import { prisma } from "@/lib/prisma"
import { getVideos } from "./api/getcourse/route"


interface UncCourse {
    id:string
    title:string,
    option:string,
    category:string
    img:string | null
}

export default async function UncomplishedCourse({id,title,img,option,category}:UncCourse){


  const videos = await prisma.video.findMany({
    where: {
      courseId:id,
    },
  })


    

  return (
    <div>
        <div className=' bg-gray-100 p-4'>
          {title}

          <img src={img || ''} alt="Image" />
          <p>{videos?.map((item) => (
            <video src={item.url} loop autoPlay muted></video>
          ))}</p>
          
        </div>
        <button>Complete</button>
    </div>
  )
}
