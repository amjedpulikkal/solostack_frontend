


import { Iauthor } from '@/type';
import { GiTeacher } from 'react-icons/gi';
import { PiChalkboardTeacherFill, PiStudentBold } from 'react-icons/pi';

export default function App({handleClick}:{handleClick: (author: Iauthor) => void}): JSX.Element {

    return (

        <>

            <div className='flex justify-center items-center w-full pb-5 md:h-3/4 md:pb-0'>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div onClick={() => handleClick("student")} className='transition-colors shadow-lg col-span-1 w-60 h-60 border-2 rounded-xl border-primary hover:bg-black/30 hover:text-accent-foreground cursor-pointer flex justify-center items-center'>
                        <div>
                            <PiStudentBold size={100} />
                            <p className='text-center mt-6 text-xl font-semibold'>Student</p>
                        </div>
                    </div>
                    <div onClick={() => handleClick("mentor")} className='transition-colors shadow-lg col-span-1 w-60 h-60  border-2 rounded-xl border-primary hover:bg-black/30 hover:text-accent-foreground cursor-pointer flex justify-center items-center '>
                        <div>
                            <PiChalkboardTeacherFill size={100} />
                            <p className='text-center mt-6 text-xl font-semibold'>Mentor</p>
                        </div>
                    </div>
                    <div onClick={() => handleClick("tutor")} className='transition-colors shadow-lg col-span-1 w-60 h-60 border-2 rounded-xl border-primary hover:bg-black/30 hover:text-accent-foreground cursor-pointer flex justify-center items-center '>
                        <div>
                            <GiTeacher size={100} />
                            <p className='text-center mt-6 text-xl font-semibold'>Tutor</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )


}