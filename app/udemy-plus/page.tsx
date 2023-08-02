import React from 'react'
import myUser from '../actions/getUser';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createPortal } from 'react-dom';
import { prisma } from '@/lib/prisma';

export default async function UdemyPlus() {

  const user = await myUser()



    async function createCheckoutSession(data:FormData) {

        'use server'


        const user = await myUser();

        // const courses = await prisma.course.findFirst({
            
        // })
        


        const lookup = data.get('lookup_key') as string
        const prices = await stripe.prices.list({
          lookup_keys: [lookup],
          expand: ['data.product']
        })
    
        
        const session = await stripe.checkout.sessions.create({
          billing_address_collection: 'auto',

          line_items: [
            {

              price: "price_1NX2ooFyrvQoPvoHPUDAWbAD",
              // For metered billing, do not pass quantity
              quantity: 1,
      
            },
          ],
          subscription_data: {
            metadata: {
              userId:user?.id as string,
            }
          },
          
          mode: 'subscription',
          success_url: `http://localhost:3000/udemy-plus/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://localhost:3000?canceled=true`,

  
      }) 

 
      
 
  

      console.log('success');
      
  
      console.log(session);
      redirect(session.url || '')

      }


    async function createPortalSession() {
        'use server'
      
      
        console.log(user?.stripePurchasedId);
        
      
        if(!user) {
          throw new Error("no user")
        }

        if(!user?.stripePurchasedId) {
          throw new Error("no user")
        }
      
        const portalSession = await stripe.billingPortal.sessions.create({

          customer: user.stripePurchasedId,
          return_url: `http://localhost:3000/udemy-plus`
        })
      
        console.log(portalSession);
        
         redirect(portalSession.url)
      }

  return (
    <div>

                         <form action={user?.plan === "PRO" ? createPortalSession : createCheckoutSession} className="py-2">
                                {!user?.stripePurchasedId && (
                                    <input type="hidden" name="lookup_key" value="monthly-pro" />
                                )}  
                                <Button type="submit" className="py-6 bg-white text-black rounded-none hover:text-white">
                                        {user?.plan === "PRO" ? 'Manage your subscription' : 'Get pro'}
                                </Button>
                        </form>
    </div>
  )
}
