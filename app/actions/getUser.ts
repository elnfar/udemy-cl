import { getServerSession } from "next-auth";
import {prisma} from '../../lib/prisma'



export async function getSession() {
    return await getServerSession()
}


export default async function myUser() {
    try {
        const session = await getSession();


        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            },
        })


    if (!currentUser) {
        return null;
      }

      return currentUser

    }catch(error:any) {
        throw new Error(error)
    }


}