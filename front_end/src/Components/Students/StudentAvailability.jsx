import { v4 } from 'uuid';
import { useEffect, useState } from 'react';
import { CircularProgress } from "@mui/material";
import AnimatedCheckmark from '../Animations/Checkmark';
import Button from '@mui/material/Button';


export default function StudentAvailability({ setShowAvailability, currentAvailability, setUserInfo }) {

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const timeSlot = ['9am', '11:05am', '1:10pm', '3:15pm', '5:20pm', '7:25pm']
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [message, setMessage] = useState(null)

    const server = import.meta.env.VITE_SERVER + 'student'

    const [weeksList, setWeeksList] = useState()

    const [availability, setAvailability] = useState(
        week.reduce((acc, day) => {
            acc[day] = timeSlot.reduce((slots, slot) => {
                slots[slot] = false;
                return slots;
            }, {});
            return acc;
        }, {})
    );


    useEffect(() => {

        console.log(currentAvailability)
        if (currentAvailability.length > 0) { setAvailability(currentAvailability[0]) }

    }, [currentAvailability])

    function handleSubmit() {

        const count = countSelectedSlots(availability)

        if (count < 7) {
            setMessage('You must have at least 7 open availability spots')
            return
        }
        
        setLoading(true)

        const data = {
            availability: availability,
        }

        fetch(server + '/updateAvailability', {
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
                setUserInfo(data)
                setFetched(true)
                setTimeout(() => setLoading(false), 1000)
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

    const countSelectedSlots = (availabilityObj) => {
        let count = 0;
        for (const day in availabilityObj) {
            for (const slot in availabilityObj[day]) {
                if (availabilityObj[day][slot]) {
                    count++;
                }
            }
        }
        return count;
    };


    return (

        <div>
            <div className='pt-2 text-2xl font-roboto-title text-center'>
                Availability:
            </div>
            <div onSubmit={handleSubmit} className="grid-cols-2 md:grid-cols-3 grid gap-5 p-2 rounded-xl mt-3 gap-y-0">
                {week.map((day) => {
                    return (
                        <div key={day}>
                            <div className="text-center text-2xl border-b-2 p-2">{day.slice(0, 3)}</div>
                            <div className='p-3'>
                                {timeSlot.map(time => {
                                    return (
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
                <div className="flex flex-col justify-around py-10 items-center ">

                    {message ? <div className='text-sm text-red-400 text-center w-full'>{message}</div> :
                        <div className='text-xs text-center pb-3'>Any time slot you check here means you are available at this time.
                            Schedule is made the friday prior to this week!
                        </div>}

                        <Button variant='contained' onClick={() => { handleSubmit() }} fullWidth>Submit
                        <div className='pl-3'>
                            {loading && <div className='pt-2'>
                                <CircularProgress size={20} color='green'/>
                            </div>}
                            {!loading && fetched && <div className='h-9'><AnimatedCheckmark /></div>}
                        </div>
                        </Button>
                    <Button variant='text' color='warning' type='button' onClick={() => setShowAvailability(false)} fullWidth>Back</Button>
                </div>

            </div>
        </div>

    )
}