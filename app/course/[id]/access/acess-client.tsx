'use client'

import { useState } from "react"
import VideoComponent from "../videos"
import { Course } from "@prisma/client"




type Props  = {
    mappedVideos:string[],
    allVideosLength:number,
    course:Course | null
}


export default function AccessClient({mappedVideos,allVideosLength,course}:Props) {

    const [currentIndex,setCurrentIndex] = useState(0)
    
    const changeIndex = () => {;
        setCurrentIndex((prev) => prev  === allVideosLength - 1 ? 0 : prev +  1)
    }

  return (
    <div>

            <div>
                <div>
                    <h1 className="text-[2.5rem] py-2">{course?.title}</h1>
                    <p>Video : {currentIndex + 1}</p>
                </div>


                    
                    <VideoComponent big url={mappedVideos[currentIndex]}/>
                    <button onClick={changeIndex}>Next Video</button>
            </div>
          
    </div>
  )
}
