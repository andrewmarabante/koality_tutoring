import { useEffect, useState, useRef } from 'react'
import backArrow from '/assets/whiteBackArrow.svg'
import send from '/assets/send.svg'
import { CircularProgress } from "@mui/material";
import { AnimatePresence, motion } from 'framer-motion';
import { v4 } from 'uuid';

export default function PlansPricing() {

    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <div className="h-11/12 w-11/12 relative">
            <div className="flex justify-start items-center h-full w-full overflow-scroll flex-col bg-[rgba(255,255,255,0.75)] rounded-3xl shadow-lg font-roboto py-2">
                <AnimatePresence>
                    <motion.div
                        key="messages"
                        initial={{ opacity: 0, y: 500 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: .75, ease: "easeOut" }}
                        className="overflow-y-auto h-full"
                    >
                        <div className="text-4xl pt-5 pb-3 border-b border-black text-center mx-10">Memberships</div>

                        <motion.div
                            key="messages"
                            initial={{ opacity: 0, x: 500 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="overflow-y-auto h-full"
                        >
                            <div className='mx-10 font-roboto-title-italic py-5 text-xs'>
                                Private education can be expensive and unsustainable. We want to offer
                                more affordable options that allow students to commit to consistent tutoring
                                while maintaining quality and effectiveness. 
                                <div className='text-blue-400 text-end' onClick={() => {showDetails ? setShowDetails(false) : setShowDetails(true)}}>
                                    {showDetails ? 'Hide' : 'Details'}
                                </div>
                            </div>

                            <AnimatePresence>
                                {showDetails && <motion.div
                                    key="messages"
                                    initial={{ opacity: 0, y: -200 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -100 }}
                                    transition={{ duration: .5, ease: "easeOut" }}
                                    className=""
                                >
                                    <div className='mx-10 text-gray-600'>
                                        <div className='text-xs'>-Group sizes range from 1-4 students</div>
                                        <div className='text-xs'>-Memberships give you 1-2 lessons per week</div>
                                        <div className='text-xs'>-Lessons are 2 hours each</div>
                                    </div>
                                </motion.div>}
                            </AnimatePresence>
                        </motion.div>



                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}