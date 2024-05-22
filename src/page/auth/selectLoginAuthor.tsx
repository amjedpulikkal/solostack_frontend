

import { ModeToggle } from '@/components/mode-toggle';
import { Iauthor } from '@/type';
import { useState } from 'react';
import { GiTeacher } from 'react-icons/gi';
import { PiChalkboardTeacherFill, PiStudentBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import SelectAuthorCo from "@/components/selectAuthorCo"
export default function SelectAuthor(): JSX.Element {
    const navigate = useNavigate()

    const handleClick = (author: Iauthor) => {
        if (author === "mentor") {
            navigate("/mentor/login")
        } else if (author === "tutor") {
            navigate("/tutor/login")
        } else if (author === "student") {
            navigate("/student/login")
        }
    }

    return (
        <>
            <div className='w-screen h-screen  '>

                <div className='flex justify-end mt-6 mr-6'>
                    <ModeToggle />
                </div>
                <div className=' flex  justify-center mt-10 mb-10  md:-mb-10 w-full'>
                    <p className='font-semibold text-4xl mr-3'>Login to </p>
                    <div className='mt-2'>
                        <img src="/SoloStack (2).png" className="hidden dark:block  " alt="" />
                        <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
                    </div>
                </div>
                <SelectAuthorCo handleClick={handleClick} />
            </div>
        </>
    )
}