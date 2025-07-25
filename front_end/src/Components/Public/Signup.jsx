import { useState } from "react";
import Google from "/assets/google.svg";
import validator from "validator";
import PasswordValidator from "password-validator";
import { AnimatePresence, motion } from "framer-motion";

export default function Signup({ changeSection }) {
  const [tutorLogin, setTutorLogin] = useState(false);
  const [message, setMessage] = useState(null);

  const server = import.meta.env.VITE_SERVER + "signup";

  const passwordSchema = new PasswordValidator();
  passwordSchema
    .is().min(8)
    .is().max(16)
    .has().uppercase(1)
    .has().digits(1)
    .is().not().oneOf(['Passw0rd', 'Password123']);

  const handleChange = () => setTutorLogin(prev => !prev);

  const sanitizeEmail = (input) => {
    const trimmedInput = input.trim().toLowerCase();
    return validator.isEmail(trimmedInput) ? trimmedInput : 'Invalid email address';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const verify = e.target.verify.value;

    const sanitizedEmail = sanitizeEmail(username);
    const passValidationErrors = passwordSchema.validate(password, { list: true });

    if (sanitizedEmail === 'Invalid email address') {
      setMessage('Invalid Email Address');
      return;
    }

    if (passValidationErrors.length > 0) {
      if (passValidationErrors.includes('max')) setMessage('Password must be less than 16 characters');
      else if (passValidationErrors.includes('min')) setMessage('Password must be more than 8 characters');
      else if (passValidationErrors.includes('uppercase')) setMessage('Password must contain an uppercase');
      else if (passValidationErrors.includes('digits')) setMessage('Password must contain a digit');
      else if (passValidationErrors.includes('oneOf')) setMessage('Really Bro? Choose a different password');
      return;
    }

    if (password !== verify) {
      setMessage('Passwords do not match!');
      return;
    }

    const data = { username, password };

    fetch(server + (tutorLogin ? '/tutor' : '/student'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data === 'email taken'){setMessage('Email Already Taken')}
        else if (data === 'success'){ changeSection('Login')}
        else{setMessage('An Error Occurred')}
        
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="z-50 grow flex justify-center items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={tutorLogin ? 'tutor' : 'student'}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-start items-center h-11/12 w-10/12 overflow-scroll flex-col bg-[rgba(255,255,255,0.75)] rounded-3xl shadow-lg font-roboto"
        >
          <div className="text-center text-5xl mt-6">
            {tutorLogin ? "Tutor" : "Student"} <br /> Sign-up:
          </div>

          <form onSubmit={handleSubmit} className="w-80 p-10 pt-5 text-center pb-3 relative">
            <label className="text-xl block p-3" htmlFor="username">Email:</label>
            <input className="border rounded-lg w-full p-2 text-2xl text-center" type="text" name="username" id="username" placeholder="Email" />
            <label className='text-xl block p-2' htmlFor="password">Password:</label>
            <input className="border rounded-lg w-full p-2 text-2xl text-center" type="password" name="password" id="password" placeholder="password" />
            <label className='text-xl block p-2' htmlFor="verify">Verify Password:</label>
            <input className="border rounded-lg w-full p-2 text-2xl text-center" type="password" name="verify" id="verify" placeholder="password" />
            <div className="flex pt-5">
              <button className="w-full border p-1 rounded-lg hover:bg-blue-50">Sign-Up</button>
            </div>
            {message && <div className="text-red-400 mt-1">{message}</div>}
          </form>

          <div className="text-blue-700 p-1 font-roboto-title-italic cursor-pointer" onClick={handleChange}>
            {tutorLogin ? "Sign up as a Student" : "Sign up as a Tutor"}
          </div>

          <form action={`http://localhost:3000/login/google/${tutorLogin ? 'tutor' : 'student'}`} method="GET" className="w-5/6 border-t flex justify-center">
            <button type="submit" className="flex items-center justify-center h-10 bg-white border border-green-300 rounded-xl pl-4 pr-4 m-2 mb-5 text-xs">
              <img src={Google} className="h-7" alt="" />
              <span className="px-2 font-roboto">Sign up with google</span>
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
