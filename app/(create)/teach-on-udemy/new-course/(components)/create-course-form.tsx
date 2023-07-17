'use client'

import Box from '@/components/box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Course,Video } from '@prisma/client'
import axios from 'axios'
import { Text, VideoIcon } from 'lucide-react'
import {useParams, useRouter} from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

enum STEPS {
    OPTION = 0,
    TITLE = 1,
    CATEGORY = 2,
    CONTENT = 3,

  }
  

export const categories = [
    {
      label: 'Course',
      icon:<VideoIcon/>,
      description: 'Create rich learning experiences with the help of video lectures, quizzes, coding exercises, etc.',
    },
    {
      label: 'Practise Test',
      icon:<Text/>,
      description: 'Help students prepare for certification exams by providing practice questions.',
    },
    
  ]

  export const dropdownItems = [
    {
      label: 'Design',
    },
    {
      label: 'Marketing',
    },
    {
        label: 'Development',
      },
      {
        label: 'Finance',
      },
      {
        label: 'Film-making',
      },
    
  ]
  
  
  type Ival = {
    option:string,
    title:string,
    category:string,
    videos:string[]
  }

const initialValues:Ival = {
    option:'',
    title:'',
    category:'',
    videos:[]
}

export default function NewCourse({course}:any) {

    const [state,setState] = useState(initialValues)
    const [isLoading, setIsLoading] = useState(false)
    const [steps,setSteps] = useState(STEPS.OPTION)
    const router = useRouter();
    const params = useParams()

    const onNext = () => {
        setSteps((value) => value + 1)
    }

    const onBack = () => {
        setSteps((value) => value - 1)
    }


    const onSubmit = () => {
        if(steps !== STEPS.CONTENT) {
            return onNext()
        }
        console.log(state);
        setIsLoading(true)
        axios.post('/api/create-course', state)
        
        .then(() => {
          toast.success('Course created successfully')
          router.push('/teach-on-udemy')
        })
        .catch((err) => {
          throw new Error(err)
        })
        .finally(() => {
            setIsLoading(false)
            console.log(state);
     
        })
        console.log(state);
    }

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target;
      if (name === 'videos') {
        setState((prevState) => ({
          ...prevState,
          videos: value.split(',').map((url) => url.trim())
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          [name]: value
        }));
      }
    }
    
if (steps === STEPS.OPTION) {
  return (
    <div className='flex items-center justify-center h-[90vh] flex-col gap-2'>
        <div className='flex items-center gap-4'>
        {categories.map(({label,description,icon}) => (
          <Box key={label} icon={icon} label={label} desc={description} selected={state.option === label} onClick={() => {
            setState({
                ...state,
                option:label
            })
          }}/>
        ))}
        </div>
          <Button onClick={onSubmit} type='button'>Next</Button>
    </div>
  )
    }

    if(steps === STEPS.TITLE) {
        return (
            <div>
                <div>
                    <h1>Enter the title of your course</h1>
                    <Input value={state.title} id='name' name='title' type='text' onChange={handleChange} className='h-12 w-[800px]'/>
                    <Button onClick={onSubmit} type='button'>Next</Button>
                    <Button onClick={onBack} type='button'>Back</Button>

                </div>
            </div>
        )
    }

    if(steps === STEPS.CATEGORY) {
        return (
            <div className='flex flex-col items-center h-screen'>
                <div className='flex flex-wrap justify-center items-center h-[90vh]'>
                {dropdownItems.map(({label}) => (
                    <Box label={label} key={label} selected={state.category === label} onClick={() => {
                        setState({
                            ...state,
                            category:label

                        })
                    }}/>
                ))}
               </div>
               <div className='flex items-center space-x-2'>
                <Button disabled={isLoading} onClick={onSubmit} type='button'>Next</Button>
                <Button onClick={onBack} type='button'>Back</Button>
                </div>
            </div>
        )
    }
    
    if(steps === STEPS.CONTENT) {
      return (
          <div className='flex flex-col items-center h-screen'>
              <Input value={state.videos} id='videos' name='videos' type="text"  onChange={handleChange} className='h-12 w-[800px]'/>
              <Button disabled={isLoading} onClick={onSubmit} type='button'>Next</Button>
              <Button onClick={onBack} type='button'>Back</Button>
          </div>
      )
  }


        return (
            <div>
            </div>
        )
}
