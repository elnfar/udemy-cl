'use client'

import { Pause, Play } from 'lucide-react';
import React, { useState, useRef } from 'react';

type VideoComponentProps = {
    url:string | undefined
    big:boolean
}

const VideoComponent = ({url,big}:VideoComponentProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleStopClick = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div key={url} className={`relative `} >
      <video ref={videoRef} width="1200" className=' object-cover -z-50' controls={true}>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {isPlaying ? (
        <button className={`z-50 absolute top-[50%] left-[50%] -translate-x-1/2 bg-transparent ${isPlaying ? 'opacity-0' : 'opacity-100'} text-black`} onClick={handleStopClick}><Pause className='text-white' size={36}/></button>
      ) : (
        <button className='z-50 absolute top-[50%] left-[50%] -translate-x-1/2 bg-transparent text-black' onClick={handlePlayClick}><Play className='text-white' size={36}/></button>
      )}
    </div>
  );
};

export default VideoComponent;
