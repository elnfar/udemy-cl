import SingleCourseView from "../components/create-course/teach-udemy";
import getAllCourses from "./actions/getAllCourses";


interface HomeProps {
  searchParams:string
}
export const dynamic = 'force-dynamic'


export default async function Home({searchParams}:HomeProps) {


  const courses = await getAllCourses(searchParams);
    
    
  return (
    <main>
      <div className="grid grid-cols-3 gap-3 container py-12">
      {courses.map((item) => (
        <SingleCourseView id={item.id} key={item.id} item={item} title={item.title} option={item.option} />
      ))}
      </div>  
    </main>
  )
}