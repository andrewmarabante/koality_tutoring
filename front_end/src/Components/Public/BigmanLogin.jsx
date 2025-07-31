import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function BigmanLogin(){

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const server = import.meta.env.VITE_SERVER + 'login'


    function handleSubmit(){

        const data = {
            username: username,
            password: password
        }

        console.log(data)

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
            if(data === 'Success'){
                navigate('/bigman')
            }else{
                console.log(data)
            }
        })
        .catch(err => console.log(err))
    }


    return(
        <div>
            <div>Welcome back Andrew, insert huge penis here: </div>
            <div className="p-5">
                <div><input type="text" placeholder="Penis" value={username} className="border-black border p-2 rounded-lg" onChange={(e)=>{setUsername(e.target.value)}}/></div>
                <div><input type="text" placeholder="Balls" value={password} className="border-black border p-2 rounded-lg" onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <button className="border-black border p-2 rounded-lg" onClick={handleSubmit}>Submit</button>

            </div>
        </div>
        
    )
}