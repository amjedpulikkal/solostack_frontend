import { ModeToggle } from '@/components/mode-toggle'
import React from 'react'

function LandingPage() {
    return (
        <>
            <div className="p-10">
                <div className='flex justify-end'>
                    <ModeToggle /> 
                </div>
                <div className='flex justify-center  items-center w-full h-60'>
                    <img src="/SoloStack (2).png" className="hidden dark:block scale-150" alt="" />
                    <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
                </div>
            </div>
        </>
    )
}

export default LandingPage