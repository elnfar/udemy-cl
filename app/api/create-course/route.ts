import myUser from "@/app/actions/getUser";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST (
    req:Request
) {
    const user = await myUser();

    if(!user) {
        throw new Error('Not authenticated')
    }
    const body = await req.json();

    const {option,title,category,videos,images} = body;

    const imgData = images.map((url:string) => ({url}));
    const videosData = videos.map((url: string) => ({ url }));

    const course = await prisma.course.create({
        data: {
            option,
            title,
                 
            category,
            images:{
                create:imgData
            },
            videos:{
                create:videosData
            },
        
            userId:user.id
        },
        select: {
            id:true,
            videos:true,
            images:true
        },
    })
    console.log(course);
    
    return NextResponse.json(course)
}

// 