import React, { useState } from 'react'
import NaveBar from './navbar'
import { FaBars } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { IoCloseSharp } from "react-icons/io5";


import { Link, NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
export const AdminHome = () => {
    const [isOpen, setOpen] = useState(false)
    return (

        <>
            <div className='w-screen h-screen '>
                <NaveBar />
                <div className='grid grid-cols-12 pt-20 h-screen overflow-hidden'>

                    <div className=' absolute z-40 outline outline-1 bg-white dark:bg-slate-800 dark:outline-slate-800 outline-gray-300 shadow- pr-1 pb-1 rounded-ee-xl'>
                        <div className='mt-2 ml-2'>

                            <Button variant="outline" onClick={() => setOpen(!isOpen)} size="icon">
                                <FaBars size={30} className={`h-[1.2rem] data-[da]:text-white w-[1.2rem]  transition-all ${isOpen ? "-rotate-90 scale-0" : "rotate-0 scale-100"}  text-green-600`} />
                                <IoCloseSharp className={`absolute h-[1.2rem] w-[1.2rem] ${!isOpen ? "-rotate-90 scale-0" : "rotate-0 scale-100"} transition-all  text-green-600`} />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </div>
                    </div>
                    {isOpen && (<div className='col-span-12 md:col-span-2 bg-slate-700 h-full md:relative absolute z-10 md:z-0'>
                        <div className='mt-20'>
                            <ul >
                                <NavLink className={({ isActive }) =>
                                    isActive ? "*:bg-slate-900 *:hover:bg-slate-950" : "*:bg-slate-800 *:hover:bg-slate-900"
                                } to={"/admin"}>
                                    <li className=' mt-3    transition-colors pl-4 py-2'>
                                        Home
                                    </li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "*:bg-slate-900 *:hover:bg-slate-950" : "*:bg-slate-800 *:hover:bg-slate-900"
                                    } to={"/admin/allStudent"}>
                                    <li className=' mt-3  transition-colors pl-4 py-2'>
                                        All student
                                    </li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "*:bg-slate-900 *:hover:bg-slate-950" : "*:bg-slate-800 *:hover:bg-slate-900"
                                    } to={"/admin/allMentor"}>
                                    <li className=' mt-3 transition-colors pl-4 py-2'>
                                        All mentor
                                    </li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "*:bg-slate-900 *:hover:bg-slate-950" : "*:bg-slate-800 *:hover:bg-slate-900"
                                    } to={"/admin/all"}>
                                    <li className=' mt-3 transition-colors pl-4 py-2'>
                                        All student
                                    </li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "*:bg-slate-900 *:hover:bg-slate-950" : "*:bg-slate-800 *:hover:bg-slate-900"
                                    } to={"/admin/logs"}>
                                    <li className=' mt-3 transition-colors pl-4 py-2'>
                                        logs
                                    </li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "*:bg-slate-900 *:hover:bg-slate-950" : "*:bg-slate-800 *:hover:bg-slate-900"
                                    } to={"/admin/emails"}>
                                    <li className=' mt-3 transition-colors pl-4 py-2'>
                                        Email
                                    </li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "*:bg-slate-900 *:hover:bg-slate-950" : "*:bg-slate-800 *:hover:bg-slate-900"
                                    } to={"/admin/pushNotification"}>
                                    <li className=' mt-3 transition-colors pl-4 py-2'>
                                        Push Notification
                                    </li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "*:bg-slate-900 *:hover:bg-slate-950" : "*:bg-slate-800 *:hover:bg-slate-900"
                                    } to={"/admin/chat"}>
                                    <li className=' mt-3 transition-colors pl-4 py-2'>
                                        chat 
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    </div>)}
                    <div className={`${isOpen ? "col-span-12 md:col-span-10" : "col-span-12"} pt-7 px-7 overflow-auto`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
