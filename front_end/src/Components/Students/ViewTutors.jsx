import { useEffect, useState } from "react"
import fivestar from '/assets/fivestar.svg'
import clock from '/assets/clock.svg'

import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { v4 } from "uuid";


export default function ViewTutors({tutors, subject, openViewTutor}){

    const [validTutors, setValidTutors] = useState([])

    useEffect(() => {

        if(tutors){
            setValidTutors(tutors.filter(tutor => tutor.subjects.includes(subject)))
        }

    }, [])



    return(
        <div className="p-2 w-full h-full flex flex-col gap-5 pt-5">
            {validTutors.map(tutor => {
                return(
                    <div className="flex justify-between w-full border border-gray-300 shadow-lg rounded-2xl p-2 bg-white h-fit" key={v4()}>
                        <div className="w-full flex flex-col">
                            <div className="w-full flex border-b border-gray-300 pb-2 mb-2">
                                <div className="flex grow justify-between">
                                    <div className="flex gap-2 items-center" onClick={() => openViewTutor(tutor._id)}>
                                        <img src={tutor.photo} className="rounded-full h-15" alt="" />
                                        <div className="h-full flex flex-col justify-around">
                                            <div className="text-xl text-blue-800">{tutor.first_name + ' ' + tutor.last_name.charAt(0) + '.'}</div>
                                            <div className="font-roboto-title-italic text-xs">{tutor.title}</div>
                                        </div>
                                    </div>
                                    <div className="text-center font-roboto-title">{'$'+tutor.rate + '/hr'}</div>
                                </div>
                            </div>
                            {tutor.topReview && tutor.topReview !== '' ? <div className="text-xs"><span><FormatQuoteIcon fontSize="small" className="pb-2"/></span>{tutor.topReview}</div> :
                            <div className="text-xs">{tutor.bio}</div>}
                            <div className="w-full flex justify-between items-center py-1">
                                <div className="flex gap-1 items-center">
                                    <img src={clock} alt="clock" className="h-5" />
                                    <div className="text-xs text-blue-700 font-roboto-title-italic">{tutor.hours ? tutor.hours + 'hours tutored' : '0 hours tutored'}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {tutor.rating && <img src={fivestar} className="h-3" alt="stars" />}
                                    <div className="text-xs">{tutor.rating ? tutor.rating + '(' + tutor.reviews.length + ')' : 'No Rating'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {validTutors.length === 0 && <div className="font-roboto-title-italic text-xs text-center">
                Unfortunately we have no tutors for this subject right now! <br />
                If you can tutor this subject please join us!
            </div>}
        </div>
    )
}