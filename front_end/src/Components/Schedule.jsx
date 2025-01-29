import {v4} from 'uuid';
import { useState } from 'react';

export default function SchedulePreferencesForm({toggleAvailabilityForm, updateAvailability}){

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const timeSlot = ['10am', '12pm', '2pm', '4pm', '6pm', '8pm', 'All Day']

    const userRoute = import.meta.env.VITE_API_URL + '/users'


    const [availability, setAvailability] = useState(
        week.reduce((acc, day) => {
          acc[day] = timeSlot.reduce((slots, slot) => {
            slots[slot] = false;
            return slots;
          }, {});
          return acc;
        }, {})
      );

    function handleSubmit(e){
        e.preventDefault()

        const data = {
            availability: availability
        }

        fetch( userRoute + '/setAvailability', {
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
            updateAvailability(data)
            toggleAvailabilityForm()
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

    return(
        <form onSubmit={handleSubmit} className="grid-cols-2 md:grid-cols-3 grid gap-5 border border-gray p-2 rounded-xl shadow-lg">
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
            <div className="flex flex-col justify-end gap-1">
                <img src="/src/assets/koala_and_baby_on_tree.jpg" className="h-32 mb-3" alt="koala" />
                <button className="p-2 rounded-2xl border border-gray hover:bg-red-50" onClick={toggleAvailabilityForm}>Close</button>
                <button className="p-2 rounded-2xl border border-gray hover:bg-blue-50" type="submit" >Submit</button>
            </div>
        </form>
    )
}