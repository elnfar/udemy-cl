import myUser from '@/app/actions/getUser'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_b7634496bf770c89b7eea11cd3f444b665da5375bdc9c890c43556baa74d5b17'

export async function POST(req: NextRequest) {
  console.log('webhook received')


  const user = await myUser()

  let event: Stripe.Event | undefined
  try {
    const signature = req.headers.get('stripe-signature') || ''
    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      ENDPOINT_SECRET
    )
  } catch (err: any) {
    console.log(`⚠️ Webhook signature verification failed.`, err.message)
    return new NextResponse(JSON.stringify({ error: 'invalid payload' }), {
      status: 400
    })
  }

  console.log('Event', event)


     if(event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      // Save an order in your database, marked as 'awaiting payment'



        console.log('completed');
        
        await prisma.user.update({
          where: {
            id: subscription.metadata.userId
          },
          data: {
            subsciptionEnds:subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null,
          },
        })        


    }
    
    

  return NextResponse.json({ received: true })
  }