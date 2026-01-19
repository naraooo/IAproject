'use client'

import { use, useEffect, useState } from "react"

export default function Page({ params }) {
    console.log(params)
    const { lessonId } = use(params)    
    console.log("lessonId ===>", lessonId)
    const [idx, setIdx] = useState(0)
    const [lessonData, setLessonData] = useState(null)
    
    useEffect(() => {
        const chosenLessons = JSON.parse(window.localStorage.getItem('chosenLessons')) || []
        console.log(chosenLessons)
        const foundedLesson = chosenLessons.find(lesson => lesson.id === lessonId)
        console.log("Founded lesson:", foundedLesson)
        
        setLessonData(foundedLesson)
        
    }, [lessonId])
        function clickFunction() {
            const element = document.getElementById('card-flip')
            if (element) {
                const innerCard = element.querySelector('.inner-card')
                if (innerCard) {
                    const transform = innerCard.style.transform
                    if (transform.includes('rotateY(180deg)')) {
                        innerCard.style.transform = 'rotateY(0deg)'
                    } else {
                        innerCard.style.transform = 'rotateY(180deg)'
                    }
                }
            }
        }
        function backbutton() {
            const element = document.getElementById('card-flip')
            setIdx(Math.max(0, idx - 1))
            if (element) {
                const innerCard = element.querySelector('.inner-card')
                if (innerCard) {
                    const transform = innerCard.style.transform
                    if (transform.includes('rotateY(180deg)')) {
                        innerCard.style.transform = 'rotateY(0deg)'
                    }
                }
            }
        }
    
        function nextbutton() {
            const element = document.getElementById('card-flip')
            setIdx(Math.min((lessonData?.words?.length || 1) - 1, idx + 1))
            if (element) {
                const innerCard = element.querySelector('.inner-card')
                if (innerCard) {
                    const transform = innerCard.style.transform
                    if (transform.includes('rotateY(180deg)')) {
                        innerCard.style.transform = 'rotateY(0deg)'
                    }
                }
            }
        }
    
    return (
        <div  className="flex flex-col items-center overflow-y-visible overflow-x-auto p-7">
            <div className="w-full flex justify-around">
                <div id='card-flip'  className="w-[60%] perspective-[1000] rounded-3xl ">
                    <div className="inner-card flex justify-center items-center text-center text-6xl relative transition-transform duration-[0.4s] transform-3d bg-[#6e0c0ce3] h-[400px]">
                        <div className="absolute w-full backface-hidden">
                            <h1 className="text-white">
                                {lessonData?.['words'][idx]?.['word']}
                            </h1>
                        </div>
                        <div className="absolute w-full backface-hidden rotate-y-180">
                            <h1 className="text-white">
                                {lessonData?.['words'][idx]?.['meaning']}
                            </h1>
                        </div>
                    </div>
                    <div className=" text-xl absolute p-7">
                        <button className="cursor-pointer rounded-2xl border-[0.1vw] p-3  text-[#977e7ed0] hover:text-white duration-[0.1s]" onClick={clickFunction}>Flip the card</button>
                    </div>
                </div>
            </div>
                <div className="text-[4vw] text-center mt-4 rounded-[0.01vw]">
                      <div className="text-[4vw] text-center mt-4 rounded-[0.01vw]">
                <button onClick={backbutton} disabled={idx <= 0} className="disabled:opacity-40">
                     <p className="fa fa-arrow-left mr-[6vw] cursor-pointer"></p>
                </button>
                <button onClick={nextbutton} disabled={idx >= (lessonData?.words?.length || 1) - 1} className="disabled:opacity-40">
                    <p className="fa fa-arrow-right ml-[6vw] cursor-pointer"></p>
                </button>
            </div>
                </div>
        </div>
    )
}