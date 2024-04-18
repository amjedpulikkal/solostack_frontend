import React, { useState } from 'react'
import NaveBar from './navbar'
import { FaBars } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { IoCloseSharp } from "react-icons/io5";

import { Outlet } from 'react-router-dom';
export const AdminHome = () => {
    const [isOpen, setOpen] = useState(false)
    return (

        <>
            <div className='w-screen h-screen'>
                <NaveBar />
                <div className='grid grid-cols-12 h-full'>

                    <div className='col-span-2 bg-slate-700 h-full'>
                        <div className='mt-4 ml-4'>
                            <Button variant="outline" onClick={() => setOpen(!isOpen)} size="icon">
                                <FaBars size={30} className={`h-[1.2rem] data-[da]:text-white w-[1.2rem]  transition-all ${isOpen ? "-rotate-90 scale-0" : "rotate-0 scale-100"}  text-green-600`} />
                                <IoCloseSharp className={`absolute h-[1.2rem] w-[1.2rem] ${!isOpen ? "-rotate-90 scale-0" : "rotate-0 scale-100"} transition-all  text-green-600`} />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </div>
                    </div>
                    <div className='col-span-10 pt-7 px-7 '>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
