import { prisma } from "@/lib/prisma";
import myUser from "./actions/getUser";
import TeachOnUdemy from "../(components)/teach-udemy";
import SliderMain from "./home-slider";

const images = [
  "/a.jpg",
  "/b.jpg",
];


export default async function Home() {


  const user = await myUser();



    const courses = await prisma.course.findMany({
        include: {
          videos:true,
          images:true
        },
        
    })

  return (
    <main>
      <SliderMain images={images}/>
      <div className="flex items-center flex-wrap">
      {courses.map((item) => (
        <TeachOnUdemy id={item.id} key={item.id} images={item.images} title={item.title} option={item.option} />
      ))}
      </div>  
    </main>
  )
}