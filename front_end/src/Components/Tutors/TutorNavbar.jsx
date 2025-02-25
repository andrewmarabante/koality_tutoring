import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Schedule from '/assets/schedule.svg'
import Book from '/assets/book.svg'
import Bug from '/assets/bug.svg'
import Message from '/assets/message.svg'
import People from '/assets/people.svg'
import Money from '/assets/money.svg'
import Question from '/assets/question.svg'
import Profile from '/assets/profile.svg'
import Login from '/assets/login.svg'
import Stars from '/assets/stars.svg'
import { Typography } from '@mui/material';
import koala from '/assets/koala.svg'
import koalaOnBranch from '/assets/koalaOnBranch.svg'
import koalaPeeper from '/assets/koalaPeeper.svg'
import leftHangingBranch from '/assets/leftHangingBranch.svg'
import leftBambooBackground from '/assets/leftBambooBackground.svg'
import navbarBlueSkyBackground from '/assets/navbarBlueSkyBackground.svg'


export default function TutorNavbar({section, changeSection}) {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };



  const DrawerList = (
    <Box sx={{ width: 'auto' }} role="presentation" onClick={toggleDrawer(false)} className='flex flex-col h-screen'>
      <List >
        {['Profile', 'Getting Started', 'Schedule', 'Messages'].map((text) => (
          <ListItem key={text} disablePadding onClick={()=>{changeSection(text)}}>
            <ListItemButton>
              <ListItemIcon >
                {text === 'Profile' && <img src={Profile} alt="Profile" className='h-7 sm:h-10 lg:h-12 xl:h-13 lg:mr-5'/>}
                {text === 'Getting Started' && <img src={Book} alt="Book" className='h-7 sm:h-10 lg:h-12 xl:h-13 lg:mr-5'/>}
                {text === 'Schedule' && <img src={Schedule} alt="Person" className='h-7 sm:h-10 lg:h-12 xl:h-13 lg:mr-5'/>}
                {text === 'Messages' && <img src={Message} alt="Message" className='h-7 sm:h-10 lg:h-12 xl:h-13 lg:mr-5'/>}
              </ListItemIcon>
              <ListItemText primary={
                <Typography
                    sx={{
                        fontWeight: 300,
                        fontSize: {
                        xs: '15px',
                        sm: '25px',
                        md: '30px',
                        }
                    }}
                >
                     {text}
                </Typography>}/>
                {section == text && <div className='h-5 w-1 bg-green-300'></div>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Submit Lesson', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={()=>{changeSection(text)}}>
            <ListItemButton>
              <ListItemIcon sx={{maxWidth: '10px'}}>
                {text === 'Become a Tutor' && <img src={People} alt="Message" className='h-4 sm:h-5 lg:h-7 xl:h-7'/>}
                {text === 'Join The Community' && <img src={Stars} alt="Stars" className='h-4 sm:h-5 lg:h-7 xl:h-7'/>}
                {text === 'Logout' && <img src={Login} alt="Logout" className='h-4 sm:h-5 lg:h-7 xl:h-7'/>}
                {text === 'Submit Lesson' && <img src={Money} alt="Money" className='h-4 sm:h-5 lg:h-7 xl:h-7'/>}
              </ListItemIcon>
              <ListItemText primary={
                <Typography
                    sx={{
                        fontWeight: 200,
                        fontSize: {
                        xs: '12px',
                        sm: '15px',
                        md: '20px',
                        },
                    }}
                >
                     {text}
                </Typography>}/>
                {section == text && <div className='h-5 w-1 bg-green-300'></div>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className='relative grow' style={{backgroundImage: `url(${navbarBlueSkyBackground})`, backgroundSize: 'cover'}}>
        <div className='h-5 w-full bg-gradient-to-b from-black to-transparent absolute left-0 top-0 z-20 opacity-10'></div>
        <img src={koalaOnBranch} alt="koalaOnBranch" className='h-25 absolute top-10 right-0 z-20'/>
        <img src={leftBambooBackground} alt="koalaOnBranch" className='h-3/4 absolute bottom-0 left-0'/>
      </div>

    </Box>
  );


  return (
    <div className="p-1 shadow-xl bg-[url('/assets/bambooBackground.jpeg')] bg-cover z-40">
        <div className='h-full p-5 w-full absolute top-0 left-0 opacity-70 -z-10'></div>
      <div className='relative flex'>
          <MenuIcon onClick={toggleDrawer(true)} className='rounded-lg bg-white opacity-70 shadow-2xl' sx={{
            height: {
                xs: '50px',
                sm: '75px',
            }, 
            width: {
                xs: '50px',
                sm: '75px',
            },        
            margin: '10px',
            }}/>
            
            <div className='relative flex-grow'>
                <img src={koalaPeeper} alt="koala" className='h-8 absolute -bottom-2 left-5'/>
                <img src={leftHangingBranch} alt="branch" className='h-15 absolute top-0 right-0'/>
                <div className='text-xs sm:text-base md:text-base text-black bg-white pr-2 pl-2 rounded-xl opacity-60 font-roboto-title absolute bottom-0 right-0 text-nowrap'>Koality Tutors</div>
            </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false) }>
        {DrawerList}
      </Drawer>
    </div>
  );
}
