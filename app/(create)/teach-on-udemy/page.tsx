import { prisma } from "@/lib/prisma";
import myUser from "@/app/actions/getUser";


export default async function page() {

    const user = await myUser();



    const courses = await prisma.course.findMany({
        where: {
            userId:user?.id,
        },
        
    })

    console.log(courses);
    
    
  //   const videos = await prisma.video.findMany({
  //     where: {
  //         id:{
  //           in: 
  //         }
  //     },
      
  // })
  

  return (
    <main>


        
    </main>
  )
}
