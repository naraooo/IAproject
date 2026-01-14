'use client';

import { useState } from 'react';

export default function Footer() {
    const [isHovered, setIsHovered] = useState(false);


function examfunction () {
    window.location.href = "../Exam"
}

return (
    <div className="relative bottom-0 left-0 w-full grid grid-cols-2 py-[2vw] z-50">
        <div className="flex justify-center">
            <a  className='font-bold text-[2vw] text-[#ccbebe]'
                href="../launchpad"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <i 
                    className={`fa ${isHovered ? 'fa-folder-open-o' : 'fa-folder'} p-2`} 
                    style={{ fontSize: '4vw' }}
                ></i>Launchpad
            </a>
        </div>
        <div className="flex justify-center ">
            <button className='font-bold text-[2vw] hover:text-green-500 text-[#ccbebe] cursor-pointer' onClick={examfunction}>
                <i className="fa fa-question  p-2" style={{ fontSize: '4vw' }}></i>
                Take Exam
            </button>
        </div>
    </div>
);
}