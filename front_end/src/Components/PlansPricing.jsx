export default function PlansPricing(){
    return(
        <div className="grow z-40 p-10 overflow-hidden relative flex justify-center lg:pt-10">
                <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl h-fit md:w-3/4 md:px-15 lg:w-1/2 xl:w-1/3">
                    <div className=" p-5 h-full overflow-scroll">
                        <div className="text-4xl font-roboto border-b text-center mx-3 pb-3">Plans / Pricing</div>
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Plans</div>
                        <div className="text-sm font-roboto px-2">
                            There are currently no plans offered but that is soon to change!
                            Group tutoring will soon be available and accomplish sustainability by offering
                            a <span className="font-roboto-title-italic">very</span> affordable plan! Sometimes, having a few study buddies is better!
                        </div>
                        <div className="text-xl font-roboto pt-5 px-2 pb-1 w-fit">Pricing</div>
                        <div className="text-sm font-roboto px-2 pb-5">
                            In the spirit of growing our student base, we are
                            offering premium tutoring for as low as $30 and limiting the highest rate at $50 per hour!
                            Prices vary from subject to subject and tutor to tutor. Rates will be sent with confirmation
                            message.
                        </div>
                    </div>
                </div>
        </div>
    )
}