import { useState } from "react"
import Navbar from "./Navbar"
import backgroundImage from '/assets/blueSkyBackground.svg'
import Overview from '../Components/Overview.jsx'
import WhyUs from '../Components/WhyUs.jsx'
import GettingStarted from '../Components/GettingStarted.jsx'
import ViewSchedule from '../Components/MySchedule.jsx'
import ContactUs from '../Components/ContactUs.jsx'
import PlansPricing from '../Components/PlansPricing.jsx'
import BecomeTutor from '../Components/BecomeTutor.jsx'
import JoinCommunity from '../Components/JoinCommunity.jsx'


export default function Home(){
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
        <div className="flex flex-col h-screen relative">
            <Navbar changeSection={changeSection} section={section}/>
            <div className='h-5 w-full bg-gradient-to-b from-black to-transparent z-20 opacity-15'></div>
            <div className="absolute top-0 left-0 h-screen w-screen z-0" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}></div>
            {section === 'Overview' && <Overview />}
            {section === 'Why Us' && <WhyUs />}
            {section === 'Getting Started' && <GettingStarted />}
            {section === 'Schedule' && <ViewSchedule />}
            {section === 'Contact Us' && <ContactUs />}
            {section === 'Plans and Pricing' && <PlansPricing />}
            {section === 'Become a Tutor' && <BecomeTutor />}
            {section === 'Join The Community' && <JoinCommunity />}
            {section === 'Login' && <JoinCommunity />}

        </div>
    )
}5