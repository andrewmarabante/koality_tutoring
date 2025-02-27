import { useEffect, useState } from "react"
import x from '/assets/x.svg'
import check from '/assets/check.svg'
import editImg from '/assets/edit.svg'
import EditPhoto from "./EditPhoto"
import { CircularProgress } from "@mui/material";
import validator from 'validator';


export default function Profile(){

    const server = import.meta.env.VITE_SERVER + 'tutor'
    const [userInfo, setUserInfo] = useState({})
    const [sent, setSent] = useState(false)
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {

        fetch( server + '/profile',{
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
            setUserInfo(data)
        })
        .catch(err => console.log(err))

    }, [])

    function handleEmailSend(){
        setSent(true)

        fetch( server + '/emailVerification',{
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
            console.log(data)
        })
        .catch(err => console.log(err))
        
    }

    function exitEdit(){
        setEdit(false)
    }

    function handleSubmit(e){
        e.preventDefault()

        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const email = e.target.email.value
        const rate = e.target.rate.value
        const subject1 = e.target.subject1.value
        const subject2 = e.target.subject2.value
        const subject3 = e.target.subject3.value
        const bio = e.target.bio.value
        let sanitizedEmail

        if(email !== ''){
            sanitizedEmail = sanitizeEmail(email)

            if (sanitizedEmail === 'Invalid email address'){
                setMessage(sanitizedEmail)
                return
            }
        }



        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            rate: rate,
            subject1: subject1,
            subject2: subject2,
            subject3: subject3,
            bio: bio
        }

        setLoading(true)


        fetch( server + '/updateProfile',{
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
            if(data === 'updated'){
                window.location.href = '/tutor'
            }
        })
        .catch(err => console.log(err))

    }

    function sanitizeEmail(input) {
            const trimmedInput = input.trim();
            const lowerCasedInput = trimmedInput.toLowerCase();
          
            if (validator.isEmail(lowerCasedInput)) {
              return lowerCasedInput;
            } else {
              return 'Invalid email address'
            }
        }

    return(
        <form className="flex justify-start items-center h-11/12 w-9/12 overflow-scroll flex-col bg-[rgba(255,255,255,0.75)] rounded-3xl shadow-lg font-roboto py-2" onSubmit={handleSubmit}>
            {!edit ? <div className="flex flex-col items-center w-full">
                <div className="font-roboto text-4xl p-2 border-b text-center px-10 mb-2">Profile</div>
                <div className="relative p-5">
                    <img src={userInfo.photo} alt="" className="rounded-full h-24" />
                    <img src={editImg} alt="edit" className="h-5 absolute bottom-2 right-0" onClick={() => setEdit(true)}/>
                </div>
                <div className="flex justify-between flex-col p-2">
                    <div className="text-lg text-center">First Name:</div>
                    <input type="text" placeholder={userInfo.firstName} className="text-center border-gray-300 border rounded-lg p-1" name="firstName" />
                </div>
                <div className="flex justify-between flex-col p-2">
                    <div className="text-lg text-center">Last Name:</div>
                    <input type="text" placeholder={userInfo.lastName} className="text-center border-gray-300 border rounded-lg p-1" name="lastName"/>
                </div>
                <div className="flex justify-between flex-col p-2 items-center">
                    <div className="text-lg text-center">Email:</div>
                    <div className="flex items-center gap-2 relative">
                        <input type="text" placeholder={userInfo.email} className={`text-center border-gray-300 ${!userInfo.verified && 'border-red-300'} border rounded-lg p-1`} name="email" />
                        {!userInfo.verified ? <img src={x} alt="x" className="absolute -right-6 h-5 bg-red-200 rounded-lg"/>: <img src={check} alt="checkmark" className="absolute -right-6 h-5 bg-green-200 rounded-lg"/>}
                    </div>
                    {!userInfo.verified ? <div className="text-red-300  text-xs text-center p-1">You email has not been verified</div>: <div className="text-green-300  text-xs text-center p-1">Verified</div>}
                    <div className="flex">
                        {sent && <div className="text-xs font-roboto-title-italic p-1">Email sent</div>}
                        {!userInfo.verified && <button className="text-xs border-blue-200 border w-fit rounded-lg py-1 px-2" onClick={handleEmailSend}>{!sent ? 'Send Link' : 'Resend'}</button>}
                    </div>
                </div>
                <div className="flex justify-between flex-col p-2">
                    <div className="text-lg text-center">Rate:</div>
                    <input type="text" placeholder={userInfo.rate} className="text-center border-gray-300 border rounded-lg p-1" name="rate"/>
                </div>

                <div className="flex justify-between flex-col p-2 text-xs">
                    <div className="text-lg text-center">Subjects:</div>
                    <div className="font-roboto-title-italic text-xs text-center">(3 max)</div>
                    <div className="flex p-2 gap-2">
                        <label htmlFor="subject1">Subject 1:</label>
                        <select name="subject1" placeholder='Subject 1' id="subject1" value={userInfo.subject1} className="text-center" onChange={(e) => setUserInfo(prevUserInfo => ({...prevUserInfo, subject1: e.value,}))}>
                            <option value="NA">None</option>
                            <option value="Math">Math</option>
                            <option value="English">English</option>
                            <option value="Econ">Econ</option>
                            <option value="Biology">Biology</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Spanish">Spanish</option>

                        </select>
                    </div>
                    <div className="flex p-2 gap-2">
                        <label htmlFor="subject2">Subject 2:</label>
                        <select name="subject2" placeholder='Subject 2' id="subject2" value={userInfo.subject2} className="text-center" onChange={(e) => setUserInfo(prevUserInfo => ({...prevUserInfo, subject2: e.value,}))}>
                            <option value="NA">None</option>
                            <option value="Math">Math</option>
                            <option value="English">English</option>
                            <option value="Econ">Econ</option>
                            <option value="Biology">Biology</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Spanish">Spanish</option>

                        </select>
                    </div>
                    <div className="flex p-2 gap-2">
                        <label htmlFor="subject3">Subject 3:</label>
                        <select name="subject3" placeholder='Subject 3' id="subject3" value={userInfo.subject3} className="text-center" onChange={(e) => setUserInfo(prevUserInfo => ({...prevUserInfo, subject3: e.value,}))}>
                            <option value="NA">None</option>
                            <option value="Math">Math</option>
                            <option value="English">English</option>
                            <option value="Econ">Econ</option>
                            <option value="Biology">Biology</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Spanish">Spanish</option>

                        </select>
                    </div>
                </div>
                <div className="flex justify-between flex-col p-2 w-9/12">
                    <div className="text-lg text-center">Bio:</div>
                    <textarea type="text" placeholder={userInfo.bio === 'default' ?
                        'Create a bio! This is what students will read before choosing you as their tutor, so keep it short and sweet!'
                        : userInfo.bio
                        } className="text-center border-gray-300 border rounded-lg p-2 min-h-36 text-xs" 
                        name="bio"
                        />
                </div>
                <button className="text-lg p-2 rounded-lg px-5 border-gray-300 border mb-3" type="submit">Update</button>
                {message && <div className="text-red-300 text-xs">{message}</div>}
                {loading && <CircularProgress size={20}/>}

                <div className={`mt-3 flex gap-5 items-center ${!userInfo.interviewed ? 'border-red-300' : 'border-green-300'} border rounded-lg p-1 px-3`}>
                    <div className="text-lg text-center">Interviewed:</div>
                    {!userInfo.interviewed ? <img src={x} alt="x" className="h-5 bg-red-200 rounded-lg"/> : <img src={check} alt="checkmark" className="h-5 bg-green-200 rounded-lg"/>}
                </div>
                {!userInfo.interviewed && <div className="text-xs w-9/12 text-center p-2 font-roboto-title-italic">-You need to complete a quick discord interview! Go to messages and message the Bossman!</div>}

                <div></div>
            </div> :
            
            <EditPhoto 
                imgSrc={userInfo.photo}
                exitEdit={exitEdit}
            />
            }
            
        </form>
    )
}