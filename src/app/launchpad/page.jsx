'use client'
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useRouter } from 'next/navigation';
async function fetchDataFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, 'Lessons'));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return { status: 'success', data };
  } catch (error) {
    return { status: 'failed', error: error.message };
  }
}

export default function Launchpad() {
  const [lessons, setLessons] = useState([]);
  const [chosenLessons, changeChosenLessons] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromFirestore();
      if (data.status === 'failed') {
        console.error('Error:', data.error);
        return;
      }
      setLessons(data['data'] || []);
    };
    fetchData();
  }, []);
  
  async function saveLessons() {
    if(chosenLessons.length < 6) {
      alert('Please select 6 lessons before saving.');
      return;
    }
    window.localStorage.setItem('chosenLessons', JSON.stringify(chosenLessons));
    router.push('/home');
  }
  
  
  console.log('Chosen Lessons:', chosenLessons);
  const userclickedlesson = (lesson) => {
    if (chosenLessons.find(data => data['id'] === lesson['id'])) {
      changeChosenLessons(prev => prev.filter(chosenLesson => chosenLesson['id'] !== lesson['id']));
    } else if (chosenLessons.length < 6) {
      changeChosenLessons(prev => [...prev, lesson]);
    }
  };

  const selectedlesson = (lessonId) => chosenLessons.find(data => data['id'] === lessonId) ? true : false;

  return (
    <div>
    <div className='flex justify-around'>
      <div className='flex flex-col justify-start w-[85%] gap-[2ch] mt-8'>
        {lessons.map((lesson) => (
          <a
            key={lesson.id}
            className="cursor-pointer"
            onClick={() => userclickedlesson(lesson)}
          >
            <div id="launchcard" style={{
              backgroundColor: selectedlesson(lesson.id) ? '#574e4e' : '',
              color: selectedlesson(lesson.id) ? 'white' : ''
            }}>
              <div className='grid text-xl grid-cols-3'>
                <p className='col-start-1 font-bold grid-start order-first'>{lesson.name} </p>
                <p className='col-start-3 text-end'>{selectedlesson(lesson.id) ? `${chosenLessons.findIndex(l => l.id === lesson.id) + 1}/6` : ''}</p>
              </div>
            </div>
          </a>
        ))}
      <button id="save-button" className='bg-[#574e4e] text-[#a7a7a7] w-[20%] rounded-lg p-2' onClick={saveLessons}
      style={{
        backgroundColor: chosenLessons.length === 6 ? 'green' : '#574e4e',
        color: chosenLessons.length === 6 ? 'white' : '#a7a7a7',
        cursor: chosenLessons.length === 6 ? 'pointer' : 'default'
      }}>
        <div>Save</div>
      </button>
      </div>
    </div>
    </div>
  );
}
