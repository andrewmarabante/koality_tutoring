import { useState } from "react"
import Google from '/assets/google.svg';
import validator from 'validator';
import PasswordValidator from 'password-validator';


export default function Signup({changeSection}){
    const [tutorLogin, setTutorLogin] = useState(false);
    const [message, setMessage] = useState(null);

    const server = import.meta.env.VITE_SERVER + 'signup'

    const passwordSchema = new PasswordValidator();

    passwordSchema
    .is().min(8)                                   
    .is().max(16)                            
    .has().uppercase(1)   
    .has().digits(1)
    .is().not().oneOf(['Passw0rd', 'Password123']);


    const handleChange = () => {
        
        if(tutorLogin){
            setTutorLogin(false)
        }else(setTutorLogin(true))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value
        const verify = e.target.verify.value

        const sanitizedEmail = sanitizeEmail(username);
        const passValidationErrors = passwordSchema.validate(password, {list:true})
        
        if(sanitizedEmail === 'Invalid email address'){
            setMessage('Invalid Email Address')
            return
        }

        if(passValidationErrors.length >0){
            passValidationErrors.includes('max') && setMessage('Password must be less than 16 characters')
            passValidationErrors.includes('min') && setMessage('Password must be more than 8 characters')
            passValidationErrors.includes('uppercase') && setMessage('Password must conatin an uppercase')
            passValidationErrors.includes('digits') && setMessage('Password must contain a digit')
            passValidationErrors.includes('oneOf') && setMessage('Really Bro? Choose a different password')
            return
        }

        if(password !== verify){
            setMessage('Passwords do not match!')
            return
        }




        const data = {
            username: username,
            password: password
        }

        if(tutorLogin){
            fetch( server + '/tutor',{
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
            .then(data => 
                {
                    data === 'email taken' && setMessage('Email Already Taken')
                    data === 'saved' && changeSection('Login')
                })
            .catch(err => console.log(err))
        }else{
            fetch( server +'/student',{
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
                data === 'email taken' && setMessage('Email Already Taken')
                data === 'saved' && changeSection('Login')
            })
            .catch(err => console.log(err))
        }

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
        <div className='z-50 grow flex justify-center items-center overflow-hidden'>
            <div className="flex justify-start items-center h-11/12 w-10/12 overflow-scroll flex-col bg-[rgba(255,255,255,0.75)] rounded-3xl shadow-lg font-roboto">
                {tutorLogin && <div className="text-center text-5xl mt-6">Tutor <br /> Sign-up:</div>}
                {!tutorLogin && <div className="text-center text-5xl mt-6">Student <br /> Sign-up:</div>}
                <form onSubmit={handleSubmit} className="w-80 p-10 pt-5 text-center pb-3 relative">
                    <label className="text-xl block p-3" htmlFor="username">Email:</label>
                    <input className="border rounded-lg w-full p-2 text-2xl text-center" type="text" name="username" id="username" placeholder="Email"/>
                    <label className='text-xl block p-2' htmlFor="password">Password:</label>
                    <input className="border rounded-lg w-full p-2 text-2xl text-center" type="text" name="password" id="password" placeholder="password" />
                    <label className='text-xl block p-2' htmlFor="password">Verify Password:</label>
                    <input className="border rounded-lg w-full p-2 text-2xl text-center" type="text" name="verify" id="verify" placeholder="password" />
                    <div className="flex pt-5">
                        <button className="w-full border p-1 rounded-lg hover:bg-blue-50">Sign-Up</button>
                    </div>
                    {message && <div className="text-red-400 mt-1">{message}</div>}
                </form>
                {tutorLogin && <div className="text-blue-700 p-1" onClick={handleChange}>Sign up as a Student</div>}
                {!tutorLogin && <div className="text-blue-700 p-1 font-roboto-title-italic" onClick={handleChange}>Sign up as a Tutor</div>}
                <form action="https://drewbook-backend.fly.dev/login/google" method="GET" className="w-5/6 border-t  flex justify-center">
                    <button type="submit" className="flex items-center justify-center h-10 bg-white border border-green-300 rounded-xl pl-4 pr-4 m-2 mb-5 text-xs">
                        <img src={Google} className="h-7" alt="" />
                        <span className="px-2 font-roboto">Sign up with google</span>
                    </button>
                </form>
            </div>
        </div>
    )
}