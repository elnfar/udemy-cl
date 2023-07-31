import myUser from '@/app/actions/getUser'
import { metadata } from '@/app/layout'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: NextRequest,{params}:{params:{id:string}}) {
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


  switch (event.type) {
    case 'payment_intent.succeeded': {
      const session = event.data.object as Stripe.PaymentIntent;
      // Save an order in your database, marked as 'awaiting payment'


      console.log(session);
      
        console.log('completed');
        

     
        
      // Check if the order is paid (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.


      break;
    }
    }

  return NextResponse.json({ received: true })
  }