import { prisma } from "@/lib/prisma"
import myUser from "../actions/getUser"
import TeachOnUdemy from "../../(components)/teach-udemy";


export default async function MyCourses() {

    const user = await myUser();

    const mycourses = await prisma.course.findMany({
        where: {
            userId:user?.id
        },
        include:{
            images:true
        }
    })

  return (
    <div>
        {mycourses.map((item) => (
            <TeachOnUdemy 
            title={item.title}
            option={item.option}
            images={item.images}
            id={item.id}
            key={item.id}
            />
        ))}
    </div>
  )
}
