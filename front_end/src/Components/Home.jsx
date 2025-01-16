import { useEffect } from "react"

export default function Home(){

    const server = import.meta.env.VITE_SERVER

    console.log(server)

    useEffect(() => {
        fetch(server, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(events => {
                console.log(events)
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <div>Working</div>
    )
}