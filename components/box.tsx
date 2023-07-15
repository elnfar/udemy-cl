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
    <div onClick={() => onClick(label)} className={`w-[275px] h-[300px] border-2 border-black cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}>
        <div className=' flex flex-col items-center text-center justify-center h-[inherit]'>
            {icon}
            {/* <VideoIcon className='mb-4  w-12 h-12'/> */}
            <h1>{label}</h1>
            <p>{desc}</p>
        </div>
    </div>
  )
}


