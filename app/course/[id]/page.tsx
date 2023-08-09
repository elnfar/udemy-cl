import { prisma } from "@/lib/prisma"

import Induvidual from "../component"
import myUser from "@/app/actions/getUser"
import Image from "next/image";





export default async function SingleCourse({params}:{params:{id:string}}) {
  

    const user = await myUser();


  const courses = await prisma.course.findFirst({
    where: {
        id: params.id
    },
})

  
 
  return (
    <div>


        <div className="bg-zinc-900 text-white">
         <div className="h-[45vh]  flex justify-between items-center mx-auto max-w-[1300px] py-8">
                <div className="flex flex-col gap-2">
                    <span className="text-purple-400 text-sm">{courses?.category}</span>

                    <div className="max-w-[700px] space-y-6">
                        <h1 className="text-4xl font-extrabold">{courses?.title}</h1>
                        <span className="text-neutral-500 font-semibold text-sm">{courses?.description}</span>
                        
                        <div className="space-x-4">
                            <span>{courses?.createdAt.toLocaleString()}</span>
                            <span>{courses?.language}</span>
                        </div>
                    </div>
                </div>


              <div className=" flex flex-col">
                {/* <div className="border">
                    {courses?.videos.map((item) => (
                       <VideoComponent url={item}/>
                    ))}
                 </div> */}

                      {courses?.images.map((item) => (
                        <Image width={400} height={300} className="object-cover border-white border-4" src={item} alt="" />
                      ))}


                    <Induvidual
                    path={user?.stripePurchasedId ? `/course/${params.id}/access` :'/udemy-plus'}
                    courseId={params.id}
                    currentUser={user}
                    />
                    

                </div>


            </div>
        </div>
    </div>
  )
}





