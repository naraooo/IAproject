'use client'

import { use, useEffect, useState } from "react"

export default function Page({ params }) {
    console.log(params)
    const { lessonId } = use(params)    
    console.log("lessonId ===>", lessonId)
    const [idx, setIdx] = useState(0)
    const [lessonData, setLessonData] = useState(null)
    const [point, setPoint] = useState(0)
    useEffect(() => {
        const chosenLessons = JSON.parse(window.localStorage.getItem('chosenLessons')) || []
        console.log(chosenLessons)
        const foundedLesson = chosenLessons.find(lesson => lesson.id === lessonId)
        console.log("Founded lesson:", foundedLesson)
        
        setLessonData(foundedLesson)
        
    }, [lessonId])

    function backbutton() {
        setIdx(Math.max(0, idx - 1))
    }

    function nextbutton() {
        if(lessonData.words[idx]['meaning']?.toLowerCase() === lessonData.words[idx]['examMeaning']?.toLowerCase()){
            setPoint(point + 1)
        }
        setIdx(Math.min((lessonData?.words?.length || 1) - 1, idx + 1))
    }
    function getMeaning(value) {
        if (lessonData?.words?.[idx]) {
            setLessonData(prev => {
                const newWords = [...prev.words];
                newWords[idx] = { ...newWords[idx], examMeaning: value };
                return { ...prev, words: newWords };
            });
        }
    }
    return (
        <div className="flex flex-col items-center p-7">
            <div className="w-full flex justify-around z-0">
                <div className={`w-[60%] rounded-3xl ${idx === (lessonData?.words?.length || 1) - 1 ? 'hidden' : 'block'}`}>
                        <h1 className="text-3xl text-end">{`${idx + 1} / ${lessonData?.words?.length - 1 || 1}`}</h1>
                    <div className="inner-card text-center text-5xl bg-[#6e0c0ce3] h-[400px]">
                        <h1 className="text-white top-0 p-4">
                            {lessonData?.['words'][idx]?.['word']}
                        </h1>
                        <div className="h-[100px] rounded-2xl border-[1px] border-gray-500 mx-5">
                            <input 
                                value={lessonData?.words?.[idx]?.examMeaning || ''} 
                                onChange={(e) => { getMeaning(e.target.value) }} 
                                type="text" 
                                className="flex justify-between items-center text-center  w-[100%] mx-auto outline-none" 
                                placeholder="Write Meaning Here"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`text-center rounded-xl z-50 bg-[#440000] h-[400px] p-10 shadow-[0_6px_50px_rgba(255,254,254,0.432)] ${idx === (lessonData?.words?.length  || 1) - 1 ? 'block' : 'hidden'}`}>
                <h1 className="text-8xl">Exam Finished!!!</h1>
                <div className="h-[100px] text-5xl mt-5">
                    your point is {point}/{lessonData?.words?.length - 1}
                </div>
            </div>
            <div className="text-[2vw] text-center mt-4 rounded-[0.01vw]">
                <button onClick={backbutton} disabled={idx <= 0} className="mr-[6vw] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed">
                    <p className="text-gray-400 border-gray-500 border-[2px] rounded-2xl px-2">Back</p>
                </button>
                <button onClick={nextbutton} disabled={idx >= (lessonData?.words?.length || 1) - 1} className="ml-[6vw] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed">
                    <p className="text-gray-400 border-gray-500 border-[2px] rounded-2xl px-2">Next</p>
                </button>
            </div>
            </div>
    )

}