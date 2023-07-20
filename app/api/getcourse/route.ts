import myUser from "@/app/actions/getUser";
import { prisma } from "@/lib/prisma";

export async function GET() {

} 

export async function getVideos() {

    const user =  await myUser();

    if(!user) throw new Error('No user found')

    const courses = await prisma.course.findMany({
        where: {
          userId:user?.id  
        }
    })

    const coursesmapped = courses.map((item) => {
        return item.id
    })



    const videos = await prisma.video.findMany({
        where:{
            courseId: {
                in:coursesmapped
            }
        }
    })
    return videos
}

