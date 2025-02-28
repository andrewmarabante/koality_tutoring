import { useEffect, useState } from "react"
import IconButton from '@mui/material/IconButton';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import backArrow from '/assets/backArrow.svg';
import plus from '/assets/plus.svg';


export default function Chats(){

    const server = import.meta.env.VITE_SERVER + 'tutor'

    const [create, setCreate] = useState(false)
    const [recipients, setRecipients] = useState(false)


    useEffect(() => {

            fetch( server +'/getChats' , {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
                credentials: 'include'
            })
                .then((result) => result.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(err))

            
            fetch( server +'/getStudents' , {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                    },
                    credentials: 'include'
                })
                    .then((result) => result.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => console.log(err))
    }, [])

    function createChat(){
        
    }

    return(
            <div className="h-full relative flex justify-center p-10 w-full font-roboto">
                <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl h-full w-full md:w-3/4 md:pt-3 lg:w-1/2 xl:w-1/3 flex justify-start relative overflow-auto flex-col items-center">

                    {!create ? 
                    <div className="flex flex-col justify-start items-center w-full">
                        <div className="text-2xl p-5 ">Messages</div>
                        <div className="w-full justify-start px-5"><div className="font-roboto-title border-b w-fit">Inbox</div></div>
                        <div className="bg-blue-100 rounded-4xl absolute bottom-5 right-5">
                            <IconButton onClick={() => setTimeout(() => setCreate(true), 175)} color="primary" aria-label="add to shopping cart" size="large" style={{height: '65px', width:'65px'}}>
                                <MapsUgcIcon fontSize="inherit" style={{height: '40px', width:'40px'}}/>
                            </IconButton>
                        </div>
                    </div>
                    :<div className="font-roboto-title text-lg w-full p-2"> 
                        <div className="flex justify-start w-full items-center">
                            <IconButton onClick={() => setTimeout(() => setCreate(false), 175)} color="primary" aria-label="add to shopping cart" size="small">
                                <img src={backArrow} alt="back" className="h-7"/>
                            </IconButton>
                            <div className="text-nowrap">New Conversation:</div>
                        </div>
                        <div className="border-gray-300 border-b flex justify-between">
                            <div className="font-roboto-title-italic p-2">Select Recipients</div>
                            <IconButton onClick={() => setTimeout(() => setRecipients(true), 175)} color="primary" aria-label="add to shopping cart" size="small">
                                <img src={plus} alt="plus" className="h-7"/>
                            </IconButton>
                        </div>
                        </div>
                    }

                    
                </div>
            </div>
    )
}