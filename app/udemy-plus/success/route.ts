import myUser from '@/app/actions/getUser'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic' 

export async function GET(req: NextRequest) {
  const user = await myUser()
  const session_id = req.nextUrl.searchParams.get('session_id')
  if (!session_id) {
    redirect('/error')
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
  const customerId = checkoutSession.customer as string

  console.log(customerId);
  

  await prisma.user.update({
    where: { 
        id: user?.id 
    },
    data: {
      stripePurchasedId: customerId,
      subsciptionEnds:null,
      plan:'PRO'
    }
  })


  redirect(`/`)
}