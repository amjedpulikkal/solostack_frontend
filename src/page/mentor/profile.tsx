
import { useParams } from "react-router-dom"


import { CalendarDemo } from "@/components/calendar"
import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useMentorProfile } from "@/reactQuery/mentor/mentorQuery"
import { motion } from "framer-motion"
import { LuBell } from "react-icons/lu";
import UpdatePhoto from "./updatePhoto"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export default function MentorProfile(): JSX.Element {

    const { userName } = useParams()
    const [date, setDate] = useState<Date>(new Date())
    const [selectedDate, setSelectedDate] = useState<number[]>([])
    const [isHovered, setIsHovered] = useState<null | number>(null);
    // const [mentor, setMentor] = useState()
    // const { data, mutate } = useMentorProfile(setMentor)
    // useEffect(() => {
    //     mutate(userName)
    //     return
    // }, [])
    console.log(useParams)

    const mentor =  useSelector((state: RootState) => state.author?.authorData) 

    const handelSelectedDate = (index: number) => {

        if (selectedDate.includes(index)) {
            setSelectedDate(selectedDate.filter(item => item !== index));
        } else {
            setSelectedDate([...selectedDate, index])
        }
        console.log(selectedDate)

    }
    const handelInvalidSelectedDate = () => {

        toast.error("You cannot select a time before now.");
    }

    const handelUpdateDate = () => {

    }
    return (

        <>

            <div className="w-full h-72  justify-start bg-slate-800 flex items-end p-5 rounded-es-3xl " style={{ backgroundImage: `url("https://media.licdn.com/dms/image/C4D16AQHEh8_0wVt8NA/profile-displaybackgroundimage-shrink_350_1400/0/1538447843182?e=1718841600&v=beta&t=6p8kKuQjMlrGQ5-cBmjTOZfJFGE39k_6yu3YfWQYeCo")`, backgroundRepeat: "no-repeat", backgroundSize: " cover" }}>
                <UpdatePhoto imageUrl={mentor?.personal_info?.photo} />
            </div>
            <div className="pl-2 pt-2 grid grid-cols-12">
                <div className="col-span-8">
                    <div className="flex justify-end mt-5 gap-4">
                        <Button>Follow</Button>
                        <Button size="icon"><LuBell /></Button>
                    </div>
                    <div className="flex justify-evenly mt-5 ">
                        <p>AM</p>
                        {[9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                            const date1 = new Date(date)
                            const date2 = new Date()
                            const isSameDate = date1.getFullYear() === date2.getFullYear() &&
                                date1.getMonth() === date2.getMonth() &&
                                date1.getDate() === date2.getDate();
                            if (isSameDate && new Date().getHours() - 9 >= index) {
                                return (

                                    <motion.button onClick={() => handelInvalidSelectedDate()} initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.4 }}
                                        transition={{ duration: 0.1 }} className={`line-through cursor-not-allowed text-red-500 w-12   dark:dark h-12 rounded-full ${selectedDate.includes(index) ? "bg-primary" : "bg-black"}`}>
                                        &nbsp;{item}&nbsp;
                                    </motion.button>
                                )
                            } else {

                                return (
                                    <motion.button onClick={() => handelUpdateDate(index)} initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.4 }}
                                        transition={{ duration: 0.1 }} whileTap={{ scale: 1.4 }} className={` text-white w-12   dark:dark h-12 rounded-full ${selectedDate.includes(index) ? "bg-primary" : "bg-black"}`}>
                                        &nbsp;{item}&nbsp;
                                    </motion.button>
                                )

                            }
                        })}
                        <p>PM</p>
                    </div>

                    <motion.div className="flex justify-evenly mt-5 px-7">
                        {[9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (

                            // <motion.div whileHover={{ width: "144px", transition: { duration: 0.3 } }} className="text-white  bg-black rounded-sm w-14 h-48 ">
                            //     <div className="rotate-90  w-full flex justify-center items-center  h-36" >

                            //         <p className="font-extrabold text-green-600 text-xl">Booked</p>


                            //     </div>
                            // </motion.div>
                            <motion.div onMouseEnter={() => setIsHovered(index)}
                                onMouseLeave={() => setIsHovered(null)}
                                whileHover={{ width: "144px", transition: { duration: 0.3 } }}
                                className="text-white bg-black rounded-sm w-14 h-48 "
                            >
                                <motion.div
                                    // whileHover={{ height: "110px", transition: { duration: 0.3 } }}
                                    className={`w-full border-4 rounded-md border-black h-14 bg-slate-500  ${isHovered === index ? 'hovered overflow-hidden' : ''}`}

                                    style={{ backgroundImage: `url("/download.jpg")`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
                                >
                                </motion.div>

                                {isHovered === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.4 }}
                                        className="">
                                        <div className="flex justify-center items-center">
                                            <div>
                                                <p className="mt-1">Status <span className="">:</span></p>

                                                <Button variant="outline">Profile</Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            </motion.div>

                        ))}


                    </motion.div>
                </div>
                <div className="col-span-4 flex justify-center items-center">
                    <CalendarDemo />
                </div>

            </div>

        </>
    )
}