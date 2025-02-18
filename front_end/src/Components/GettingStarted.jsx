export default function GettingStarted(){
    return(
        <div className="flex-col grow justify-center items-center z-40 p-10 overflow-hidden relative">
            <div className="h-full relative">
                <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl p-5 h-full overflow-scroll">
                    <div className="text-4xl font-roboto border-b text-center mx-3 pb-3">Getting Started</div>
                    <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 1: Subject</div>
                    <div className="text-sm font-roboto px-2">
                        Think about the current class you are taking, What's it called? Algebra 2? Organic Chemistry? 
                        Comparative Literature? Non-Euclidean Hyperbolic Geometry? This is your Subject, keep it in mind!
                    </div>
                    <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 2: Homework</div>
                    <div className="text-sm font-roboto px-2">
                        Somewhat optional, but try and take some pictures of your latest class material <span className="font-roboto-title-italic">a.k.a.</span> 'Homework'. This allows 
                        us to better understand where you are as a student and what we need to know before diving in to
                        a lesson! Doing this will personalize your lesson and overall enhance your tutoring experience.
                    </div>
                    <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 3: Schedule</div>
                    <div className="text-sm font-roboto px-2">
                        Head over to the "Schedule" tab and find a time that works with your schedule.
                    </div>
                    <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 4: Text</div>
                    <div className="text-sm font-roboto px-2">
                        Send a text to <span className="mr-1 font-roboto-title-italic">(951) 348-1243</span> that includes your Name, Subject,
                        Homework, and requested Schedule time. You will recieve a confirmation text with a tutor and rate.
                        (see plans and pricing)
                    </div>
                    <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Step 5: Show Up!</div>
                    <div className="text-sm font-roboto px-2">
                        We are currently only doing online lessons which will change soon. However, for now,
                        all you need is discord and a laptop or tablet! Your tutor will link you a drawing board on
                        discord and start your lesson!
                    </div>



                </div>
                <div className='h-5 w-full bg-gradient-to-t from-white to-transparent z-20 opacity-90 absolute bottom-0 rounded-4xl'></div>
            </div>
        </div>
    )
}