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

export default function SubmitLesson() {

    const [students, setStudents] = useState([]);
    const [tutor, setTutor] = useState(null);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [showSubmit, setShowSubmit] = useState(false);
    const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
    const [lessonSubmitted, setLessonSubmitted] = useState(false);
    const [loading, setLoading] = useState(null);


    const subjectRef = useRef(null)
    const lessonTypeRef = useRef(null)
    const durationHourRef = useRef(null)
    const durationMinuteRef = useRef(null)
    const rateRef = useRef(null)
    const checkRef = useRef(null)




    const [initialized, setInitialized] = useState(null);


    const server = import.meta.env.VITE_SERVER + 'tutor'


    useEffect(() => {

        fetch(server + '/getStudents', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            credentials: 'include'
        })
            .then((result) => result.json())
            .then(data => {
                setStudents(data)

                setTimeout(() => {
                    setInitialized(true)
                }, 1000)
            })
            .catch(err => console.log(err))



        fetch(server + '/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            credentials: 'include'
        })
            .then((result) => result.json())
            .then(data => {
                setTutor(data)
            })
            .catch(err => console.log(err))


    }, [])

    function calculateTotal() {
        let hours = durationHourRef.current ? Number(durationHourRef.current) : 0;
        let minutes = durationMinuteRef.current ? Number(durationMinuteRef.current) : 0;
        let rate = rateRef.current ? Number(rateRef.current) : tutor.rate

        let totalMinutes = hours * 60 + minutes
        let totalAmt = totalMinutes * rate / 60
        return totalAmt;
    }

    function handleSubmitLesson(total) {

        const hours = durationHourRef.current ? Number(durationHourRef.current) : 0;
        const minutes = durationMinuteRef.current ? Number(durationMinuteRef.current) : 0;
        const rate = rateRef.current ? Number(rateRef.current) : tutor.rate
        const totalMinutes = hours * 60 + minutes

        const data = {
            studentId: currentStudent._id,
            duration: totalMinutes,
            rate: rate,
            subject: subjectRef.current,
            lessonType: lessonTypeRef.current ? lessonTypeRef.current : 'In-person',
            tutorConfirmed: checkRef.current,
            tutorName: tutor.firstName + ' ' + tutor.lastName,
            studentName: currentStudent.first_name + ' ' + currentStudent.last_name,
        }

        fetch(server + '/submitLesson', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then((result) => result.json())
            .then(data => {

                setTimeout(() => {
                    setLoading(false)
                    setLessonSubmitted(true)
                    setTimeout(() => {
                        setShowSubmit(false)
                        setShowSubmitConfirmation(false)
                        setCurrentStudent(null)
                        setLessonSubmitted(false)

                    }, 4000);
                }, 1000)

            })
            .catch(err => console.log(err))

        setLoading(true)
    }

    return (
        <div className="h-full relative flex justify-center p-10 w-full font-roboto">
            <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl h-full w-full md:w-3/4 md:pt-3 lg:w-1/2 xl:w-1/3 flex justify-start relative overflow-auto flex-col items-center">
                {showSubmit ?
                    <AnimatePresence>
                        {!showSubmitConfirmation ? <motion.div
                            key={v4()}
                            initial={{ opacity: 0, y: 500 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 500 }}
                            transition={{ duration: .2, ease: "easeOut" }}
                            className="overflow-y-auto h-full w-full"
                        >
                            <div className="h-full w-full p-2 flex flex-col">
                                <div className="flex justify-start items-center gap-2 w-full p-2">
                                    <IconButton color="primary" size="small" onClick={() => {
                                        setTimeout(() => {
                                            setCurrentStudent(null)
                                            setShowSubmit(false)
                                        }, 400)
                                    }}>

                                        <img src={backArrow} alt="back" className="h-5" />
                                    </IconButton>
                                    <div className="text-sm font-roboto">Submit Lesson for <span className="font-roboto-title">{currentStudent.first_name + ' ' + currentStudent.last_name.slice(0, 1)}</span></div>
                                </div>
                                <div className="border-b border-gray-400 mx-2"></div>


                                <div className="flex flex-col justify-between grow">
                                    <div className="flex flex-col gap-5">
                                        <div className="px-10 pt-5">
                                            <div className="flex w-full justify-between">
                                                <div className="text-xl">Subject: </div>
                                                <select name="" id="" defaultValue={subjectRef.current && subjectRef.current} onChange={(e) => subjectRef.current = e.target.value}>
                                                    <option value="Select" >Select</option>
                                                    {tutor && tutor.subjects.length > 0 && tutor.subjects.map(subject => {
                                                        return (
                                                            <option key={v4()} value={`${subject}`}>{subject}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="flex w-full justify-between mt-5">
                                                <div className="text-xl">Lesson Type: </div>
                                                <select name="" id="" defaultValue={lessonTypeRef.current && lessonTypeRef.current} onChange={(e) => lessonTypeRef.current = e.target.value}>
                                                    <option value="In-person" >In-person</option>
                                                    <option value="Online" >Online</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="px-10 pt-5">
                                            <div className="flex w-full justify-start gap-10">
                                                <div className="text-xl">Duration: </div>
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex justify-between items-center">
                                                        <select name="hours" id="" defaultValue={durationHourRef.current && durationHourRef.current} onChange={(e) => durationHourRef.current = e.target.value}>
                                                            {Array.from({ length: 13 }, (_, i) => (
                                                                <option key={v4()} value={i}>
                                                                    {i}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div>Hours</div>
                                                    </div>
                                                    <div className="flex justify-between gap-2 items-center">
                                                        <select name="minutes" id="" defaultValue={durationMinuteRef.current && durationMinuteRef.current} onChange={(e) => durationMinuteRef.current = e.target.value}>
                                                            {Array.from({ length: 4 }, (_, i) => (
                                                                <option key={v4()} value={i * 15}>
                                                                    {i * 15}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div>Minutes</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-10 pt-5">
                                            <div className="flex w-full justify-between gap-10">
                                                <div className="text-xl">Rate: </div>
                                                <div className="flex">
                                                    <input type="number" placeholder={rateRef.current ? rateRef.current : tutor.rate} className="w-10 text-center" onChange={(e) => rateRef.current = e.target.value} />
                                                    <div>/hr</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        disableElevation
                                        sx={{
                                            textTransform: 'none',
                                            borderRadius: 2,
                                            px: 3,
                                            py: 1.5,
                                            mx: 2
                                        }}
                                        onClick={() => {
                                            if ((subjectRef.current === null || subjectRef.current === 'Select') || ((durationHourRef.current === null || durationHourRef.current === '0') && (durationMinuteRef.current === null || durationMinuteRef.current === '0'))) { return }
                                            setShowSubmitConfirmation(true)
                                        }}
                                    >Submit Lesson</Button>
                                </div>


                            </div>
                        </motion.div> :
                            <motion.div
                                key='studentSelect'
                                initial={{ opacity: 0, y: 500 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: .5, ease: "easeOut" }}
                                className="overflow-y-auto h-full w-full absolute top-0 left-0 z-30 bg-white"
                            >
                                <div className="flex gap-3 p-3">
                                    <img src={backArrow} alt="back" className="h-8" onClick={() => setShowSubmitConfirmation(false)} />
                                    <div className="text-2xl font-roboto-title">Review Submit</div>
                                </div>
                                <div className="p-5 w-full flex flex-col">
                                    <div className="text-xl flex justify-between py-3">Subject: <span className="text-base font-roboto-title-italic">{subjectRef.current}</span></div>
                                    <div className="text-xl flex justify-between py-3">Lesson Type: <span className="text-base font-roboto-title-italic">{lessonTypeRef.current ? lessonTypeRef.current : 'In-person'}</span></div>
                                    <div className="text-xl flex justify-between py-3">Duration: <span className="text-base font-roboto-title-italic">{(durationHourRef.current ? durationHourRef.current : 0) + ' Hours and ' + (durationMinuteRef.current ? durationMinuteRef.current : 0) + ' Minutes'}</span></div>
                                    <div className="text-xl flex justify-between py-3">Rate: <span className="text-base font-roboto-title-italic">{(rateRef.current ? rateRef.current : tutor.rate) + '/Hour'}</span></div>
                                    <div className="text-xl flex justify-between py-3">Total: <span className="text-base font-roboto-title-italic">${calculateTotal()}</span></div>
                                    <div className="flex text-xs items-center pb-5">
                                        <Checkbox onChange={(e) => checkRef.current = e.target.checked} />
                                        <div>"I certify that the information provided above is true and accurate."</div>
                                    </div>
                                    {!loading && !lessonSubmitted &&
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            disableElevation
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: 2,
                                                px: 3,
                                                py: 1.5,
                                                mx: 2,
                                            }}
                                            onClick={() => {
                                                if (checkRef.current === true) {
                                                    handleSubmitLesson(calculateTotal())
                                                }
                                            }}
                                        >Submit</Button>}
                                    {loading && !lessonSubmitted &&
                                        <div className="w-full flex justify-center">
                                            <CircularProgress />
                                        </div>}
                                    {!loading && lessonSubmitted &&
                                        <div className="w-full flex justify-center">
                                            <div className="flex justify-between items-center w-44">
                                                <TypingText text="Lesson Submitted" speed={100} />
                                                <div className="h-10">
                                                    <AnimatedCheckmark speed = {2.5}/>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </motion.div>}
                    </AnimatePresence> :
                    <motion.div
                        key='studentSelect'
                        initial={{ opacity: 0, y: -200 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: .2, ease: "easeOut" }}
                        className="overflow-y-auto h-full w-full"
                    >
                        <div className="max-h-full">
                            <div className="text-2xl p-5 w-full text-center">Submit Lesson</div>
                            <div className="w-full px-2">
                                <div className="border-gray-300 border-b flex justify-between">
                                    <div className="font-roboto-title-italic p-2">Select Student:</div>
                                </div>
                            </div>
                            <div className="w-full h-full">
                                {initialized ?
                                    <div>
                                        {students.length > 0 ?
                                            <div className="h-full overflow-scroll">
                                                {students.map(student => {
                                                    return (
                                                        <div className="w-full justify-center flex" key={v4()}>
                                                            <div className="flex justify-between items-center w-48 p-3">
                                                                <div>{student.first_name + ' ' + student.last_name.slice(0, 1)}</div>
                                                                <IconButton color="primary" size="small" onClick={() => {
                                                                    setTimeout(() => {
                                                                        setCurrentStudent(student)
                                                                        setShowSubmit(true)
                                                                    }, 500)
                                                                }}>
                                                                    <img src={plus} alt="plus" className="h-7" />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div> :
                                            <div className="h-full w-full flex justify-center items-start pt-10">
                                                <div className="w-8/12">
                                                    <div className="text-center p-1">You Have No Students!</div>
                                                    <div className="text-xs text-gray-700 text-center">
                                                        Don't worry! Be patient and give them some time to find you!
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div> :
                                    <div className="w-full h-full flex justify-center items-start pt-10">
                                        <CircularProgress size={50} />
                                    </div>
                                }
                            </div>
                        </div>
                    </motion.div>
                }

            </div>
        </div>
    )
}