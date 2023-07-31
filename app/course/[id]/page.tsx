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


  // const course = await prisma.course.findUnique({
  //   where:{
  //     id:params.id
  //   }
  // })

    async function createCheckoutSession(data:FormData) {

        'use server'

        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: 'price_1NX91qFyrvQoPvoH00dsqw6g',
              // For metered billing, do not pass quantity
              quantity: 1,
      
            },
          ],

          payment_intent_data: {
            metadata: {
              userId:user?.id as string,
              courseId: courses?.id as string
            }
          },
          
          mode: 'payment',
          success_url: `http://localhost:3000/course/${params.id}?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://localhost:3000?canceled=true`,

  
      }) 


      // await prisma.course.update({
      //   where: {
      //     id:params.id
      //   },
      //   data: {
      //     productId:user?.id
      //   }
      // })

      console.log('success');
      
  
      console.log(session);
      redirect(session.url || '')

      }
    
    // console.log(user);
    // console.log(courses?.id);
    
    // console.log(user?.paid);



    const singlePaidCoursesContain = user?.paid.some(obj => obj.courseId === courses?.id)

    console.log(singlePaidCoursesContain);
    
 
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
                        <VideoComponent url={item.url}/>
                    ))}
                 </div>

                 <form action={createCheckoutSession} className="py-2">
                      

                      <div className="flex flex-col gap-2 ">


                        {!singlePaidCoursesContain ? (
                      <Button type="submit" className="py-6 bg-white text-black rounded-none hover:text-white">
                        Purchase
                      </Button>
                        ): (
                          <Link className="bg-purple-600 w-full py-4 text-center" href={`${params.id}/course-content`}>Go to course</Link>
                        )}

                        {/* {user?.paid.length === 0 && (
                          'Purchase'
                        )} */}

                        {/* {!singlePaidCoursesContain ? 'Purchase' : 'Go to course'} */}
                        

                      <Button type="button" className="bg-purple-600 text-white rounded-none py-6 hover:normal-case">Add to Cart</Button>

                      </div>
                 </form>
                </div>
            </div>
        </div>
    </div>
  )
}
