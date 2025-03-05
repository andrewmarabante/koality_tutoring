import { useEffect, useState } from "react"


export default function ViewTutors({tutors, subject}){

    const [validTutors, setValidTutors] = useState([])

    useEffect(() => {

        if(tutors){
            setValidTutors(tutors.filter(tutor => tutor.subjects.includes(subject)))
        }

    }, [])



    return(
        <div className="p-2 w-full">
            {validTutors.map(tutor => {
                return(
                    <div className="flex justify-between w-full border border-gray-300 rounded-2xl p-2">
                        <div className="flex gap-2 items-center">
                            <img src={tutor.photo} className="rounded-full h-15" alt="" />
                            <div className="h-full flex flex-col">
                                <div className="text-xl">{tutor.first_name + ' ' + tutor.last_name.charAt(0) + '.'}</div>
                            </div>
                        </div>
                        <div className="text-center font-roboto-title">{'$'+tutor.rate + '/hr'}</div>
                    </div>
                )
            })}
        </div>
    )
}