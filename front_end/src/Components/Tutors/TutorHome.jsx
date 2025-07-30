import GettingStarted from './GettingStarted';
import Profile from './Profile';
import TutorNavbar from './TutorNavbar';
import TutorSchedule from './TutorSchedule';
import Chats from './Chats';
import SubmitLesson from './SubmitLesson';
import LessonHistory from './LessonHistory';
import CheckIsPhone from "../MobileOnly/CheckIsPhone.jsx"
import MobileOnlyError from "../MobileOnly/MobileOnlyError.jsx"


import { useState } from 'react';

export default function TutorHome(){

        const [section, setSection] = useState('Profile')
        const server = import.meta.env.VITE_SERVER

        const isPhone = CheckIsPhone();
        
    
    
        function changeSection(newSection){

            if (newSection === 'Logout') {

            fetch( server +'logoutTutor' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
                .then((result) => result.json())
                .then(data => {
                    window.location.href = '/';
                })
                .catch(err => console.log(err))
        }
            
            if(section === newSection){
                return
            }
    
            setSection(newSection)
        }
    
    return(
        <div>
            {isPhone ? <div className='flex flex-col h-screen relative'>
                <TutorNavbar changeSection={changeSection} section={section}/>
                <div className='h-5 w-full bg-gradient-to-b from-black to-transparent z-20 opacity-15'></div>
                <div className="absolute top-0 left-0 h-screen w-screen bg-[url('/assets/blueSkyVerticalBackground.svg')] lg:bg-[url('/assets/blueSkyHorizontalBackground.svg')] bg-cover z-0"></div>
                <div className='grow z-50 flex justify-center items-center overflow-hidden w-screen'>
                    {section === 'Profile' && <Profile />}
                    {section === 'Getting Started' && <GettingStarted />}
                    {section === 'Schedule' && <TutorSchedule  />}
                    {section === 'Messages' && <Chats  />}
                    {section === 'Submit Lesson' && <SubmitLesson  />}
                    {section === 'Lesson History' && <LessonHistory  />}
                </div>
            </div> : 
            <MobileOnlyError />}
        </div>
    )
}