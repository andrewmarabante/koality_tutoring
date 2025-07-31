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
import Clipboard from '/assets/clipboard.svg'
import Stars from '/assets/stars.svg'
import { Typography } from '@mui/material';
import koala from '/assets/koala.svg'
import koalaOnBranch from '/assets/koalaOnBranch.svg'
import koalaPeeper from '/assets/koalaPeeper.svg'
import rightPaw from '/assets/rightPaw.svg'
import leftPaw from '/assets/leftPaw.svg'
import airplane from '/assets/airplane.svg'
import leftBambooBackground from '/assets/leftBambooBackground.svg'
import navbarBlueSkyBackground from '/assets/navbarBlueSkyBackground.svg'
import { AnimatePresence, motion } from 'framer-motion';


export default function StudentNavbar({ section, changeSection }) {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };



  const DrawerList = (
    <Box sx={{ width: 'auto' }} role="presentation" onClick={toggleDrawer(false)} className='flex flex-col h-screen'>
      <List >
        {['Profile', 'Find Tutor', 'Study', 'Messages'].map((text) => (
          <ListItem key={text} disablePadding onClick={() => { changeSection(text) }}>
            <ListItemButton>
              <ListItemIcon >
                {text === 'Profile' && <img src={Profile} alt="Profile" className='h-7 sm:h-10 lg:h-12 xl:h-13 lg:mr-5' />}
                {text === 'Find Tutor' && <img src={People} alt="People" className='h-7 sm:h-10 lg:h-12 xl:h-13 lg:mr-5' />}
                {text === 'Study' && <img src={Book} alt="Book" className='h-7 sm:h-10 lg:h-12 xl:h-13 lg:mr-5' />}
                {text === 'Messages' && <img src={Message} alt="Message" className='h-7 sm:h-10 lg:h-12 xl:h-13 lg:mr-5' />}
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
                </Typography>} />
              {section == text && <div className='h-5 w-1 bg-green-300'></div>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Plans / Pricing', 'Lesson History', 'Report a Bug', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => { changeSection(text) }}>
            <ListItemButton>
              <ListItemIcon sx={{ maxWidth: '10px' }}>
                {text === 'Lesson History' && <img src={Clipboard} alt="Clipboard" className='h-4 sm:h-5 lg:h-7 xl:h-7' />}
                {text === 'Report a Bug' && <img src={Bug} alt="Bug" className='h-4 sm:h-5 lg:h-7 xl:h-7' />}
                {text === 'Logout' && <img src={Login} alt="Logout" className='h-4 sm:h-5 lg:h-7 xl:h-7' />}
                {text === 'Plans / Pricing' && <img src={Money} alt="Money" className='h-4 sm:h-5 lg:h-7 xl:h-7' />}
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
                </Typography>} />
              {section == text && <div className='h-5 w-1 bg-green-300'></div>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className='relative grow' style={{ backgroundImage: `url(${navbarBlueSkyBackground})`, backgroundSize: 'cover' }}>
        <div className='h-5 w-full bg-gradient-to-b from-black to-transparent absolute left-0 top-0 z-20 opacity-10'></div>
        <img src={koalaOnBranch} alt="koalaOnBranch" className='h-25 absolute top-10 right-0 z-20' />
        <img src={leftBambooBackground} alt="koalaOnBranch" className='h-3/4 absolute bottom-0 left-0' />
      </div>

    </Box>
  );


  return (
    <div className="p-1 shadow-xl bg-[url('/assets/cloudBackground.svg')] bg-cover z-40">
      <div className='h-full p-5 w-full absolute top-0 left-0 opacity-70 -z-10'></div>
      <div className='relative flex'>
        <MenuIcon onClick={toggleDrawer(true)} className='rounded-lg bg-white opacity-70 shadow-2xl z-40' sx={{
          height: {
            xs: '50px',
            sm: '75px',
          },
          width: {
            xs: '50px',
            sm: '75px',
          },
          margin: '10px',
        }} />

        <div className='relative flex-grow'>
          <div className="relative h-full overflow-hidden mt-1">
            <motion.img
              layout="position"
              key="peeperKoala"
              src={koalaPeeper}
              alt="koala"
              className="h-8 absolute left-5 -bottom-2"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 5, ease: "easeOut" }}
            />
          </div>

          <motion.img
            layout="position"
            key="rightPaw"
            src={rightPaw}
            alt="rightPaw"
            className="h-3 absolute left-17 -bottom-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{
              opacity: 1,
              y: [-0, -5, 0]  // up then down
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: .5,
              ease: "easeOut",
            }}
          />

          <motion.img
            layout="position"
            key="leftPaw"
            src={leftPaw}
            alt="leftPaw"
            className="h-3 absolute left-5 -bottom-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{
              opacity: 1,
              y: [-0, -5, 0]  // up then down
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: .5,
              ease: "easeOut",
              delay: 1
            }}
          />

          <motion.img
            src={airplane}
            alt="airplane"
            className="h-7 fixed top-5 z-10"
            initial={{ x: '-25vw' }} // start completely offscreen to the left
            animate={{ x: '100vw' }} // go fully offscreen to the right
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />

          <div className='text-xs sm:text-base md:text-base text-black bg-white pr-2 pl-2 rounded-xl opacity-60 font-roboto-title absolute bottom-0 right-0 text-nowrap'>Koality Tutors</div>
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
