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

    const {option,title,category,videos,images,language,description} = body;


   const imageUrls = images.map((img:any) => img.fileUrl)
   console.log(imageUrls);
   
    const videodeoUrls = videos.map((vid:any) => vid.fileUrl);
    console.log(videodeoUrls);
    
    console.log(body);
    
    const course = await prisma.course.create({
        data: {
            option,
            title,
            language,
            description,
            category,
            images:imageUrls,
            videos:videodeoUrls,
            userId:user.id
        },
    })
    console.log(course);
    console.log(body);

    return NextResponse.json(course)
}

// 