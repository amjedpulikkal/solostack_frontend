import NaveBar from "@/components/navBar"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { RootState } from "@/redux/store"

import { StudentData } from "@/type"
import { CalendarDemo } from "@/components/calendar"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { DrawerDialogForText } from "@/components/profile/model"

export function StudentProfile(): JSX.Element {

    const { userName } = useParams()
    console.log(useParams)
    const student = useSelector((state: RootState) => state.student?.studentData) as unknown as StudentData
    return (

        <>
            <NaveBar />
            <div className="w-full h-72  bg-slate-800 flex items-end p-5 rounded-es-3xl ">
                <div className="bg-slate-500 w-36 h-36 rounded-es-3xl  rounded-se-3xl " style={{ backgroundImage: `url(${student.personal_info.photo})`, backgroundRepeat: "no-repeat", backgroundSize: "contain, cover" }}>
                </div>

            </div>
            <div className="pb-20 container">
                <div className="pl-16 flex justify-between mt-10">
                    <CalendarDemo />
                    <div className="w-3/4 h-full bg-black">


                    </div>
                </div>
                <div className="flex w-full justify-between px-10 mt-6">
                    <p className="font-extrabold text-3xl text-left">AM</p>
                    <p className="font-extrabold text-3xl text-right ">PM</p>
                </div>
                <div className=" flex justify-evenly mt-10
                ">
                    <AnimatePresence mode="wait" initial={true}>

                        {[9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
                            <motion.button initial={{ scale: 1 }}
                                whileHover={{ scale: 1.4 }}
                                transition={{ duration: 0.1 }} className="w-12 bg-black  h-12 rounded-full flex justify-center items-center">
                                {item}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

        </>
    )
}