import React, { useState } from 'react'
import NaveBar from './navbar'
import { FaBars } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { IoCloseSharp } from "react-icons/io5";


import {  NavLink, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


import { PiChalkboardTeacherFill, PiStudentBold, } from 'react-icons/pi';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { GrNotification } from 'react-icons/gr';

import { MdOutlineMailOutline } from "react-icons/md";

export default function AdminHome() {
    const [isOpen, setOpen] = useState(false)
    const [currentLoc, setCurrentLoc] = useState<string>("")


    return (

        <>
            <div className='w-screen h-screen '>
                <NaveBar />
                <div className='grid grid-cols-12 pt-20 h-screen overflow-hidden'>

                    <div className=' absolute z-40 outline outline-1 bg-white dark:bg-slate-800 dark:outline-slate-800 outline-gray-300 shadow- pr-1 pb-1 rounded-ee-xl'>
                        <div className='mt-2 ml-2'>

                            <Button variant="outline" onClick={() => setOpen(!isOpen)} size="icon">
                                <FaBars size={30}  className={`h-[1.2rem] data-[da]:text-white w-[1.2rem]  transition-all ${isOpen ? "-rotate-90 scale-0" : "rotate-0 scale-100"}  text-green-600`} />
                                <IoCloseSharp className={`absolute h-[1.2rem] w-[1.2rem] ${!isOpen ? "-rotate-90 scale-0" : "rotate-0 scale-100"} transition-all  text-green-600`} />

                            </Button>
                        </div>
                    </div>
                    <AnimatePresence>

                        {isOpen && (<motion.div {... {
                            initial: { opacity: 0, x: -50 },
                            animate: { opacity: 1, x: 0, },
                            transition: { duration: 0.1 },
                            exit: { opacity: 0, x: -50 }
                        }} className='col-span-12 w-36 md:col-span-2 h-full md:relative absolute z-10 md:z-0'>
                            <div className='mt-14'>
                                <ul >
                                    {/* <NavLink className={({ isActive }) =>
                                    isActive ? "*:bg-white/20 *:hover:bg-background" : "*:bg-white/20 *:hover:bg-background"
                                } to={"/admin"}>
                                    <li className=' mt-3 transition-colors pl-4 py-2'>
                                        Home
                                    </li>
                                </NavLink> */}
                                    <NavLink
                                        className={({ isActive }) => {
                                            if (isActive) setCurrentLoc("student")
                                            return isActive ? "*:text-primary *:bg-white/5 *:rounded-2xl" : "*"
                                        }
                                        } to={"/admin/allStudent"}>
                                        <div className='flex flex-row relative'>
                                            <div className={currentLoc === "student" ? "w-[5%]  h-full ml-1  absolute bg-primary rounded-full   " : "hidden"}></div>
                                            <li className='w-[95%] mt-3  transition-colors flex justify-center flex-col items-center'>
                                                <PiStudentBold size={50} />
                                                <p>All students</p>
                                            </li>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => {
                                            if (isActive) setCurrentLoc("mentor")
                                            return isActive ? "*:text-primary *:bg-white/5 *:rounded-2xl" : "*"
                                        }
                                        } to={"/admin/allMentor"}>
                                        <div className='flex flex-row relative'>
                                            <div className={currentLoc === "mentor" ? "w-[5%] h-full ml-1 bg-primary absolute top-0  rounded-full " : "hidden"}></div>
                                            <li className='w-[90%] mt-3  transition-colors flex justify-center flex-col items-center'>
                                                <PiChalkboardTeacherFill size={50} />
                                                <p>All mentor</p>
                                            </li>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => {
                                            if (isActive) setCurrentLoc("logs")
                                            return isActive ? "*:text-primary *:bg-white/5 *:rounded-2xl" : "*"
                                        }
                                        } to={"/admin/logs"}>
                                        <div className='flex flex-row relative'>
                                            <div className={currentLoc === "logs" ? "w-[5%] h-full ml-1 bg-primary absolute top-0  rounded-full " : "hidden"}></div>
                                            <li className='w-[90%] mt-3  transition-colors flex justify-center flex-col items-center'>
                                                <MdError size={50} />
                                                <p>logs</p>
                                            </li>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => {
                                            if (isActive) setCurrentLoc("emails")
                                            return isActive ? "*:text-primary *:bg-white/5 *:rounded-2xl" : "*"
                                        }
                                        } to={"/admin/emails"}>
                                        <div className='flex flex-row relative'>
                                            <div className={currentLoc === "emails" ? "w-[5%] h-full ml-1 bg-primary absolute top-0  rounded-full " : "hidden"}></div>
                                            <li className='w-[90%] mt-3  transition-colors flex justify-center flex-col items-center'>
                                                <MdOutlineMailOutline size={50} />
                                                <p>Email</p>
                                            </li>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => {
                                            if (isActive) setCurrentLoc("notification")
                                            return isActive ? "*:text-primary *:bg-white/5 *:rounded-2xl" : "*"
                                        }} to={"/admin/pushNotification"}>
                                        <div className='flex flex-row relative'>
                                            <div className={currentLoc === "notification" ? "w-[5%] h-full ml-1 bg-primary absolute top-0  rounded-full " : "hidden"}></div>
                                            <li className='w-[90%] mt-3  transition-colors flex justify-center flex-col items-center'>
                                                <GrNotification size={45} />
                                                <p>All notification</p>
                                            </li>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => {
                                            if (isActive) setCurrentLoc("chats")
                                            return isActive ? "*:text-primary *:bg-white/5 *:rounded-2xl" : "*"
                                        }} to={"/admin/chat"}>
                                        <div className='flex flex-row relative'>
                                            <div className={currentLoc === "chats" ? "w-[5%] h-full ml-1 bg-primary absolute top-0  rounded-full " : "hidden"}></div>
                                            <li className='w-[90%] mt-3  transition-colors flex justify-center flex-col items-center'>
                                                <IoChatbubbleEllipsesOutline size={45} />
                                                <p>All chat</p>
                                            </li>
                                        </div>
                                    </NavLink>
                                </ul>
                            </div>
                        </motion.div>)}
                    </AnimatePresence>


                    <div className={`${isOpen ? "col-span-12 md:col-span-10" : "col-span-12"} pt-7 px-7 overflow-auto`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
