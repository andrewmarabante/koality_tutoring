import { AnimatePresence, motion } from 'framer-motion';
import cockroach from '/assets/cockroach.svg';
import policeman from '/assets/policeman.svg';
import { Button } from "@mui/material"



export default function ReportABug() {


    function handleSubmit(e) {
        e.preventDefault()

    }
    return (
        <div className="h-full relative flex justify-center p-10 w-full">
            <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl h-full flex justify-center relative overflow-auto w-full font-roboto">
                <motion.div
                    initial={{ opacity: 0, y: 500 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: .5, ease: "easeOut" }}
                    className='w-full'
                >
                    <div className='flex flex-col justify-between h-full w-full'>
                        <div className='w-full'>
                            <div className='text-3xl font-roboto-title py-5 text-center'>Report A Bug</div>
                            <div className='text-center'>Experience a bug? Tell us about it!</div>
                            <form onSubmit={handleSubmit} className='w-full'>
                                <div className="flex justify-between flex-col p-2 w-full">
                                    <div className="text-lg text-start py-1 px-2 font-roboto-title">Title:</div>
                                    <input type="text" placeholder='Text is overflowing first name box' className=" border-gray-300 border rounded-lg p-1 h-fit w-full px-2" name="title" />
                                </div>
                                <div className="flex justify-between flex-col p-2 w-full">
                                    <div className="text-lg text-start py-1 px-2 font-roboto-title">Description:</div>
                                    <textarea type="text" placeholder='Text is overflowing the borders of the first name input box under the profile section.
                                    I am accessing this using the safari browser on an iPhone SE 
                                    ' className=" border-gray-300 border rounded-lg p-1 h-32 w-full px-2" name="description" />
                                </div>
                                <div className='px-2'><Button color='warning' fullWidth variant='contained'>Exterminate</Button></div>
                            </form>
                        </div>
                        <div className='flex px-10'>
                            <motion.div
                                initial={{ opacity: 0, x: -500 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: .75, ease: "easeOut", delay: 4 }}
                            >
                                <img src={policeman} alt="policeman" className='h-20' />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 500 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 3.5, ease: "easeOut" }}
                            >
                                <img src={cockroach} alt="cockroach" className='h-20' />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
                <div className='h-5 w-full bg-gradient-to-t from-white to-transparent z-20 opacity-90 absolute bottom-0 rounded-4xl'></div>
            </div>
        </div>
    )
}