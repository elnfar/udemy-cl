import { NextResponse } from "next/server"
import {prisma} from '@/lib/prisma'
import myUser from "@/app/actions/getUser"

interface IParams {
    courseId?:string
}

export async function PUT( 
    request: Request, 
    {params}:{params:IParams}    
) {
    const {courseId} = params
    const body = await request.json()
    const {videos} = body;
    const currentUser = await myUser()


    if(!currentUser) {
        return NextResponse.error()
    }



    if(!courseId || typeof courseId !== 'string') {
        throw new Error('Invalid Id')
    }

    const updated = await prisma.course.update({
        where: {
            id: courseId,
        },
        data:{
            videos
        },
        select:videos
    })

    return NextResponse.json(updated)

}