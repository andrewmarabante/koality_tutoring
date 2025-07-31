import { useEffect, useState, useRef } from "react"
import IconButton from '@mui/material/IconButton';
import backArrow from '/assets/backArrow.svg';
import plus from '/assets/plus.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 } from "uuid";



export default function NewChat({ setCreate, currentUser }) {

    const [showTroll, setShowTroll] = useState(false);
    const [recipients, setRecipients] = useState([]);

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
                setRecipients(data)
            })
            .catch(err => console.log(err))

    }, [])



    return (
        <div className="font-roboto-title text-lg w-full p-2">
            <div className="flex justify-start w-full items-center">
                <IconButton onClick={() => setTimeout(() => setCreate(false), 175)} color="primary" aria-label="add to shopping cart" size="small">
                    <img src={backArrow} alt="back" className="h-7" />
                </IconButton>
                <div className="text-nowrap">New Conversation:</div>
            </div>
            <div className="border-gray-300 border-b flex justify-between">
                <div className="font-roboto-title-italic p-2">Select Recipients:</div>
                <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={()=>setShowTroll(true)}>
                    <img src={plus} alt="plus" className="h-7" />
                </IconButton>
            </div>

            <AnimatePresence>
                <motion.div
                    key="messages"
                    initial={{ opacity: 0, y: 500 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: .75, ease: "easeOut" }}
                    className="overflow-y-auto h-full"
                >
                    <div className='p-2 flex flex-col gap-2 h-full overflow-scroll items-center'>
                        {/* {recipients && recipients.map(recipient => {

                            console.log('here')
                            return (
                                <div className="flex justify-between mx-5">
                                    <div key={v4()} className="font-roboto text-lg">{recipient.first_name + ' ' + recipient.last_name.slice(0, 1)}</div>
                                    <IconButton color="primary" aria-label="add to shopping cart" size="small">
                                        <img src={plus} alt="plus" className="h-7" />
                                    </IconButton>
                                </div>
                            )
                        })} */}
                        <div className="font-roboto text-xs py-5 px-5 max-w-10/12 inline-block relative w-fit">
                            This feature is currently disabled. Group messages will be coming soon
                            but for now you will not need to make a new message since all of your students
                            will have active chats!
                        </div>
                        {showTroll && <motion.div
                    key={'troll'}
                    initial={{ opacity: 0, y: 500 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: .75, ease: "easeOut" }}
                    className="overflow-y-auto h-fit"
                >
                    <div className="w-full text-center">I SAID IT'S DISABLED BRO STOP CLICKING THINGS</div>
                </motion.div>}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}