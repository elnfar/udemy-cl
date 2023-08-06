'use client'

import Image from "next/image"
import useBasket from "@/hooks/useBasket"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"


interface Props {
    author?:string,
    price?:string,
    imageSrc?:string,
    name?:string,
    description?:string | null
    courseId:any,
    currentUser: User | null
}

export default function Induvidual({
    courseId,
    currentUser
}:Props) {


    const {hasBasket, toggleBasket} = useBasket({
        currentUser,courseId
    })

  return (
    <div>
       
                    <div className="flex flex-col gap-1 mt-4">
                        <Button type='button' className="py-6 rounded-none bg-purple-600 text-white">{currentUser?.stripePurchasedId ? 'Go to course':'Get course now'}</Button>
                        <Button className="py-6 rounded-none bg-purple-600 text-white" onClick={toggleBasket} type='button' >{`${hasBasket ? 'Remove from basket' : 'Add to basket'}`}</Button>
                        <p className="text-[12px] text-white text-center border-t-2 py-2">30 day money back guarantee</p>

                    </div>

    </div>
  )
}