import { prisma } from "@/lib/prisma";
import TeachOnUdemy from "../components/(components)/teach-udemy";
import SliderMain from "./home-slider";
import myUser from "./actions/getUser";


const images = [
  "/a.jpg",
  "/b.jpg",
];

export const dynamic = 'force-dynamic' 


export default async function Home() {

  const user = await myUser();



    const courses = await prisma.course.findMany({
       where: {
        userId:user?.id
       },
    })

       
    
    
  return (
    <main>
      <SliderMain images={images}/>
      <div className="flex items-center flex-wrap">
      {courses.map((item) => (
        <TeachOnUdemy id={item.id} key={item.id} item={item} title={item.title} option={item.option} />
      ))}
      </div>  
    </main>
  )
}