import { IconNode, VideoIcon } from 'lucide-react'
import React from 'react'

interface BoxProps {
    icon?:any
    label:string
    desc?:string
    onClick:(value:string) => void
    selected?:boolean
}

export default function Box({icon,label,desc,onClick,selected}:BoxProps) {
  return (
    <div onClick={() => onClick(label)} className={`w-[245px] h-[270px] border-2 border-black cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}>
        <div className=' flex flex-col items-center text-center justify-center h-[inherit]'>
            {icon}
            <h1 className='text-sm py-2'>{label}</h1>
            <p className=' text-neutral-500 p-4 text-sm'>{desc}</p>
        </div>
    </div>
  )
}


