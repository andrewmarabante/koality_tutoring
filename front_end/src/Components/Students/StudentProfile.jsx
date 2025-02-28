import { useEffect, useState } from "react"
import x from '/assets/x.svg'
import check from '/assets/check.svg'
import editImg from '/assets/edit.svg'
import EditStudentPhoto from "./EditStudentPhoto"
import { CircularProgress } from "@mui/material";
import validator from 'validator';
import AnimatedCheckmark from "../Animations/Checkmark"


export default function StudentProfile(){

    const server = import.meta.env.VITE_SERVER + 'student'
    const [userInfo, setUserInfo] = useState({})
    const [sent, setSent] = useState(false)
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [posted, setPosted] = useState(false)

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
                console.log(data)
                setPosted(true)
                setTimeout(()=>setLoading(false), 1000)
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

                <div className={`flex items-center justify-center`}>
                    <button className="text-lg p-2 rounded-lg px-5 border-gray-300 border" type="submit">Update</button>
                    {message && <div className="text-red-300 text-xs">{message}</div>}
                    {loading && <CircularProgress size={40} className="ml-2"/>}
                    {!loading && posted && <AnimatedCheckmark />}
                </div>

            </div> :
            
            <EditStudentPhoto 
                imgSrc={userInfo.photo}
                exitEdit={exitEdit}
            />
            }
            
        </form>
    )
}