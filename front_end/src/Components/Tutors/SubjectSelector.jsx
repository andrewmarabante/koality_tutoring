import { CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const subjects = import.meta.env.VITE_REGULAR_SUBJECTS.split(',');

export default function SubjectSelector({handleSubjectAdd}){ 

    const [loading,setLoading] = useState(false)

    return(
                <div className='w-full flex justify-center items-center'>
                    <div className='w-full'>
                        <Autocomplete
                            size='small'
                            options={subjects} onChange={(e, newSubject) =>
                                {setLoading(true)
                                handleSubjectAdd(newSubject)}}
                            renderInput={(params) => <TextField {...params} label="Search" />}
                        />
                    </div>
                </div>
            )}