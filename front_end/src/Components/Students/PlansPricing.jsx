import { useEffect, useState, useRef } from 'react'
import backArrow from '/assets/whiteBackArrow.svg'
import send from '/assets/send.svg'
import gentlemenKoala from '/assets/gentlemenKoala.svg'
import goodKoala from '/assets/goodKoala.svg'
import dumbKoala from '/assets/dumbKoala.svg'
import regKoala from '/assets/regKoala.svg'

import { CircularProgress } from "@mui/material";
import { AnimatePresence, motion } from 'framer-motion';
import { v4 } from 'uuid';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Pagination } from 'swiper/modules';

export default function PlansPricing() {

    const [showDetails, setShowDetails] = useState(false)
    const [plans, setPlans] = useState(false)
    const [loading, setLoading] = useState(true)

    const server = import.meta.env.VITE_SERVER


    useEffect(() => {

        fetch(server + 'membershipTotal', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(count => {

                setTimeout(() => {

                    setLoading(false)
                    setPlans([
                        { title: 'The Great Koala', price: '$10/hr', desc: '"The first. The wisest. The Great Koala watches over all who dare to learn."', img: gentlemenKoala, total: 'Total Available: 10', available: false, lastFew: false },
                        { title: 'The Good Koala', price: '$15/hr', desc: '"Steady as the trees they rest in, the Good Koala brings focus and calm to every lesson."', img: goodKoala, total: 'Total Available: 15', available: count > 20 ? false : true, lastFew: true },
                        { title: 'Regular Koala', price: '$20/hr', desc: '"Just a chill guy"', img: regKoala, total: 'Total Available: 20', available: count > 35 ? false : true, lastFew: (count > 20 ? true : false), },
                        { title: 'KoALa', price: '$25/hr', desc: '"I mean... Its still a koala"', img: dumbKoala, total: 'Total Available: Unlimited', available: true, lastFew: false }
                    ])
                }, 1500)
            })
            .catch(err => console.log(err))

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
                    >
                        <div className="text-4xl pt-5 pb-3 border-b border-black text-center mx-10">Memberships</div>

                        <motion.div
                            key="messages"
                            initial={{ opacity: 0, x: 500 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <div className='mx-10 font-roboto-title-italic pt-5 text-xs'>
                                Private education can be expensive and unsustainable. We want to offer
                                more affordable options that allow students to commit to consistent tutoring
                                while maintaining quality and effectiveness.
                                <div className='text-blue-400 text-end' onClick={() => { showDetails ? setShowDetails(false) : setShowDetails(true) }}>
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

                <div className='h-full w-full px-5'>
                    <AnimatePresence>
                        {loading &&
                            <motion.div className="w-full my-5 flex justify-center py-5"
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 0, transition: { duration: 1.5, ease: "easeIn" }}}
                                transition={{ duration: .5, ease: "easeOut", delay: 1 }}
                            >
                                <CircularProgress size={50} />
                            </motion.div>
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {plans && <motion.div className="w-full my-5"
                            initial={{ opacity: 0, y: 500 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                        >
                            <Swiper
                                modules={[Pagination]}
                                pagination={{ clickable: true }}
                                spaceBetween={16}
                                slidesPerView={1}
                                style={{ paddingBottom: '1rem' }}
                            >
                                {plans && plans.map((plan, i) => (
                                    <SwiperSlide key={i} className='pb-5'>
                                        <Box display="flex" justifyContent="center">
                                            <Card sx={{ width: 500, height: 250, px: 2 }}>
                                                <CardContent sx={{ height: 200 }}>
                                                    <Typography variant="h5" gutterBottom>{plan.title}</Typography>
                                                    <div className='flex flex-col justify-between h-full'>
                                                        <div className='flex justify-between pr-5'>
                                                            <div className='flex flex-col justify-between'>
                                                                <Typography variant="h4" color="primary">{plan.price}</Typography>
                                                                <div className='text-xs font-roboto'>{plan.total}</div>
                                                            </div>
                                                            <img
                                                                src={plan.img}
                                                                alt={plan.title}
                                                                className="h-20"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className='text-xs font-roboto-title-italic py-2'>{plan.desc}</div>
                                                            {!plan.available && <Button variant="text" color='warning' fullWidth>SOLD OUT</Button>}
                                                            {plan.available && !plan.lastFew && <Button variant="contained" fullWidth>Sign up</Button>}
                                                            {plan.available && plan.lastFew && <Button variant="contained" color='secondary' fullWidth>last few remaining</Button>}

                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className='text-xs font-roboto-title-italic text-center p-2'>All plans are the same, with limited availability. First come first serve!</div>
                        </motion.div>}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}