import { prisma } from "@/lib/prisma"
import { getVideos } from "./api/getcourse/route"
import { Video,Images } from "@prisma/client"


interface UncCourse {
    id:string
    title:string,
    option:string,
    category:string
    img: Images[]
    videos:Video[]
}

export default async function UncomplishedCourse({id,title,img,option,category,videos}:UncCourse){


  // const videos = await prisma.video.findMany({
  //   where: {
  //     courseId:id,
  //   },
  // })


    

  return (
    <div>
        <div className=' bg-gray-100 p-4'>
          {title}



          {videos?.map((item) => (
            <video src={item.url} loop autoPlay muted></video>
          ))}
          

          {img.map((item) => (
              <img src={item.url || ''} alt="Image" />
          ))}
       
        </div>
        <button>Complete</button>
    </div>
  )
}
