import { useEffect, useRef, useState } from "react"
import x from '/assets/x.svg'
import check from '/assets/check.svg'
import editImg from '/assets/edit.svg'
import EditStudentPhoto from "./EditStudentPhoto"
import { CircularProgress } from "@mui/material";
import validator from 'validator';
import AnimatedCheckmark from "../Animations/Checkmark"
import PaymentMethodForm from "./PaymentMethodForm"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import{ Button} from "@mui/material"
import visa from '/assets/CardLogos/visa.svg'
import amex from '/assets/CardLogos/amex.svg'
import discover from '/assets/CardLogos/discover.svg'
import mastercard from '/assets/CardLogos/mastercard.svg'
import defaultCard from '/assets/CardLogos/defaultCard.svg'
import {v4} from 'uuid'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function StudentProfile(){

    const server = import.meta.env.VITE_SERVER + 'student'
    const [userInfo, setUserInfo] = useState({})
    const [sent, setSent] = useState(false)
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [posted, setPosted] = useState(false)
    const [emailLoad, setEmailLoad] = useState(false)
    const [payment, setPayment] = useState(false)
    const [reset, setReset] = useState(null)
    

    const stripeRef = useRef(null)
    const fadeRef = useRef(null)

    useEffect(() => {

        console.log('sent')
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
            console.log('recieved')
            setUserInfo(data)
        })
        .catch(err => console.log(err))

    }, [reset])

    function toggleReset(){
        setReset(v4())
    }

    function handleEmailSend(){
        setSent(true)
        setEmailLoad(true)

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
            setTimeout(()=>setEmailLoad(false), 2000)
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

    function togglePayment(){

        if(!payment){
            fadeRef.current.style.zIndex = "10";
            fadeRef.current.style.opacity = '0.5'
            stripeRef.current.style.top = '50%'
            stripeRef.current.style.transform = 'translate(0, -50%)';
            setPayment(true)
        }
        else{
            fadeRef.current.style.zIndex = "-10";
            fadeRef.current.style.opacity = '0'
            stripeRef.current.style.top = '100%'
            stripeRef.current.style.transform = 'translate(0, 0%)';
            setPayment(false)
        }
    }

    return(
        <div className="h-11/12 w-9/12">
            <form className="flex justify-start items-center h-full w-full overflow-scroll flex-col bg-[rgba(255,255,255,0.75)] rounded-3xl shadow-lg font-roboto py-2" onSubmit={handleSubmit}>
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
                            <input type="text" placeholder={userInfo.email} className={`text-center border-gray-300 ${!userInfo.emailVerified && 'border-red-300'} border rounded-lg p-1`} name="email" />
                            {!userInfo.emailVerified ? <img src={x} alt="x" className="absolute -right-6 h-5 bg-red-200 rounded-lg"/>: <div className="absolute -right-6 rounded-lg">
                                <AnimatedCheckmark />
                            </div>}
                        </div>
                        {!userInfo.emailVerified ? <div className="text-red-300  text-xs text-center p-1">You email has not been verified</div>: <div className="text-green-300  text-xs text-center p-1">Verified</div>}
                        <div className="flex">
                            {sent && <div className="text-xs font-roboto-title-italic p-1">Email sent</div>}
                            {!userInfo.emailVerified && <button className="text-xs border-blue-200 border w-fit rounded-lg py-1 px-2" type="button" onClick={handleEmailSend}>{!sent ? 'Send Link' : <div className="w-10">{emailLoad ? <CircularProgress size={10}/> : 'Resend'}</div>}</button>}
                        </div>
                    </div>
                    <div className="flex justify-between flex-col p-2">
                        <div className="text-lg text-center">Membership:</div>
                        <input type="text" placeholder={userInfo.membership ? userInfo.membership : 'None'} className="text-center border-gray-300 border rounded-lg p-1" name="lastName"/>
                    </div>
                    <div className="flex justify-betwee items-center flex-col p-2 w-full">
                        <div className="text-lg text-center">Payment Method:</div>
                        <div className="text-center border-gray-300 border rounded-lg p-1 w-9/12 relative" name="lastName">{userInfo.paymentMethods && userInfo.paymentMethods.length > 0  ?
                            <div>
                                {userInfo.paymentMethods.map(data => {
                                    let imgSrc = defaultCard;
                                    if(data.card.brand === 'visa'){imgSrc = visa}
                                    else if(data.card.brand === 'mastercard'){imgSrc = mastercard}
                                    else if(data.card.brand === 'discover'){imgSrc = discover}
                                    else if(data.card.brand === 'amex'){imgSrc = amex}
                                    const cardYear = data.card.exp_year.toString().slice(2,4)
                                    const cardMonth = data.card.exp_month.toString()
            
                                    const expDate = cardMonth + '/' + cardYear
                                    return(
                                        <div className="flex justify-around px-2" key={v4()}>
                                            <img src={imgSrc} alt="card" className="h-5"/>
                                            <div className="text-sm">{'****' + data.card.last4}</div>
                                            <div className="text-gray-500 text-sm">{expDate}</div>
                                        </div>
                                    )
                                })}
                            </div> : 'None'} 
                            {userInfo.paymentMethods && userInfo.paymentMethods.length < 1 
                            ? <img src={x} alt="x" className="absolute top-1 -right-6 h-5 bg-red-200 rounded-lg"/>
                            : <div className="absolute top-2 -right-6 rounded-lg">
                                <AnimatedCheckmark />
                            </div>}
                        </div>
                        {userInfo.paymentMethods && userInfo.paymentMethods.length < 1 ?
                        <Button style={{fontSize: '10px'}} type="button" size="small" onClick={togglePayment}>Add Payment Method</Button>
                        :  <Button style={{fontSize: '10px'}} type="button" size="small" onClick={togglePayment}>Update Payment Method</Button>}
                        <div ref={fadeRef} className="absolute -top-0 left-0 h-full w-full -z-10 bg-black opacity-0 transition-opacity duration-1000 ease-in-out"></div>
                        <div ref={stripeRef} className="absolute top-full left-1/2 transform: -translate-x-1/2 transition-all ease-in-out duration-1000 w-10/12 h-full flex justify-center items-center z-20">
                            <Elements stripe={stripePromise}>
                                <PaymentMethodForm togglePayment = {togglePayment} email = {userInfo.email} toggleReset={toggleReset}/>
                            </Elements>
                        </div>
                    </div>
                    <div className={`flex items-center justify-center`}>
                        <Button variant='outlined' loading={loading} type="submit">{!loading && posted ? <div className="flex items-center gap-1">Updated<AnimatedCheckmark/></div> : 'Update'}</Button>
                    </div>
                    {message && <div className="text-red-300 text-xs">{message}</div>}
                </div> :
            
                <EditStudentPhoto
                    imgSrc={userInfo.photo}
                    exitEdit={exitEdit}
                />
                }
            
            </form>
        </div>
    )
}