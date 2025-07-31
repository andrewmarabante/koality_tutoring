import { CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const subjects = import.meta.env.VITE_REGULAR_SUBJECTS.split(',');


export default function SubjectSelector({handleSubjectChange}){ 

    const [loading,setLoading] = useState(false)

    return(
                <div className='w-full flex justify-center items-center'>
                    {!loading ? <div className='w-full'>
                        <Autocomplete
                            options={subjects} onChange={(e, newSubject) =>
                                {setLoading(true)
                                handleSubjectChange(newSubject)}}
                            renderInput={(params) => <TextField {...params} label="Search" />}
                        />
                    </div>
                    :<CircularProgress size={100} className='mt-10'/>
                    }
                </div>
            )}