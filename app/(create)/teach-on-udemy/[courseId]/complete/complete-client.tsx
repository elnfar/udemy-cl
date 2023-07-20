'use client'

import Box from '@/components/box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Course } from '@prisma/client'
import { UploadButton } from '@/lib/uploadthings'
import axios from 'axios'
import { Text, VideoIcon } from 'lucide-react'
import {useParams, useRouter} from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'



const initialValues = {
    videos:[]
}

type Pp = {
  courseId:string
}

export default function CompleteClient({courseId,params}:any) {

    const [state,setState] = useState(initialValues)
    const [videos,setVideos] = useState<{
      fileUrl: string;
      fileKey: string;
  }[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();


  console.log('this is params',params);
  

    const onSubmit = (e:any) => {

        e.preventDefault();

        setIsLoading(true)
        axios.put(`/api/${courseId}`, videos)
        .then(() => {
          toast.success('Course created successfully')
          router.push('/teach-on-udemy')
        })
        .catch((err) => {
          throw new Error(err)
        })
        .finally(() => {
            setIsLoading(false)
        })

    }

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({...state, [event.target.name]: event.target.value})
    }
  
  return (
    <div className='flex items-center justify-center h-[90vh] flex-col gap-2'>



    </div>
  )
    }
