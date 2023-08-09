import { prisma } from "@/lib/prisma";
import myUser from "./getUser";



export default async function getCoursesForCurrentUser() {


    const user = await myUser();

    const courses = await prisma.course.findMany({
        where: {
            userId: user?.id
        }
    })

    return courses

}