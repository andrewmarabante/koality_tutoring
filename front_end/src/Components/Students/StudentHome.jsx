import { useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentProfile from './StudentProfile';
import FindTutor from './FindTutor';
import Study from './Study';
import Chats from './Chats';
import PlansPricing from './PlansPricing';
import LessonHistory from './LessonHistory';
import ReportABug from './ReportABug';
import CheckIsPhone from "../MobileOnly/CheckIsPhone.jsx"
import MobileOnlyError from "../MobileOnly/MobileOnlyError.jsx"


export default function StudentHome() {

    const [section, setSection] = useState('Profile')

    const isPhone = CheckIsPhone();
    const server = import.meta.env.VITE_SERVER

    function changeSection(newSection) {

        if (newSection === 'Logout') {

            fetch( server +'logoutStudent' , {
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


        if (section === newSection) {
            return
        }

        setSection(newSection)
    }

    return (
        <div>
            {isPhone ? <div className='flex flex-col h-screen relative'>
                <StudentNavbar changeSection={changeSection} section={section} />
                <div className='absolute h-5 w-full bg-gradient-to-b from-black to-transparent z-20 opacity-15'></div>
                <div className="absolute top-0 left-0 h-screen w-screen bg-[url('/assets/blueSkyVerticalBackground.svg')] lg:bg-[url('/assets/blueSkyHorizontalBackground.svg')] bg-cover z-0"></div>
                <div className='grow z-50 flex justify-center items-center overflow-hidden w-screen relative'>
                    {section === 'Profile' && <StudentProfile setSection={setSection} />}
                    {section === 'Find Tutor' && <FindTutor />}
                    {section === 'Study' && <Study />}
                    {section === 'Messages' && <Chats />}
                    {section === 'Plans / Pricing' && <PlansPricing />}
                    {section === 'Lesson History' && <LessonHistory />}
                    {section === 'Report a Bug' && <ReportABug />}
                </div>
            </div> : 
            <MobileOnlyError />}
        </div>
    )
}