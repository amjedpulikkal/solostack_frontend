
import { useUserNameCheck } from '@/reactQuery/student/signUp';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}



export function UserNameInput({ register, errors }) {
    const { mutateAsync, isError, error, isSuccess, data } = useUserNameCheck()
    const [arrData, setArrData] = useState([])
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();


    const handelUserNameValidation = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeoutId);
        setTimeoutId(setTimeout(async () => {
            mutateAsync(e.target.value)
        }, 300))
    }
    return (
        <div >

            <input {...register("userName", {
                required: "name is required",
                onChange: handelUserNameValidation

            })} className="block w-full p-4 text-lg rounded-sm border-2 bg-white dark:bg-black" type="text" placeholder="user name" />

            {Array.isArray(data) && <motion.div
                initial={{ scale: 0.9 }}
                animate={{ x: 0, scale: 1 }}
                className="text-start mt-1">
                <p className=' font-semibold text-red-500'> username not available</p>
                {data?.map((item) => <p>{item}</p>)}
            </motion.div>}
            <AnimatePresence mode="wait" initial={false}>
                {errors.name && <motion.p
                    className="flex items-center gap-1 pt-2 font-semibold text-red-500"
                    {...framer_error}>

                    {errors.name.message}
                </motion.p>
                }
            </AnimatePresence>
        </div>
    )
}
