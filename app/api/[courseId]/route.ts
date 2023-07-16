import myUser from "@/app/actions/getUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IParams {
    courseId?:string
}


export async function PUT( 
    req:Request,
    {params}:{params: IParams}
) {
    const user = await myUser();

    const {courseId} = params

    
    if(!user) {
        throw new Error('Not authenticated')
    }

    const body = await req.json();

    const {videos} = body;

   const updated = await prisma.course.update({
      where: {
        id:params.courseId
      },
      data: {
        videos: {
            videos
        }
      },
      select: {
        id:true,
        videos:true
      }
    })

    console.log('courseId',courseId);
    

    return NextResponse.json(updated)
}
   