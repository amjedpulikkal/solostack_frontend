import NaveBar from "@/components/navBar"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { RootState } from "@/redux/store"

import { StudentData } from "@/type"
import { CalendarDemo } from "@/components/calendar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"


export function StudentProfile(): JSX.Element {

    const { userName } = useParams()
    console.log(useParams)
    const student = useSelector((state: RootState) => state.student?.studentData) as unknown as StudentData
    return (

        <>
            <NaveBar />
            <div className="pb-20">
                <div className="w-full h-72  bg-slate-800 flex items-end p-6 rounded-es-3xl ">


                    <div className="bg-slate-500 w-36 h-36 rounded-es-3xl  rounded-se-3xl " style={{ backgroundImage: `url(${student.personal_info.photo})`, backgroundRepeat: "no-repeat", backgroundSize: "contain, cover" }}>

                    </div>

                </div>
                <div className="pl-20 flex justify-between mt-10">
                    <CalendarDemo />
                    <div className="w-64 h-32  bg-black  "></div>
                </div>
                <div className=" flex justify-evenly mt-10
                ">

                    {[9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (

                        <motion.div initial={{ scale: 1 }} // Initial scale
                            whileHover={{ scale: 1.2 }} // Scale on hover
                            transition={{ duration: 0.5 }} className="w-12 hover:w-14 hover:h-14 h-12 rounded-full flex justify-center items-center">
                            {item}
                        </motion.div>
                    ))}

                </div>
            </div>

        </>
    )
}