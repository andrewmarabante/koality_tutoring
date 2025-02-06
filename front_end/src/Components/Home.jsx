import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material";
import backgroundImage from '../public/assets/background_image.jpg'
import koala from '../public/assets/koala.svg'
import { v4 } from "uuid"

export default function ViewSchedule(){

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const timeSlot = ['9am', '10:05am', '11:10am', '12:15pm', '1:20pm', '2:25pm', '3:30pm', '4:35pm', '5:40pm', '6:45pm', '7:50pm']
    const [loading, setLoading] = useState(true);
    const server = import.meta.env.VITE_SERVER + 'bigman'

    const [currentWeek, setCurrentWeek] = useState(0)
    const [weeksList, setWeeksList] = useState()
    const [reset, setReset] = useState()
    const [currentSchedules, setCurrentSchedules] = useState([])
    const [released, setReleased] = useState(false)

    const [availability, setAvailability] = useState(
        week.reduce((acc, day) => {
          acc[day] = timeSlot.reduce((slots, slot) => {
            slots[slot] = false;
            return slots;
          }, {});
          return acc;
        }, {})
      );

    let tempArray = [];
    for(let i= 0 ; i < 5; i++){

        let currentDate = new Date()
        let daysToSunday = currentDate.getDay()
        let weekStart = new Date(currentDate.setDate(currentDate.getDate() - daysToSunday + i*7))
        let weekEnd = new Date(currentDate.setDate(currentDate.getDate() +6))

        let data = {
            start: weekStart,
            end: weekEnd
        }

        tempArray.push(data)
    }

    if(!weeksList){
        setWeeksList(tempArray)
    }

    useEffect(() => {

        fetch(server, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            credentials: 'include'
        })
        .then(result => result.json())
        .then(data => {
            setCurrentSchedules(data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    },[reset])

   useEffect(() => {

    let tempCurrentWeek = (weeksList[currentWeek].start.toLocaleDateString('en-US'))

    let tempSchedule = currentSchedules.filter(schedule => {
        let tempDate = new Date(schedule.week.start).toLocaleDateString('en-US')
        if(tempDate == tempCurrentWeek){
            setAvailability(schedule.availability[0])
            setReleased(true)
            return schedule
        }
    })

    if(tempSchedule.length === 0){
        setAvailability(        
            week.reduce((acc, day) => {
            acc[day] = timeSlot.reduce((slots, slot) => {
              slots[slot] = false;
              return slots;
            }, {});
            return acc;
          }, {})
        )
        setReleased(false)
    }
    
    
   }, [currentSchedules, currentWeek])


    function handleChange(e){
        setCurrentWeek(parseInt(e.target.value))
    }

    return(

            <div className="p-5 h-screen overflow-scroll" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
                <div className="font-serif text-center text-4xl border-b text-nowrap pb-2">Koality Tutoring!</div>
                <div className="font-extralight text-xs text-center m-2">-Any time slot on here means I am available at this time for one hour!</div>
                <div className="font-extralight text-xs text-center m-2">If you want to schedule an appointment, shoot a text to <em>951 348 1243 </em>! 
                I tutor all computational maths, not your upper divs bro, and a lot of other
                subjects too! Let me know in your text!
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col justify-end">
                        <div className="flex justify-between">
                            <div className='pr-3 font-serif'>
                                Week:
                            </div>
                            {weeksList && <select onChange={handleChange} className="border-black border p-1 rounded-lg bg-white">
                                <option value="0">
                                    {weeksList && weeksList[0].start.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    }) + ' - ' + weeksList[0].end.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    })
                                    }
                                </option>
                                <option value="1">
                                    {weeksList && weeksList[1].start.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    }) + ' - ' + weeksList[1].end.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    })
                                    }
                                </option>
                                <option value="2">
                                    {weeksList && weeksList[2].start.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    }) + ' - ' + weeksList[2].end.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    })
                                    }
                                </option>
                                <option value="3">
                                    {weeksList && weeksList[3].start.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    }) + ' - ' + weeksList[3].end.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    })
                                    }
                                </option>
                                <option value="4">
                                    {weeksList && weeksList[4].start.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    }) + ' - ' + weeksList[4].end.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                    })
                                    }
                                </option>
                            </select>}
                        </div>
                        <div className="flex justify-between my-2">
                            <div className="font-serif">Rate:</div>
                             <div className="font-extralight bg-white rounded-xl p-1 border border-black">$35 per hour</div>
                        </div>
                    </div>
                    <img src={koala} alt="koala" className="relative h-30 rotate-25"/>
                </div>
                {released && !loading &&
                <div className="grid-cols-2 md:grid-cols-3 grid gap-5 border border-gray-100 p-2 rounded-xl shadow-lg mt-3 bg-white">
                    {week.map((day) => {
                        return(
                            <div key={day}>
                                <div className="text-center text-2xl border-b-2 p-2">{day}</div>
                                <div className='p-3'>
                                    {timeSlot.map(time => {
                                        return(
                                            <div className={`flex justify-center + ${availability[day][time] && 'hidden'} `}key={v4()}>
                                                <div >{time}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>}
                {!released && !loading && 
                <div className="text-lg text-center bg-white rounded-2xl min-h-48 shadow-2xl flex justify-center items-start p-5">
                    <div>
                        <div className="border-b border-black mx-5 mb-2">Schedule Not Released Yet!</div>
                        <div className="text-xs font-extralight">Sorry I don't want to waste my time styling this website lol. It gets the job done.</div>
                    </div>
                </div>}
                {loading && 
                <div className="flex justify-center pt-10">
                    <CircularProgress size={100}/>
                </div>}
                <div className="pt-5 font-extralight text-center"> <span className="border-b border-black">I am hiring tutors for these subjects:</span> </div>
                <ul className="text-xs font-light grid grid-cols-3 px-5 text-center py-2">
                    <li>-Math</li>
                    <li>-English</li>
                    <li>-Chemistry</li>
                    <li>-Biology</li>
                    <li>-Econ</li>
                </ul>
                <div className="pt-5 text-xs font-extralight text-center">
                    I will also potentially pay someone to stand/sit whatever you
                    want, on a campus with a sign on a busy day lol. If you're interested in
                    that lmk as well, you can make money while you study!
                </div>
            </div>
    )
}