'use client'

import { useState } from "react";
import {MoveLeftIcon,MoveRightIcon} from 'lucide-react'

  type CarouselProps = {
    images: string[];
  };

const SliderMain:React.FC<CarouselProps> = ({images}) => {


    
        const [currentIndex, setCurrentIndex] = useState(0);
      
        const previousImage = () => {
          const isFirstSlide = currentIndex === 0;
          const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
          setCurrentIndex(newIndex);
        };
      
        const nextImage = () => {
          const isLastSlide = currentIndex === images.length - 1;
          const newIndex = isLastSlide ? 0 : currentIndex + 1;

          setCurrentIndex(newIndex);
        };
      
        const currentImage = images[currentIndex];


    return ( 
        <div className="relative  pb-16">
          <div>
              <button onClick={previousImage} className="absolute left-[2%] top-[50%] z-[40]"><MoveLeftIcon/></button>
                  <img src={currentImage}   alt={`Image ${currentIndex + 1}`} className="h-[500px] object-cover w-full"/>


                {currentIndex === 1 && (
                  <div className="absolute top-[20%] left-[5%] bg-white p-6 max-w-[450px]">
                    <h1 className="my-4 text-[2rem] font-bold">Learning that gets you</h1>
                    <h4 className="text-[1.2rem]">Skills for your present (and your future). Get started with us.</h4>
                  </div>
                  )}



                  {currentIndex === 0 && (
                  <div className="absolute top-[20%] left-[5%] bg-white p-6 max-w-[450px]">
                    <h1 className="my-4 text-[2rem] font-bold">Unlock the power of your people</h1>
                    <h4 className="text-[1.2rem]">Udemy Business is trusted by 12.5K+ companies around the world. Find out what we can do for yours.</h4>
                  </div>
                  )}

              <button onClick={nextImage} className="absolute right-[2%] top-[50%] z-[40]"><MoveRightIcon/></button>
          </div>

        </div>
     );
}
 
export default SliderMain;