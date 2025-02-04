import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material";
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

            <div className="p-5">
                <div className="font-serif text-center text-xl border-b mx-20">Andrew's Schedule!</div>
                <div className="font-extralight text-xs text-center m-2">-Any time slot on here means I am available at this time for one hour!</div>
                <div className="font-extralight text-xs text-center m-2">If you want to schedule an appointment, shoot a text to <em>951 348 1243</em></div>
                <span className='pr-3'>
                    Week:
                </span>
                {weeksList && <select onChange={handleChange} className="border-black border p-1 rounded-lg">
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
                {released && !loading &&
                <div className="grid-cols-2 md:grid-cols-3 grid gap-5 border border-gray p-2 rounded-xl shadow-lg mt-3">
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
                <div className="text-lg text-center pt-10">
                    <div>Schedule Not Released Yet!</div>
                    <div className="text-xs font-extralight">Sorry I don't want to waste my time styling this website lol. It gets the job done.</div>
                </div>}
                {loading && 
                <div className="flex justify-center pt-10">
                    <CircularProgress size={100}/>
                </div>}
                <div className="pt-5 font-extralight"> I am hiring tutors for these subjects: </div>
                <ul className="text-xs font-light grid grid-cols-3 px-5">
                    <li>-Math</li>
                    <li>-English</li>
                    <li>-Chemistry</li>
                    <li>-Biology</li>
                    <li>-Econ</li>
                </ul>
                <div className="pt-5 text-xs font-extralight">
                    I will also potentially pay someone to stand/sit whatever you
                    want, on a campus with a sign on a busy day LOL. If you're interested in
                    that lmk as well, you can make money while you study!
                </div>
            </div>
    )
}