import { useEffect, useState, useRef } from "react"
import IconButton from '@mui/material/IconButton';
import backArrow from '/assets/backArrow.svg';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import plus from '/assets/plus.svg';
import OpenChat from "./OpenChat";
import { v4 } from "uuid";
import NewChat from "./NewChat";

export default function Chats(){

    const server = import.meta.env.VITE_SERVER + 'tutor'

    const [create, setCreate] = useState(false)
    const [chats, setChats] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [viewChat, setViewChat] = useState(false)
    const [chatInfo, setChatInfo] = useState(null)

    const messageRef = useRef(null)

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
                    setChats(data[0])
                    setCurrentUser(data[1])
                })
                .catch(err => console.log(err))

            
    }, [])


    function createChat(){
        
    }

    function openChat(chatId){
        const newChatInfo = chats.filter(chat => chat._id === chatId)

        messageRef.current.style.top = '50%'
        messageRef.current.style.transform = 'translate(0, -50%)';

        setChatInfo(newChatInfo)
        setViewChat(true)
    } 
    
    function closeChat(){

        messageRef.current.style.top = '100%'
        messageRef.current.style.transform = 'translate(0, 0%)';

        setViewChat(false)
    }

    function isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    function updateChatLastMessage(updatedChat) {

        setChats(prevChats =>
          prevChats.map(chat =>
            chat._id === updatedChat._id ? { ...chat, ...updatedChat } : chat
          )
        );
      }

    return(
            <div className="h-full relative flex justify-center p-10 w-full font-roboto">
                <div className="bg-[rgba(255,255,255,0.75)] rounded-2xl h-full w-full md:w-3/4 md:pt-3 lg:w-1/2 xl:w-1/3 flex justify-start relative overflow-auto flex-col items-center">

                    {!create ? 
                    <div className="flex flex-col justify-start items-center w-full overflow-hidden ">
                        <div className="text-2xl p-5 ">Messages</div>
                        <div className="w-full justify-start px-5 mb-5"><div className="font-roboto-title border-b w-fit">Inbox</div></div>
                        <div className="overflow-scroll w-full">
                            {chats && chats.map(chat => {

                                let otherUsers = chat.users.filter(userInfo => userInfo._id !== currentUser)

                                const lastMessage = chat.last_message.length > 75 ? chat.last_message.slice(0, 75) + '...' : chat.last_message;

                                const lastMessageDate = new Date(chat.last_message_date);
                                const todaysDate = new Date()

                                let formattedDate;

                                if(isSameDay(lastMessageDate, todaysDate)){
                                    formattedDate = lastMessageDate.toLocaleTimeString([], {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                        });
                                }else{
                                    formattedDate = lastMessageDate.toLocaleDateString('en-US', {
                                        month: 'short',  // e.g., "Apr"
                                        day: 'numeric',  // e.g., "10"
                                      });
                                }


                                return(
                                    <div className="flex items-center justify-start gap-2 w-full px-5 py-2 relative mb-3" key={v4()} onClick={() => openChat(chat._id)}>
                                        <img src={otherUsers.length === 1 && otherUsers[0].photo} alt="" className="h-12 rounded-full"/>
                                        <div className="w-full">
                                            <div className="flex w-full justify-between">
                                                <div className="font-roboto text-sm ">{otherUsers.length === 1 && otherUsers[0].first_name + ' ' + otherUsers[0].last_name.slice(0,1)+'.'}</div>
                                                <div className="h-full flex flex-col justify-start w-fit text-xs pt-1">{formattedDate}</div>
                                            </div>
                                            <div className="text-xs font-roboto text-gray-500 w-full text-wrap">{lastMessage}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="bg-blue-100 rounded-4xl absolute bottom-5 right-5">
                            <IconButton onClick={() => setTimeout(() => setCreate(true), 175)} color="primary" aria-label="add to shopping cart" size="large" style={{height: '65px', width:'65px'}}>
                                <MapsUgcIcon fontSize="inherit" style={{height: '40px', width:'40px'}}/>
                            </IconButton>
                        </div>
                    </div>
                    : <NewChat setCreate={setCreate} currentUser={currentUser}/>
                    }

                    
                </div>
                <div ref={messageRef} className="absolute top-full left-1/2 transform: -translate-x-1/2 transition-all ease-in-out duration-400 w-full h-full flex justify-center items-center">
                    <OpenChat chatInfo={chatInfo} closeChat={closeChat} currentUser={currentUser} updateChatLastMessage={updateChatLastMessage} viewChat = {viewChat}/>
                </div>
            </div>
    )
}