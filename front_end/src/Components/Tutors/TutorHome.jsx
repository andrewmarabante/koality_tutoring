import EditPhoto from './EditPhoto';
import Profile from './Profile';
import TutorNavbar from './TutorNavbar';
import { useState } from 'react';

export default function TutorHome(){

        const [section, setSection] = useState('Profile')
    
    
        function changeSection(newSection){
            
            if(section === newSection){
                return
            }
    
            setSection(newSection)
        }
    
    return(
        <div className='flex flex-col h-screen relative'>
            <TutorNavbar changeSection={changeSection} section={section}/>
            <div className='h-5 w-full bg-gradient-to-b from-black to-transparent z-20 opacity-15'></div>
            <div className="absolute top-0 left-0 h-screen w-screen bg-[url('/assets/blueSkyVerticalBackground.svg')] lg:bg-[url('/assets/blueSkyHorizontalBackground.svg')] bg-cover z-0"></div>
            <div className='grow z-50 flex justify-center items-center overflow-hidden w-screen'>
                {section === 'Profile' && <Profile />}
                {section === 'Getting Started' && <EditPhoto />}
            </div>
        </div>
    )
}