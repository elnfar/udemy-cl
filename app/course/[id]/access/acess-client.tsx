'use client'

import { useState } from "react"
import VideoComponent from "../videos"




type Props  = {
    mappedVideos:string[],
    allVideosLength:number,
}


export default function AccessClient({mappedVideos,allVideosLength}:Props) {

    const [currentIndex,setCurrentIndex] = useState(0)
    
    const changeIndex = () => {;
        setCurrentIndex((prev) => prev  === allVideosLength - 1 ? 0 : prev +  1)
    }
    
  return (
    <div>

            <div>
                <div>
                    <p>Video : {currentIndex + 1}</p>
                </div>


                    
                    <VideoComponent big url={mappedVideos[currentIndex]}/>
                    <button onClick={changeIndex}>Next Video</button>
            </div>
          
    </div>
  )
}
