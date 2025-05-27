import { AnimatePresence, motion } from 'framer-motion';

export default function WhyUs() {
    return (
        <div className="flex-col grow justify-center items-center z-40 p-10 overflow-hidden relative">
            <div className="h-full relative flex justify-center">
                <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl h-full flex justify-center md:w-9/12 lg:w-1/2 xl:w-1/3 relative">
                    <div className='h-5 w-full bg-gradient-to-t from-white to-transparent z-20 opacity-90 absolute bottom-0 rounded-4xl'></div>

                    <div className="max-w-96 overflow-auto h-full p-5">

                    <motion.div
                            initial={{ opacity: 0, y: -200 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1.25, ease: "easeOut" }}
                        >
                        <div className="text-4xl font-roboto border-b text-center mx-3 pb-3">Why Us??</div>
                    </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 500 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1.25, ease: "easeOut" }}
                        >
                            <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Affordable Rates:</div>
                            <div className="text-sm font-roboto px-2">
                                At Koality Tutoring, we believe that personalized education
                                doesn't have to break the bank. Unlike larger platforms like Wyzant
                                or Varsity Tutors, we offer affordable rates without compromising on quality.
                                Our mission is to make exceptional tutoring accessible to <span className="font-roboto-title-italic">all</span> students, ensuring that
                                everyone has the opportunity to excel academically.
                            </div>
                        </motion.div>

                        <motion.div
                            key='studentSelect'
                            initial={{ opacity: 0, x: -500 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1.25, ease: "easeOut" }}
                        >
                            <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Personally-Vetted Tutors</div>
                        <div className="text-sm font-roboto px-2">
                            A Koality Tutor values charisma and passion in education. Unlike larger
                            platforms where the tutor application process may involve basic steps such as completing
                            an online profile and passing a test, we go beyond the basics. Our tutors
                            undergo a face to face selection process that evaluates not only their subject matter expertise,
                            but also their dedication to teaching and ability to inspire students. This ensures that
                            every tutor we connect you with is not just qualified, but genuinely committed to your
                            academic success.
                        </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 500 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1.25, ease: "easeOut" }}
                        >
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Support Local Business</div>
                        <div className="text-sm font-roboto px-2">
                            Support the Koalas! Most, if not all , of the tutors on this site are students that are
                            in school just like you! This platform gives them a fair place to host their services.
                            You will come to find that the vast majority of passionate educators are people who struggled
                            as well. We gotta stick together!
                        </div>
                        </motion.div>

                    
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Ease of Access</div>
                        <div className="text-sm font-roboto px-2">
                            No need for lengthy sign-ups or account creations. Your educational support is just a text message away.
                        </div>
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">We're Just B E T T E R</div>
                        <div className="text-sm font-roboto px-2">
                            Don't be weird. Just schedule a lesson!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}