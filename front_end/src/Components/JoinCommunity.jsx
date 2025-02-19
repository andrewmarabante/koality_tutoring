import comingSoonKoala from '/assets/coming_soon_koala.svg'

export default function JoinCommunity(){
    return (
        <div className="p-7 grow overflow-hidden z-20 flex justify-center md:pt-15 xl:pt-32">
          <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl h-fit overflow-auto flex flex-col justify-start items-center py-10 px-10 w-fit">
            <img src={comingSoonKoala} alt="comingSoon" className='h-40 md:h-56 lg:h-64 xl:h-96' />
            <div className='text-4xl font-roboto-title-italic text-center'>Coming Soon</div>
          </div>
        </div>
      );
}