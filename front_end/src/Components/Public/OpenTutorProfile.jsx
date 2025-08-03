import fivestar from '/assets/fivestar.svg'
import clock from '/assets/clock.svg'
import up from '/assets/up.svg'
import backArrow from '/assets/backArrow.svg'

import message from '/assets/message.svg'
import { IconButton, Button } from '@mui/material'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 } from 'uuid'

export default function OpenTutorProfile({ tutor, closeViewTutor, setSection }) {

    const [showReviews, setShowReviews] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [messageAlert, setMessageAlert] = useState('')

    const server = import.meta.env.VITE_SERVER + 'student'

    function toggleReviews() {
        if (showReviews) {
            setShowReviews(false)
        } else {
            setShowReviews(true)
        }
    }



    return (
        <div className="w-full h-full flex flex-col min-h-0">
            <div className="flex p-2 gap-2 items-start">
                <img src={tutor.photo} alt="Photo" className="rounded-full h-32 border border-gray-300" />
                <div className="flex flex-col">
                    <div className="text-lg font-roboto-title">{tutor.first_name + ' ' + tutor.last_name.charAt(0) + '.'}</div>
                    <div className="">{tutor.title}</div>
                </div>
            </div>
            <div className="flex items-center justify-between gap-2 px-5 pb-1">
                {tutor.rating ? <div className='flex gap-1 items-center font-roboto-title'><img src={fivestar} alt="" className='h-4' />{tutor.rating.toFixed(1)}</div> : <div className='font-roboto-title-italic text-sm text-gray-500 px-2'>No Rating</div>}
                {!showMessage && <div onClick={toggleReviews} className='text-blue-500'>{!showReviews ? '(' + tutor.reviews.length + ' reviews)' : <div className='flex items-center gap-1'>Close <img src={up} alt="up" className='h-5' /></div>}</div>}
            </div>

            {!showReviews && !showMessage && <div className="border-gray-300 border-t mx-5"></div>}

            <div className='h-full'>
                <div className={`relative h-full ${showReviews && 'overflow-hidden'}`}>
                    <motion.div
                        initial={{ y: "100%", opacity: 0, height: 0 }}
                        animate={{ y: showReviews ? 0 : "100%", opacity: showReviews ? 1 : 0, height: showReviews ? "100%" : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-full bg-white shadow-lg p-5 overflow-scroll"
                    >
                        <div className="font-roboto-title text-lg">Reviews</div>
                        <div className='p-3'>{tutor.reviews && tutor.reviews.map(review => {
                            return (
                                <div className='flex flex-col my-2 mb-16' key={v4()}>
                                    <div>{'"' + review.body + '"'}</div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-lg font-roboto'>{'-' + review.creator}</div>
                                        <div className='flex gap-1 items-center'>
                                            {review.rating && <img src={fivestar} alt="" className='h-3' />}
                                            <div className='font-roboto-title-italic'>{review.rating ? review.rating.toFixed(1) : 'No Rating'}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                            {!tutor.reviews || tutor.reviews.length === 0 && <div className='w-full text-center font-roboto-title-italic'>This tutor has no reviews</div>}
                        </div>

                    </motion.div>
                    <motion.div
                        initial={{ y: "100%", opacity: 0, height: 0 }}
                        animate={{ y: showMessage ? 0 : "100%", opacity: showMessage ? 1 : 0, height: showMessage ? "100%" : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-full bg-white shadow-lg overflow-scroll flex flex-col"
                    >
                        <div className='w-full flex justify-between bg-gray-200 py-3 p-1 shadow-md'>
                            <div className='flex items-center'>
                                <img src={backArrow} alt="" className='h-5' />
                                <div onClick={() => setShowMessage(false)}>Go Back</div>
                            </div>
                        </div>
                        <div className='grow flex flex-col p-5 py-2 relative h-full'>
                            <AnimatePresence>
                                {showMessage && <motion.div
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: .95 }}
                                    exit={{ y: -100, opacity: 0, transition: { delay: 0 } }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                                    className='absolute top-0 left-0 w-full h-full bg-gray-600 z-50 flex items-center justify-center'
                                >
                                    <div className='flex flex-col gap-5'>
                                        <div className='text-white font-roboto-title text-2xl'>
                                            Please sign in to message!
                                        </div>
                                        <Button type='submit' variant='contained' onClick={() => setSection('Join The Community')}>Create Account</Button>
                                        <Button type='submit' variant='contained' color='secondary' onClick={() => setSection('Login')}>Login</Button>
                                    </div>


                                </motion.div>}
                            </AnimatePresence>
                            <div className='p-2 text-xl font-roboto-title'>Message:</div>
                            <textarea className='border border-gray-300 rounded-2xl w-full h-1/3 p-3' name="message" placeholder={`Create a Message for ${tutor.first_name}! Be sure to add your name and some details about your situation and possible availability. `}></textarea>
                            {messageAlert && <div className='w-full text-center text-xs p-1 text-red-300'>{messageAlert}</div>}

                            <div className='flex my-3'>
                                <div className='p-2 text-xl font-roboto-title-italic'>Lesson Type:</div>
                                <select name="lessonType" id="" className='px-2'>
                                    <option value="inPerson">In-person</option>
                                    <option value="online">Online</option>
                                </select>
                            </div>
                            <div className='flex my-3'>
                                <div className='p-2 text-xl font-roboto-title-italic'>Frequency:</div>
                                <select name="frequency" id="" className='px-2 text-xs'>
                                    <option value="1">1 Lesson</option>
                                    <option value="2-3">2 or 3 Lessons</option>
                                    <option value="weekly">Once a Week</option>
                                    <option value="biweekly">Twice a Week</option>
                                    <option value="alot">More than twice a Week</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                    <div className='flex justify-between items-center px-5'>
                        <div className='flex items-center text-sm py-2'>
                            <img src={clock} alt="clock" className='h-5 pr-1' />
                            <div>{tutor.hours ? tutor.hours : '0' + ' hours tutored'}</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="font-roboto">Rate:</div>
                            <div className="font-roboto-title-italic text-lg">{'$' + tutor.rate + '/hour'}</div>
                        </div>
                    </div>
                    <div className="p-5 pt-0">
                        <div className="font-roboto-title text-lg">Bio:</div>
                        <div className="text-sm font-roboto-title-italic">{tutor.bio}</div>
                    </div>
                    <div className="p-5 pt-0">
                        <div className="font-roboto text-lg">Education:</div>
                        <div className="text-sm font-roboto-title-italic">{tutor.education}</div>
                    </div>
                    <div className="border-gray-300 border-t mx-5"></div>
                    <div className={`flex justify-center ${(showReviews || showMessage) && 'hidden'}`}>
                        <Button size='large' onClick={closeViewTutor} >
                            Back
                        </Button>
                    </div>
                </div>
                <div className={`bg-blue-100 rounded-4xl absolute bottom-5 right-5 transition-all duration-500 ease-in-out ${showMessage && 'opacity-0'}`}>
                    <IconButton onClick={() => setShowMessage(true)} color="primary" aria-label="add to shopping cart" size="large" style={{ height: '65px', width: '65px' }}>
                        <img src={message} alt="message" />
                    </IconButton>
                </div>
            </div>


        </div>
    )
}