import { Slider } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import x from '/assets/x.svg'
import Button from '@mui/material/Button';
import { CircularProgress } from "@mui/material";


export default function EditPhoto({imgSrc, exitEdit}){

    const [profilePic, setProfilePic] = useState(null)
    const [uploading, setUploading] = useState(false)

    const server = import.meta.env.VITE_SERVER + 'tutor/changeProfilePic'
    const [sliderVal, setSliderVal] = useState(50)
    
    const imageRef = useRef(null)
    const imageContainerRef = useRef(null)
    const circleRef = useRef(null)

    useEffect(() => {
        fetch(imgSrc)
        .then(response => response.blob())
        .then(blob => {
        const file = new File([blob], 'sample.jpg', { type: blob.type })
        setProfilePic(file)
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
            }, [])

    function handleSliderChange(e){
        let val = Math.floor(e.target.value)

        const imageContainerRect = imageContainerRef.current.getBoundingClientRect()
        const circleRect = circleRef.current.getBoundingClientRect()

        const leftBound = imageContainerRect.left
        const rightBound = imageContainerRect.right
        const topBound = imageContainerRect.top
        const botBound = imageContainerRect.bottom

        const circleLeft = circleRect.left
        const circleTop = circleRect.top
        const circleRight = circleRect.right
        const circleBottom = circleRect.bottom

        const oldRadius = circleRect.width/2

        let width = imageContainerRect.width

        let ratio = val*width/100
        let newWidth = Math.max(50, ratio)        

        if(newWidth/2 > oldRadius){
            let newRadius = newWidth/2
            if(newRadius - oldRadius > circleLeft - leftBound){
                return
            }
            if(newRadius - oldRadius > circleTop - topBound){
                return
            }
            if(newRadius - oldRadius > rightBound - circleRight){
                return
            }
            if(newRadius - oldRadius > botBound - circleBottom){
                return
            }
        }

        circleRef.current.style.width = `${newWidth}px`
        circleRef.current.style.height = `${newWidth}px`


        setSliderVal(val)
    }

    function handleCircleMovement(e){
        let clickedX = e.clientX;
        let clickedY = e.clientY;
        

        const imageContainerRect = imageRef.current.getBoundingClientRect()
        const circleRect = circleRef.current.getBoundingClientRect()
        const circleRadius = circleRect.width/2;


        const oldX = circleRect.left + circleRadius
        const oldY = circleRect.top + circleRadius

        const leftBound = imageContainerRect.left
        const rightBound = imageContainerRect.right
        const topBound = imageContainerRect.top
        const botBound = imageContainerRect.bottom


        if(clickedX - circleRadius < leftBound){
            clickedX = leftBound + circleRadius
        }
        if(clickedY - circleRadius < topBound){
            clickedY = topBound + circleRadius
        }
        if(clickedX + circleRadius > rightBound){
            clickedX = rightBound - circleRadius
        }
        if(clickedY + circleRadius > botBound){
            clickedY = botBound - circleRadius
        }


        circleRef.current.style.left = `${clickedX - leftBound}px`
        circleRef.current.style.top = `${clickedY -topBound}px`


    }

    function getRatios() {

        const imageContainerRect = imageContainerRef.current.getBoundingClientRect();
        const imageRect = imageRef.current.getBoundingClientRect();
        const circleRect = circleRef.current.getBoundingClientRect();

        //need, crop width (circle width / image width)

        const cropWidth = circleRect.width / imageRect.width
        //crop height
        const cropHeight = circleRect.height / imageRect.height
        //top image percentage (circle top / image height)
        //Remember though, the circle top give top to screen, we need to subtract image top
        const topRatio = (circleRect.top - imageRect.top) / imageRect.height
        //left image percentage

        const leftRatio = (circleRect.left - imageRect.left) / imageRect.width


        console.log(topRatio, leftRatio, cropHeight, cropWidth)
        return (
            { topRatio, leftRatio, cropHeight, cropWidth }
        )

    }

    function handleSubmit(){

        if (!profilePic) {
            return
        }

        setUploading(true)

        const data = getRatios();

        const formData = new FormData();

        formData.append('image', profilePic)
        formData.append('left', data.leftRatio)
        formData.append('top', data.topRatio)
        formData.append('height', data.cropHeight)
        formData.append('width', data.cropWidth)
    
        
        fetch( server , {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: formData,
            credentials: 'include'
        })
            .then((result) => result.json())
            .then(data => {
                window.location.href = '/tutor'
            })
            .catch(err => console.log(err))
    }

    function handlePicChange(e) {
        setProfilePic(e.target.files[0])
    }


    return(
        <div className="w-full flex flex-col justify-center items-center relative">
            <img src={x} alt="x" className="h-10 absolute right-2 top-0" onClick={exitEdit}/>
            <div className="font-roboto text-xl p-2">Edit:</div>
            <div className="w-8/12 relative" ref={imageContainerRef} onClick={handleCircleMovement}>
                {profilePic && <img src={URL.createObjectURL(profilePic)} ref={imageRef} alt="photo" className="h-auto w-full rounded-xl z-10" />}
                <div ref={circleRef} className={`absolute top-1/2 left-1/2 transform: -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white opacity-50 border border-gray-500 z-30 transition-all duration-500 ease-in-out`}></div>
                </div>

                {!uploading ? <div>
                    <div className="font-roboto-title-italic text-xs p-1 text-center">Click to move the circle!</div>
                    <div className=" p-2 z-50 w-full flex flex-col gap-5 items-center justify-center">
                        <input type="file" onChange={handlePicChange} className="hidden" id="upload-file"/>
                        <label htmlFor="upload-file">
                            <Button component="span" variant="contained">Choose a file</Button>
                        </label>
                    <Slider
                        className="text-[#08b4ed] w-40"
                        onChange={handleSliderChange}
                        value={sliderVal}
                        trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"
                    />
                    <button onClick={handleSubmit} className="p-2 border-gray-200 rounded-xl border px-10">Submit</button>
                    </div>
                </div> : 
                    <CircularProgress size={70} className="m-10"/>
                }
        </div>
    )
}