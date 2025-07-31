import { useEffect, useState } from "react"
import SubjectSelector from "./SubjectSelector"
import ViewTutors from "./ViewTutors"
import OpenTutorProfile from "./OpenTutorProfile"
import { CircularProgress } from "@mui/material"
import { AnimatePresence, motion } from 'framer-motion';



export default function FindTutor({setSection}){

    const [subject, setSubject] = useState(null)
    const [loaded, setLoaded] = useState(true)
    const [tutors, setTutors] = useState(null)
    const [viewTutor, setViewTutor] = useState(false)
    const [currentTutor, setCurrentTutor] = useState(null)

    const server = import.meta.env.VITE_SERVER + 'student'


    useEffect(() => {


        
        fetch(server + '/getTutors', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          })
          .then(result  => result.json())
          .then(data => {
            setTutors(data)
        })
          .catch(err => console.log(err))

        
        
    }, [])

    function handleSubjectChange(newSubject){
        setTimeout(() => setSubject(newSubject), 1500)
    }
    
    function openViewTutor(id){
        const tempTutor = tutors.find(tutor => tutor._id  === id)
        setTimeout(()=>{
            setCurrentTutor(tempTutor)
            setViewTutor(true)}, 100)
    }

    function closeViewTutor(){
        setTimeout(()=>{
            setViewTutor(false)}
            , 100)
    }
    
    return(
        <div className="w-full h-full flex justify-center z-40 items-center">
            <div className="h-11/12 w-11/12 relative">
                <div className="flex justify-start items-center h-full w-full overflow-scroll flex-col bg-[rgba(255,255,255,0.75)] rounded-3xl shadow-lg font-roboto py-2">
                <motion.div
          key='studentSelect'
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full"
        >
            { !subject && loaded &&
                    <div className="w-full h-full flex flex-col justify-start items-center pt-10">
                        <div className="text-2xl p-2">Enter Your Subject: </div>
                        <div className="w-9/12">
                            <SubjectSelector handleSubjectChange = {handleSubjectChange}/>
                        </div>
                    </div>}
                     {!viewTutor && loaded  && subject &&      <div className="p-1 px-4">
                        Showing All Private Tutors for <span className="font-roboto-title-italic">{subject}</span> <span className="text-blue-500 font-roboto-title-italic text-xs" onClick={() => setTimeout(()=>setSubject(null), 100)}>Change</span>
                    </div>}
                    {!loaded && <div className="w-full pt-10 flex justify-center">
                        <CircularProgress size={50} />
                    </div>}
                    { subject && !viewTutor &&
                    <ViewTutors tutors= {tutors} subject = {subject} openViewTutor={openViewTutor} setSection={setSection}/>
                    }
                    { subject && viewTutor &&
                    <OpenTutorProfile tutor= {currentTutor} closeViewTutor= {closeViewTutor} setSection={setSection}/>
                    }

        </motion.div>

                
                </div>
            </div>
        </div>
    )
}