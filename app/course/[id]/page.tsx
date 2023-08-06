import { prisma } from "@/lib/prisma"
import VideoComponent from "./videos"
import Induvidual from "../component"
import myUser from "@/app/actions/getUser"





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
                <div className="border">
                    {courses?.videos.map((item) => (
                       <VideoComponent url={item}/>
                    ))}
                 </div>


                    <Induvidual
                    path={user?.stripePurchasedId ? `/course/${params.id}/access` :'/udemy-plus'}
                    courseId={params.id}
                    currentUser={user}
                    />
                    
                 {/* </form> */}

                 {/* <form action={createPortalSession}>
                    <Button type="submit">Manage Subscription</Button>
                 </form> */}
                </div>


            </div>
        </div>
    </div>
  )
}





