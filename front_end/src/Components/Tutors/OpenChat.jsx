import { useEffect, useState, useRef } from 'react'
import backArrow from '/assets/backArrow.svg'
import send from '/assets/send.svg'
import { CircularProgress } from "@mui/material";
import { AnimatePresence, motion } from 'framer-motion';
import { v4 } from 'uuid';


export default function OpenChat({chatInfo, closeChat, currentUser, updateChatLastMessage, viewChat}){

    const [otherUsers, setOtherUsers] = useState(null)
    const [messages, setMessages] = useState(null)

    const server = import.meta.env.VITE_SERVER + 'tutor'

    const textRef = useRef();
    const messageEndRef = useRef();


    useEffect(()=> {


        if(chatInfo){

            const data = {
                chatId: chatInfo[0]._id
            }


            fetch( server +'/getMessages' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            })
                .then((result) => result.json())
                .then(data => {

                    setTimeout(() => {
                        setMessages(data)                          
                      }, 1000);

                })
                .catch(err => console.log(err))
        }

    }, [chatInfo])

    useEffect(() => {

        if(chatInfo){
        setOtherUsers(chatInfo[0].users.filter(user => user._id !== currentUser))
        }

    }, [chatInfo])

    useEffect(() => {
        
        if(viewChat){
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    function handleInput(){
        const textarea = textRef.current;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      };

    function handleClose(){
        setMessages(null)
        closeChat()
    }

    function sendMessage(){

        if(!textRef.current.value){
            return
        }

        const data = {
            body: textRef.current.value,
            chatId: chatInfo[0]._id,
            senderId: currentUser
        }

        fetch( server +'/createMessage' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then((result) => result.json())
            .then(data => {
                textRef.current.value = ''
                setMessages([...messages, data.messageResult])
                updateChatLastMessage(data.chatResult)
            })
            .catch(err => console.log(err))
    }

    function checkDisplayTime(message){

        const index = messages.indexOf(message)

        if(index === messages.length-1){
            return true
        }

        const nextMessage = messages[index+1]

        if(nextMessage.senderId !== message.senderId){
            return true
        }

        const currentMessageDate = new Date(message.createdAt)
        const nextMessageDate = new Date(nextMessage.createdAt)

        const differenceInMilliseconds = nextMessageDate - currentMessageDate;

        const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
        
        if(differenceInMinutes > 1){
            return true
        }else{
            return false
        }

    }

    function checkDateDivider(message){

        const index = messages.indexOf(message)

        if(index === 0){
            return true
        }


        const prevMessage = messages[index-1]

        const currMessageDate = new Date(message.createdAt)
        const prevMessageDate = new Date(prevMessage.createdAt)

        if(isSameDay(currMessageDate, prevMessageDate)){
            return false
        }else{
            return true
        }


    }

    function isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }



    return(
        <div className="h-full relative flex justify-center p-10 w-full font-roboto">
            <div className="bg-white rounded-2xl h-full w-full md:w-3/4 md:pt-3 lg:w-1/2 xl:w-1/3 flex justify-start relative overflow-auto flex-col items-center">
                <div className='flex items-center p-1 py-3 justify-start w-full bg-gray-800'>
                    <img src={backArrow } alt="" className='h-8' onClick={handleClose}/>
                    <div className='flex gap-2 items-end'>
                        <img src={otherUsers && otherUsers.length === 1 && otherUsers[0].photo} alt="" className='h-8 rounded-full'/>
                        <div className='text-xl font-roboto-title text-white'>{otherUsers && otherUsers.length === 1 && otherUsers[0].first_name + ' ' + otherUsers[0].last_name}</div>
                    </div>
                </div>
                {messages ? 
                <div className='relative h-full overflow-hidden flex flex-col justify-end'>
                    <AnimatePresence>
                    <motion.div
                        key="messages"
                        initial={{ opacity: 0, y: 500 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: .75, ease: "easeOut" }}
                        className="overflow-y-auto h-full"
                    >
                        <div className='p-2 flex flex-col gap-2'>
                            {messages.map(msg => {

                                let bgColor, textSide, tail, timeStamp, dividerTitle, isUser;
                                
                                const displayTime = checkDisplayTime(msg)
                                const displayDivider = checkDateDivider(msg)

                                if(displayDivider){
                                    const messageDate = new Date(msg.createdAt)
                                    const todaysDate = new Date()
                                    const yesterdaysDate = new Date()
                                    yesterdaysDate.setDate(yesterdaysDate.getDate() - 1);

                                    if(isSameDay(messageDate, todaysDate)){
                                        dividerTitle = 'Today'
                                    }else if(isSameDay(messageDate, yesterdaysDate)){
                                        dividerTitle = 'Yesterday'
                                    }else{
                                        let tempDate = new Date(msg.createdAt)
                                        dividerTitle = new Intl.DateTimeFormat('en-US', {
                                            weekday: 'short',
                                            month: 'short',    
                                            day: 'numeric',
                                          }).format(tempDate);
                                    }

                                }


                                if(displayTime){
                                    let tempTime = new Date(msg.createdAt)
                                    timeStamp = new Intl.DateTimeFormat('en-US', {
                                        weekday: 'short', 
                                        hour: 'numeric', 
                                        minute: 'numeric', 
                                        hour12: true, 
                                      }).format(tempTime);
                                }


                                if(msg.senderId === currentUser){
                                    bgColor = 'bg-blue-200'
                                    textSide = 'justify-end'
                                    tail = 'blue'
                                    isUser = true

                                }else{
                                    bgColor = 'bg-gray-200'
                                    textSide = 'justify-start'
                                    tail = 'gray'
                                    isUser = false
                                }

                                return(
                                    <div className={`w-full flex ${textSide}`} key={v4()}>
                                        <div className={`w-full`}>
                                            {displayDivider && <div className='text-center border-b border-gray-100 mb-3 p-2 mx-5'>{dividerTitle}</div>}
                                            <div className={`w-full flex ${textSide}`}>
                                                <div key={v4()} className={`${bgColor} max-w-10/12 px-4 py-2 rounded-lg text-sm inline-block relative w-fit`}>
                                                    <div>{msg.body}</div>
                                                    {tail === 'gray' && <div className="absolute bottom-1 left-1 -translate-x-11/12 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-gray-200 border-b-4 border-b-gray-200"></div>}
                                                    {tail === 'blue' && <div className="absolute bottom-1 right-1 translate-x-11/12 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-blue-200 border-b-4 border-b-blue-200"></div>}
                                                </div>
                                            </div>
                                            {displayTime && <div className={`w-full flex ${textSide} text-xs font-roboto-title-italic text-gray-500 p-1`}>{timeStamp}</div>}
                                        </div>
                                    </div>
                                )
                            })}
                            <div ref={messageEndRef} />
                        </div>
                    </motion.div>
                    </AnimatePresence>
                </div>: 
                <div className='h-full w-full flex justify-center items-center'>
                    <CircularProgress size={50}/>
                </div>
                }
                <div className='w-full px-5 py-2 flex bg-gray-800 gap-2 border-t border-gray-300'>
                    <textarea
                        ref={textRef}
                        onInput={handleInput}
                        className="h-[30px] bg-white resize-none overflow-scroll w-full px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring max-h-30"
                        rows={1}
                    />
                    <img src={send} alt="send" className='h-8 bg-green-100 rounded-full p-1 border-gray-300 border' onClick={sendMessage}/>
                </div>

            </div>
        </div>
    )
}