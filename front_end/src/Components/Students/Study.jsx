import coming_soon_koala from '/assets/coming_soon_koala.svg'
import { AnimatePresence, motion } from 'framer-motion';


export default function Study() {
    return (
        <div className="h-11/12 w-9/12">
            <div className="flex justify-start items-center h-full w-full overflow-scroll flex-col bg-[rgba(255,255,255,0.75)] rounded-3xl shadow-lg font-roboto py-20" >
                <motion.div
                    key="studentSelect"
                    initial={{ opacity: 0, y: -500 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                    }}
                    className="flex flex-col justify-center items-center"
                >
                    <img src={coming_soon_koala} alt="" className='w-10/12' />
                    <div className='text-4xl font-roboto-title'>Coming Soon</div>
                </motion.div>
            </div>
        </div>
    )
}