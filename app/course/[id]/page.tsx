import { prisma } from "@/lib/prisma"
import VideoComponent from "./videos"
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import myUser from "../../actions/getUser";
import { getServerSession } from "next-auth";
import Link from "next/link";



export default async function SingleCourse({params}:{params:{id:string}}) {
  
  const user = await myUser();

  const courses = await prisma.course.findFirst({
    where: {
        id: params.id
    },
    include: {
        videos:true,
    }
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
                        <VideoComponent url={item.url} key={item.id}/>
                    ))}
                 </div>

                      

                      <div className="flex flex-col gap-1 py-2">
                      
                      <Button type="button" className="bg-purple-600 text-white hover:border rounded-none py-6 hover:normal-case">{user?.plan === "PRO" ? 'Go to course':'Get Pro'}</Button>
                      <Button type="button" className="bg-white border text-black hover:text-white rounded-none py-6 hover:normal-case">Add to basket</Button>

                      </div>
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

