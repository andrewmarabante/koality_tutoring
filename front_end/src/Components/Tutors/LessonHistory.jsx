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

    const server = import.meta.env.VITE_SERVER + 'tutor'

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
                    setLessons(data)
                }, 1000)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    function totalEarnings() {
        if (!lessons) { return <CircularProgress size={15} /> }

        let total = 0;
        lessons.map(lesson => {
            total += (lesson.rate * lesson.duration / 60)
        })

        return total
    }

    function totalPaid() {
        if (!lessons) { return <CircularProgress size={15} /> }

        let total = 0;

        lessons.map(lesson => {
            if (lesson.tutor_paid) { total += (lesson.rate * lesson.duration / 60) }
        })

        return total
    }

    function totalOwed() {
        if (!lessons) { return <CircularProgress size={15} /> }

        let total = 0;

        lessons.map(lesson => {
            if (!lesson.tutor_paid) { total += (lesson.rate * lesson.duration / 60) }
        })

        return total
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
                                <div className="w-3/4 flex justify-between">Total Earnings: <span className="font-roboto-title-italic">{'$ ' + totalEarnings()}</span></div>
                                <div className="w-3/4 flex justify-between">Amount Paid: <span className="font-roboto-title-italic">{'$ ' + totalPaid()}</span></div>
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

                                    const names = lesson.student_name.split(" ")

                                    const date = new Date(lesson.createdAt)
                                    const formattedDate = date.toLocaleDateString("en-US");


                                    return (
                                        <div>
                                            <div className="grid grid-cols-4 gap-3 text-center text-xs px-5">
                                                <div className="flex flex-col gap-1">
                                                    <div className="">Student:</div>
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
                                                    <div className="font-roboto-title-italic">{lesson.student_confirmed ? 'confirmed' : 'pending'}</div>
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
                                            <div className={`text-2xl pb-3 text-center border-b ${lesson.tutor_paid ? 'border-green-400' : 'border-gray-400'} mx-5`}></div>

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