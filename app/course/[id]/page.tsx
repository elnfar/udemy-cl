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


    async function createCheckoutSession(data:FormData) {

        'use server'


        const lookup = data.get('lookup_key') as string
        const prices = await stripe.prices.list({
          lookup_keys: [lookup],
          expand: ['data.product']
        })
    
        
        const session = await stripe.checkout.sessions.create({
          billing_address_collection: 'auto',

          line_items: [
            {

              price: "price_1NX2ooFyrvQoPvoHPUDAWbAD",
              // For metered billing, do not pass quantity
              quantity: 1,
      
            },
          ],
          subscription_data: {
            metadata: {
              userId:user?.id as string,
              courseId: courses?.id as string,
            }
          },
          
          mode: 'subscription',
          success_url: `http://localhost:3000/course/${params.id}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://localhost:3000?canceled=true`,

  
      }) 

  

      console.log('success');
      
  
      console.log(session);
      redirect(session.url || '')

      }


      async function createPortalSession() {
        'use server'
      
        const user = await myUser()
      
        console.log(user?.stripePurchasedId);
        
      
        if(!user) {
          throw new Error("no user")
        }

        if(!user.stripePurchasedId) {
          throw new Error("no user")
        }
      
        const portalSession = await stripe.billingPortal.sessions.create({

          customer: user?.stripePurchasedId,
          return_url: `http://localhost:3000/course/${params.id}`
        })
      
        console.log(portalSession);
        
         redirect(portalSession.url)
      }
      
 
  return (
    <div>

    <form action={createPortalSession}>
        <Button type="submit">Yearly: $1/month</Button>
      </form>

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

                      <input type="hidden" name="lookup_key" value="monthly-pro" />
                      <Button type="submit" className="py-6 bg-white text-black rounded-none hover:text-white">
                       {user?.stripePurchasedId ? 'Go to course' : 'Get Pro'}
                      </Button>


                        {/* {user?.paid.length === 0 && (
                          'Purchase'
                        )} */}

                        {/* {!singlePaidCoursesContain ? 'Purchase' : 'Go to course'} */}
                        

                      <Button type="button" className="bg-purple-600 text-white rounded-none py-6 hover:normal-case">Add to basket</Button>

                      </div>
                 </form>

                 {/* <form action={createPortalSession}>
                    <Button type="submit">Manage Subscription</Button>
                 </form> */}
                </div>


            </div>
        </div>
    </div>
  )
}

