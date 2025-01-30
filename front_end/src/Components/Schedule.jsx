import {v4} from 'uuid';
import { useEffect, useState } from 'react';

export default function SchedulePreferencesForm(){

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const timeSlot = ['9am', '10:05am', '11:10am', '12:15pm', '1:20pm', '2:25pm', '3:30pm', '4:35pm', '5:40pm', '6:45pm', '7:50pm']

    const server = import.meta.env.VITE_SERVER + 'bigman'

    const [currentWeek, setCurrentWeek] = useState(0)
    const [weeksList, setWeeksList] = useState()
    const [reset, setReset] = useState()
    const [currentSchedules, setCurrentSchedules] = useState([])

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
            console.log('reset', data)
            setCurrentSchedules(data)
        })
        .catch(err => console.log(err))
    },[reset])

   useEffect(() => {

    let tempCurrentWeek = (weeksList[currentWeek].start.toLocaleDateString('en-US'))

    let tempSchedule = currentSchedules.filter(schedule => {
        let tempDate = new Date(schedule.week.start).toLocaleDateString('en-US')
        if(tempDate == tempCurrentWeek){
            console.log(schedule)
            setAvailability(schedule.availability[0])
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
    }
    
    
   }, [currentSchedules, currentWeek])

    function handleSubmit(e){
        e.preventDefault()

        const data = { 
            availability: availability,
            week: weeksList[currentWeek]
        }
        
        fetch( server , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        .then(result => result.json())
        .then(data => {
            if(data === 'saved'){
                alert('saved')
            }
            setReset(v4())
        })
        .catch(err => console.log(err))
    }


    const handleCheckboxChange = (day, slot) => {

        setAvailability((prev) => ({
          ...prev,
          [day]: {
            ...prev[day],
            [slot]: !prev[day][slot]
          }
        }));
      };

    function handleChange(e){
        setCurrentWeek(parseInt(e.target.value))
    }

    return(

        <div>
            <span className='pr-3'>
                Week: 
            </span>
            {weeksList && <select onChange={handleChange} className='border-black border p-1 rounded-lg'>
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
            <form onSubmit={handleSubmit} className="grid-cols-2 md:grid-cols-3 grid gap-5 border border-gray p-2 rounded-xl shadow-lg mt-3">
                {week.map((day) => {
                    return(
                        <div key={day}>
                            <div className="text-center text-2xl border-b-2 p-2">{day}</div>
                            <div className='p-3'>
                                {timeSlot.map(time => {
                                    return(
                                        <div className='flex justify-between' key={v4()}>
                                            <div>{time}</div>
                                            <input
                                            name={[day][time]}
                                            type="checkbox"
                                            checked={availability[day][time]}
                                            onChange={() => handleCheckboxChange(day, time)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <div className="flex flex-col justify-end p-10">
                    <button className="p-2 rounded-2xl border border-gray hover:bg-blue-50" >Submit</button>
                </div>
            </form>

        </div>
    )
}