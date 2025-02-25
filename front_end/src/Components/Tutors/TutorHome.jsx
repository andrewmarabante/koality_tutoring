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
        <div>
            <TutorNavbar changeSection={changeSection} section={section}/>
        </div>
    )
}