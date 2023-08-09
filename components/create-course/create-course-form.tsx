'use client'

import Box from '@/components/box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import axios from 'axios'
import { Circle, CircleDashed, Dot, DotIcon, Text, VideoIcon } from 'lucide-react'
import {useParams, useRouter} from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import "@uploadthing/react/styles.css";

import { UploadButton } from "../../lib/uploadthings";





enum STEPS {
    OPTION = 0,
    TITLE = 1,
    DESCRIPTION = 2,
    LANGUAGE = 3,
    CATEGORY = 4,
    CONTENT = 5,

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
        label: 'Film Making',
      },
      {
        label: 'Health',
      },
    
  ]


  export const languages = [
    {
      label: 'English',
    },
    {
      label: 'Arabic',
    },
    {
        label: 'German',
      },
      {
        label: 'French',
      },
      {
        label: 'Russian',
      },
      {
        label: 'Turkish',
      },
    
  ]
  
  
  
  type Ival = {
    option:string,
    title:string,
    images: { fileUrl: string; fileKey: string; }[],
    description:string,
    language:string,
    category:string,
    videos: { fileUrl: string; fileKey: string; }[]
  }

const initialValues:Ival = {
    option:'',
    title:'',
    description:'',
    language:'',
    images:[],
    category:'',
    videos:[]
}



export default function NewCourse() {

    const [state,setState] = useState(initialValues)
    const [video,setVideo] = useState<{
      fileUrl: string;
      fileKey: string;
  }[]>([])

  const [image,setImage] = useState<{
    fileUrl: string;
    fileKey: string;
}[]>([])

let amount = 1;
const [container, setContainer] = useState<number>(amount);
const [containerArr, setContainerArr] = useState<number[]>([]);

    const [isLoading, setIsLoading] = useState(false)
    const [isImageUploaded,setIsImageUploaded] = useState(true)
    const [isVideoUploaded,setIsVideoUploaded] = useState(true)

    const [steps,setSteps] = useState(STEPS.OPTION)
    const [error, updateError] = useState();

    const router = useRouter();

    const onNext = () => {
        setSteps((value) => value + 1)
    }

    const onBack = () => {
        setSteps((value) => value - 1)
    }

    const handleButtonClick = () => {
      // Append container to containerArr
      setContainerArr(prevArr => [...prevArr, container]);
    }
    
    



    const onSubmit = () => {
        if(steps !== STEPS.CONTENT) {
            return onNext()
        }
        setIsLoading(true)
        axios.post('/api/create-course', {
          ...state,
          videos:video,
          images:image
        })
        
        .then(() => {
          toast.success('Course created successfully')
          router.push('/')
        })
        .catch((err) => {
          throw new Error(err)
        })
        .finally(() => {
            setIsLoading(false)
     
        })
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setState({
        ...state,[event.target.name]:event.target.value})
    }

    const links = [
      {
        name: "Course Type",
        step: STEPS.OPTION,
      },
      {
        name: "Course Title",
        step: STEPS.TITLE,
      },
      {
        name: "Course Description",
        step: STEPS.DESCRIPTION,
      },
      {
        name: "Course Language",
        step: STEPS.LANGUAGE,
      },
      {
        name: "Course Category",
        step: STEPS.CATEGORY,
      },
      {
        name: "Course Content",
        step: STEPS.CONTENT,
      },
    ];
  
return (
  <>
  <div className='flex items-center space-x-8 w-full py-4 bg-purple-600 text-white uppercase text-md font-bold justify-center'>
      {links.map((item) => (
        <span key={item.name} className={`flex w-[200px] items-center gap-2 cursor-pointer`}>
           <span className={`text-sm`} onClick={() => setSteps(item.step)}>{item.name}</span>
           <Circle color="#ffffff" strokeWidth={2} className={`rounded-full ${steps === item.step ? 'bg-green-400' : ''}`}/>
        </span>
      ))}
  </div>

    {steps === STEPS.OPTION && ( 
        <div className='flex items-center justify-center flex-col gap-4 h-[80vh]'>
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
            <div className='w-[200px]'>
              <Button onClick={onSubmit} type='button' className='bg-purple-600 py-4 w-full'>Next</Button>
            </div>
        </div>
    )}

    {steps === STEPS.TITLE && (
            <div className='h-[70vh] justify-center flex items-center'>
                <div className='flex items-center flex-col gap-4'>
                  <div className='space-y-4'>
                    <h1 className='text-3xl'>Enter the title of your course</h1>
                    <Input value={state.title} placeholder='Javascript course e.g' id='name' name='title' type='text' onChange={handleChange} className='h-12 w-[800px]'/> 
                  </div>

                    <div className='flex flex-col gap-2 w-full'>
                    <Button onClick={onBack} type='button'>Back</Button>
                    <Button onClick={onSubmit} type='button' className='bg-purple-600'>Next</Button>
                    </div>
                </div>
            </div>
    )} 

{steps === STEPS.DESCRIPTION && (
            <div className='h-[70vh] justify-center flex items-center'>
                <div className='flex items-center flex-col gap-4'>
                  <div className='space-y-4'>
                    <h1 className='text-3xl'>Enter the description of your course</h1>
                    <Input value={state.description} placeholder='Learn typescript from scratch 2023' id='description' name='description' type='text' onChange={handleChange} className='h-12 w-[800px]'/> 
                  </div>

                    <div className='flex flex-col gap-2 w-full'>
                    <Button onClick={onBack} type='button'>Back</Button>
                    <Button onClick={onSubmit} type='button' className='bg-purple-600'>Next</Button>
                    </div>
                </div>
            </div>
    )} 


    {steps === STEPS.CATEGORY && ( 

            <div className='flex flex-col items-center py-8 gap-2'>
                <div className='grid grid-cols-3 gap-2'>
                {dropdownItems.map(({label}) => (
                    <Box label={label} key={label} selected={state.category === label} onClick={() => {
                        setState({
                            ...state,
                            category:label

                        })
                    }}/>
                ))}
                </div>
                <div className='flex gap-2'>
                    <Button onClick={onBack} type='button'>Back</Button>
                    <Button onClick={onSubmit} type='button' className='bg-purple-600'>Next</Button>
                </div>
               
            </div>
    )}

{steps === STEPS.LANGUAGE && ( 

<div className='flex flex-col items-center py-8 gap-2'>
    <div className='grid grid-cols-3 gap-2'>
    {languages.map(({label}) => (
        <Box label={label} key={label} selected={state.language === label} onClick={() => {
            setState({
                ...state,
                language:label

            })
        }}/>
    ))}
    </div>
    <div className='flex gap-2'>
        <Button onClick={onBack} type='button'>Back</Button>
        <Button onClick={onSubmit} type='button' className='bg-purple-600'>Next</Button>
    </div>
   
</div>
)}

    
    {steps === STEPS.CONTENT && (

          <div className='flex flex-col items-center h-[70vh] justify-center'>

      <div>
            <h1>Thumbnail Image</h1>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  if(res) {
                    setImage(res)

                    setState(prevState => ({
                      ...prevState,
                      images: [...prevState.images, ...res]
                    }));
                    const json = JSON.stringify(res);

                    console.log(json);
                    console.log(image);
                    console.log(state);
                    
                    
                  }
                  console.log("Files: ", res);
                  setIsImageUploaded(false)
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
    </div>
                


                <p>Lecture {container}</p>

                <div className='w-full'>

                    <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      setIsLoading(true)
                      if(res) {
                        setVideo(prev => [...prev,...res])

                        setState(prevState => ({
                          ...prevState,
                          videos: [...prevState.videos, ...res]
                        }));

                        const json = JSON.stringify(res);
                        console.log(json);
                        console.log(video);

                        setIsLoading(false)
                        
                      }
                      console.log("Files: ", res);
                      setIsVideoUploaded(false)
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}

                  />
                </div>
            
                

                {containerArr.map((item, index) => (
                  <>
                  <h1>Lecture {index + 1}</h1>
                        <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          setIsLoading(true)
                          if(res) {
                            setVideo(prev => [...prev,...res])

                            setState(prevState => ({
                              ...prevState,
                              videos: [...prevState.videos, ...res]
                            }));

                            const json = JSON.stringify(res);
                            console.log(json);
                            console.log(video);
                            setIsLoading(false)

                          }
                          console.log("Files: ", res);
                          setIsVideoUploaded(false)
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
        </>
      ))}

            <button onClick={handleButtonClick}>Add another video</button>

      
              {!isVideoUploaded && !isImageUploaded && !isLoading &&  (
              <Button disabled={isLoading} onClick={onSubmit} type='button'>Next</Button>
              )}
              <Button onClick={onBack} type='button'>Back</Button>

          </div>
      )} 
    </>
)
              }