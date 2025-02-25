import TutorNavbar from './TutorNavbar';
import { useState } from 'react';

export default function TutorHome(){

        const [section, setSection] = useState('Overview')
    
    
        function changeSection(newSection){
            
            if(section === newSection){
                return
            }
    
            // if(newSection === 'Login'){
            //     return window.location.href = '/login'
            // }
            
            setSection(newSection)
        }
    
    return(
        <div>
            <TutorNavbar changeSection={changeSection} section={section}/>
        </div>
    )
}