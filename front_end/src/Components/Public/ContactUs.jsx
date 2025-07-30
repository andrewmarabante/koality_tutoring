import { AnimatePresence, motion } from 'framer-motion';

export default function ContactUs(){
    return(
        <div className="p-7 grow overflow-hidden z-20 flex justify-center">
        <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl md:w-3/4 h-fit md:py-5 lg:w-1/2 xl:w-1/3">
          <div className=" p-5 h-fit overflow-auto">
          <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="text-center text-4xl font-roboto-title text-gray-800 border-b border-black pb-2">
                Contact Us
              </div>
        </motion.div>
              <motion.div
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="text-2xl px-5 pt-5 font-roboto">
                Sometimes a teacher doesn't answer all of the questions, just like a website
                might not answer all of yours! We've got you covered, email <span className="text-lg font-roboto-title-italic ">koalitytutors@gmail.com</span> OR 
                create an account and message "Boss Man" for any
                additional questions!
              </div>
        </motion.div>
              
          </div>
        </div>
      </div>
    )
}