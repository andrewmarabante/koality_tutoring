import mobileApp from '/assets/mobile_application.svg'

export default function MobileOnlyError(){


    return(
        <div className="w-screen h-screen flex justify-center items-center bg-blue-100">
            <div className='h-full flex flex-col justify-center items-center w-full gap-5'>
                <img src={mobileApp} alt="mobileApp" className='h-1/2'/>
                <div className='text-2xl font-roboto-title-italic max-w-1/2'>This Website is designed for mobile users, please switch to mobile or change your resolution to access!</div>
            </div>
        </div>
    )
}