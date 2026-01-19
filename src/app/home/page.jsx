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

  function routeToWords(lessonId = '') {
    router.push(`/words/${lessonId}`)
  }

  return (
    <div className='flex justify-around'>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[85%] h-[600px]">
            {
              lessons.map((lesson) => (
                <span key={lesson.id} id="subjects" onClick={() => {routeToWords(lesson.id)}} className="cursor-pointer">
                  <div>
                      <h2 className='text-[#d3cfcf] text-[3ch] font-bold'>{lesson.name}</h2>
                  </div>
                </span>
              ))
            }
        </div>
    </div>
    
  )
}