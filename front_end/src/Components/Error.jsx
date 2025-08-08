import winnie from '/assets/winnie_error.jpeg'

export default function Error(){
    return(
        <div className="h-screen w-screen flex flex-col justify-center items-center font-roboto-title gap-5">
                <div className='text-4xl'>404 Not Found</div>
                <img src={winnie} alt='winnie_picture' className='w-11/12 rounded-4xl'/>
                <div>The page you are looking for does not exist!</div>
        </div>
    )
}