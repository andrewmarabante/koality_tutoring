import TypeNormal from '../Animations/TypeNormal'
import { AnimatePresence, motion } from 'framer-motion';


export default function Overview() {
  return (
    <div className="p-7 grow overflow-hidden z-20 flex justify-center md:pt-20 ">
      <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl p-5 h-fit w-fit overflow-auto md:py-10 md:px-15 lg:px-28 lg:py-16 xl:px-44">
        <div className="text-center text-4xl font-roboto-title text-gray-700 border-b border-gray-400 pb-2 px-5 min-h-24">
          <TypeNormal text='Welcome to Koality Tutoring' speed={100} />
        </div>
        <motion.div
          key='studentSelect'
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="text-2xl px-5 pt-5 font-roboto max-w-96">
            Koality Tutoring is a private tutoring
            company that provides students with high-end, capable tutors at affordable prices.
            You can trust us to provide you with the best, <span className="pr-1 font-roboto-title-italic">koality</span> tutoring that every student deserves.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
