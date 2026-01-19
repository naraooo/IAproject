'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const [lessons, setLessons] = useState([]);
  const router = useRouter();
    useEffect(() => {
      // This effect runs once when the component mounts
      const chosenLessons = JSON.parse(window.localStorage.getItem('chosenLessons')) || [];
      console.log('Chosen Lessons:', chosenLessons);
      setLessons(chosenLessons);
      }, [router]);
  return (
    <div>
        <a>
          <h1 className="text-[2vw] text-center">Enter Launchpad to Select Lessons</h1>
        </a>
        <div className='flex justify-around'>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[85%] h-[600px]"> 
            {
              lessons.map((lesson) => (
                <div id="subjects" key={lesson.id} className="text-center p-4  ">
                  <h2 className="text-[#775b5b] text-[2ch] font-bold ">Enter Launchpad Select Lesson </h2>
                </div>
              ))
            }
          </div>
        </div>
    </div>
    
  )
}