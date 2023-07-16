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

    const {option,title,category,videos} = body;

    const course = await prisma.course.create({
        data: {
            option,
            title,
            category,
            videos,
            userId:user.id
        },
    })
    return NextResponse.json(course)
}