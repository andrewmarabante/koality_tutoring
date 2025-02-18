import comingSoonKoala from '/assets/coming_soon_koala.svg'

export default function JoinCommunity(){
    return (
        <div className="p-7 grow overflow-hidden z-20">
          <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl p-5 h-full overflow-auto flex flex-col justify-start items-center pt-20">
            <img src={comingSoonKoala} alt="comingSoon" className='h-40' />
            <div className='text-4xl font-roboto-title-italic text-center'>Coming Soon</div>
          </div>
        </div>
      );
}