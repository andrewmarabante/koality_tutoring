import { useEffect, useState, useRef } from "react"
import IconButton from '@mui/material/IconButton';
import backArrow from '/assets/backArrow.svg';
import plus from '/assets/plus.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 } from "uuid";
import { CircularProgress, Button, duration } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import AnimatedCheckmark from "../Animations/Checkmark";
import TypingText from "../Animations/TypingTest";

export default function LessonHistory() {

    const server = import.meta.env.VITE_SERVER + 'student'

    const [lessons, setLessons] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showDetails, setShowDetails] = useState(false)


    useEffect(() => {


        fetch(server + '/getLessons', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            credentials: 'include'
        })
            .then((result) => result.json())
            .then((data) => {
                setTimeout(() => {
                    setLoading(false)
                    setLessons(data.reverse())
                }, 1000)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    function totalOwed() {
        if (!lessons) { return <CircularProgress size={15} /> }

        let total = 0;

        lessons.map(lesson => {
            if (!lesson.student_paid) { total += (lesson.rate * lesson.duration / 60) }
        })

        return total
    }

    function handleSubmit(e, lessonId){
        e.preventDefault()

        const confirmed = e.target.lessonStatus[0].checked
        const denied = e.target.lessonStatus[1].checked

        if(!confirmed && !denied){return}

        let status = false
        if(confirmed){status = true}

        const data = {
            confirmed: status,
            lessonId: lessonId
        }


        fetch( server +'/confirmLesson' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then((result) => result.json())
            .then(data => {
                setLessons(prevLessons =>
                    prevLessons.map(lesson =>
                      lesson._id === data._id ? { ...lesson, ...data } : lesson
                    )
                  );
            })
            .catch(err => console.log(err))



    }

    return (
        <div className="h-full relative flex justify-center p-10 w-full font-roboto">
            <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl h-full w-full md:w-3/4 md:pt-3 lg:w-1/2 xl:w-1/3 flex justify-start relative overflow-hidden flex-col items-center">
                <div>
                    <motion.div
                        key='studentSelect'
                        initial={{ opacity: 0, x: 500 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: .2, ease: "easeOut" }}
                        className="overflow-y-auto border-b-2 border-gray-400 "
                    >
                        <div className="text-2xl p-5 pb-3 text-center mx-5 relative">Lesson History
                            <div className="absolute -right-5 bottom-2 text-xs text-blue-500" onClick={() => {
                                showDetails ? setShowDetails(false) : setShowDetails(true)
                            }}>{showDetails ? 'Close' : 'Details'}</div>
                        </div>
                    </motion.div>
                    <AnimatePresence>
                        {showDetails && <motion.div
                            key='studentSelect'
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: .5, ease: "easeOut" }}
                            className=""
                        >
                            <div className="p-2 flex flex-col items-center gap-2">
                                <div className="w-3/4 flex justify-between">Amount Owed: <span className="font-roboto-title-italic">{'$ ' + totalOwed()}</span></div>
                            </div>
                        </motion.div>}
                    </AnimatePresence>
                </div>


                <motion.div
                    key='studentSelect'
                    initial={{ opacity: 0, x: 500 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: .2, ease: "easeOut" }}
                    className="overflow-y-auto h-full w-full"
                >
                    <div className="pt-5 grow overflow-scroll">
                        {loading && <div className="w-full flex justify-center">
                            <CircularProgress size={50} className="mt-3" />
                        </div>}
                        {lessons && lessons.length > 0 && <motion.div
                            key='studentSelect'
                            initial={{ opacity: 0, y: 500 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: .2, ease: "easeOut" }}
                            className="overflow-y-auto h-full w-full"
                        >
                            <div className="overflow-scroll flex flex-col gap-5 w-full">
                                {lessons.map(lesson => {

                                    const names = lesson.tutor_name.split(" ")

                                    const date = new Date(lesson.createdAt)
                                    const formattedDate = date.toLocaleDateString("en-US");


                                    return (
                                        <div key={v4()}>
                                            <div className="grid grid-cols-4 gap-3 text-center text-xs px-5">
                                                <div className="flex flex-col gap-1">
                                                    <div className="">Tutor:</div>
                                                    <div>{names[0] + ' ' + names[1].slice(0, 1) + '.'}</div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="">Subject:</div>
                                                    <div>{lesson.subject}</div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="">Duration: </div>
                                                    <div>{lesson.duration}</div>
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                    <div className="">Rate: </div>
                                                    <div>{lesson.rate}</div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="">Total: </div>
                                                    <div>{'$' + lesson.duration * lesson.rate / 60}</div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="">Status: </div>
                                                    <div className="font-roboto-title-italic">{lesson.student_denied ? 'denied' : lesson.student_confirmed ? 'confirmed' : 'pending'}</div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="">Payment: </div>
                                                    <div className="font-roboto-title-italic">{lesson.tutor_paid ? 'complete' : 'pending'}</div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="">Date: </div>
                                                    <div className="font-roboto-title-italic">{formattedDate}</div>
                                                </div>
                                            </div>
                                            {(!lesson.student_confirmed && !lesson.student_denied) &&
                                                <form className="text-xs" onSubmit={(e) => handleSubmit(e, lesson._id)}>
                                                    <div className="flex justify-center gap-5 py-2 text-sm">
                                                        <div className="flex gap-1 items-center">
                                                        <input type="radio" name="lessonStatus" value="confirm" /> 
                                                            <div>Confirm Lesson</div>
                                                        </div>
                                                        <div className="flex gap-1 items-center">
                                                        <input type="radio" name="lessonStatus" value="dispute" /> 
                                                            <div>Dispute Lesson</div>
                                                        </div>

                                                    </div>
                                                    <div className="px-5 py-2"><Button type="submit" color="secondary" fullWidth variant="contained">Submit</Button></div>
                                                    <div className="text-xs px-3 font-roboto-title-italic text-center">Any Lesson not confirmed or disputed within 5 days will automatically be confirmed.</div>
                                                </form>}
                                            <div className={`text-2xl pb-3 text-center border-b ${lesson.student_denied ? 'border-red-400' : lesson.student_confirmed ? 'border-green-400' : 'border-gray-400'} mx-5`}></div>

                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                        }
                        {lessons && lessons.length === 0 &&
                            <motion.div
                                key='studentSelect'
                                initial={{ opacity: 0, y: 500 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: .2, ease: "easeOut" }}
                                className="overflow-y-auto h-full w-full"
                            >
                                <div className="text-sm text-center pt-3">You have no submitted lessons!</div>
                            </motion.div>}
                    </div>
                </motion.div>


            </div>
        </div>
    )
}