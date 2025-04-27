import { useState } from "react"
import Navbar from "./Navbar.jsx"
import Overview from './Overview.jsx'
import WhyUs from './WhyUs.jsx'
import ViewSchedule from './MySchedule.jsx'
import ContactUs from './ContactUs.jsx'
import PlansPricing from './PlansPricing.jsx'
import BecomeTutor from './BecomeTutor.jsx'
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
import FindTutor from "./FindTutor.jsx"
import ReportABug from "./ReportABug.jsx"


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
        <div className="flex flex-col h-screen relative w-screen">
            <Navbar changeSection={changeSection} section={section}/>
            <div className='h-5 w-full bg-gradient-to-b from-black to-transparent z-20 opacity-15'></div>
            <div className="absolute top-0 left-0 h-screen w-screen bg-[url('/assets/blueSkyVerticalBackground.svg')] lg:bg-[url('/assets/blueSkyHorizontalBackground.svg')] bg-cover z-0"></div>
            {section === 'Overview' && <Overview />}
            {section === 'Why Us' && <WhyUs />}
            {section === 'Find Tutor' && <FindTutor setSection={setSection} />}
            {section === 'Schedule' && <ViewSchedule />}
            {section === 'Contact Us' && <ContactUs />}
            {section === 'Plans and Pricing' && <PlansPricing setSection={setSection}/>}
            {section === 'Report a Bug' && <ReportABug />}
            {section === 'Become a Tutor' && <BecomeTutor />}
            {section === 'Join The Community' && <Signup changeSection={changeSection} />}
            {section === 'Login' && <Login />}

        </div>
    )
}5