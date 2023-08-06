import { prisma } from "@/lib/prisma";
import myUser from "@/app/actions/getUser";
import TeachOnUdemy from "../../components/(components)/teach-udemy";
import { ComboboxDemo } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = 'force-dynamic' 

export default async function page() {

    const user = await myUser();



    const courses = await prisma.course.findMany({
        where: {
            userId:user?.id,
        },
    })

  

  return (
    <div>
       <div className='container py-4 flex justify-between items-center'>
        <div>
            <ComboboxDemo/>
        </div>

        <div>   
            <Button className=' rounded-none h-12 bg-purple-500'>
                  <Link href='/new-course'>New Course</Link>
            </Button>
        </div>



        </div>  

    <div className="container p-12">
          <h1 className="mx-4 text-3xl">Your courses as an instructor</h1>

            {courses.map((item) => (
                <TeachOnUdemy 
                id={item.id}
                option={item.option}
                title={item.title}
                key={item.id}
                />
            ))}
      </div>
    </div>
  )
}
