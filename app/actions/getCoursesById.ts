import { prisma } from "@/lib/prisma";

interface IParams {
    courseId:string
}


export default async function getCourseById(
    params:IParams
) {
    try {
        const {courseId} = params

        const course = await prisma.course.findUnique({
            where: {
                id:courseId
            },
        });

        if(!courseId) {
            return null
        }

        if(!course) {
            return null
        }

      return course
        
    }catch(error:any) {
        throw new Error(error);

    }
}
