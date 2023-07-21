import { prisma } from "@/lib/prisma";
import myUser from "@/app/actions/getUser";
import TeachOnUdemy from "./new-course/(components)/teach-udemy";
import { ComboboxDemo } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function page() {

    const user = await myUser();



    const courses = await prisma.course.findMany({
        where: {
            userId:user?.id,
        },
        include:{
          videos:true,
          images:true
        }
        
    })

  

  return (
    <div>
       <div className='container py-4 flex justify-between items-center'>
        <div>
            <ComboboxDemo/>
        </div>

        <div>   
            <Button className=' rounded-none h-12 bg-purple-500'>
                  <Link href='/teach-on-udemy/new-course'>New Course</Link>
            </Button>
        </div>



        </div>

            {courses.map((item) => (
                <TeachOnUdemy 
                images={item.images}
                option={item.option}
                title={item.title}
                />
            ))}
    </div>
  )
}
