export default function GettingStarted(){
    return(
            <div className="h-full relative flex justify-center p-10">
                <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl h-full md:w-3/4 md:pt-3 lg:w-1/2 xl:w-1/3 flex justify-center relative overflow-auto">
                    <div className="overflow-scroll h-full p-5 max-w-96">
                        <div className="text-4xl font-roboto border-b text-center mx-3 pb-3">Getting Started</div>
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 1: Verify Email</div>
                        <div className="text-sm font-roboto px-2">
                            Take a second and go to your profile to verify your email! Any account without a verified 
                            email after 7 days is automatically deleted.
                        </div>
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 2: Quick Interview</div>
                        <div className="text-sm font-roboto px-2">
                            I just gotta make sure you're not a freak real quick. Head over to the messages
                            tab and create a message for Bossman letting him know you're ready to interview!
                        </div>
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 3: Set Schedule</div>
                        <div className="text-sm font-roboto px-2">
                            Go to the "Schedule" tab and create your schedule for at least 2 weeks in advance
                            so students know when you're available!
                        </div>
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 4: Wait</div>
                        <div className="text-sm font-roboto px-2">
                            Wait until a student reaches out to you! This may take days, it may take 5 minutes,
                            being a new company we don't have the same student base as larger companies, but we 
                            don't have the same tutor base either so be patient, odds are good!
                        </div>
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 5: Submit Lesson</div>
                        <div className="text-sm font-roboto px-2">
                            Congratulations!! You got your first student and completed your first lesson. All
                            that's left to do now is head over to the "Submit Lesson" tab and submit the lesson for that
                            student.
                        </div>
                    </div>
                    <div className='h-5 w-full bg-gradient-to-t from-white to-transparent z-20 opacity-90 absolute bottom-0 rounded-4xl'></div>
                </div>
            </div>
    )
}