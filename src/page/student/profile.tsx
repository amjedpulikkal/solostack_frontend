import NaveBar from "@/components/navBar"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { RootState } from "@/redux/store"

import { StudentData } from "@/type"
import { CalendarDemo } from "@/components/calendar"
export function StudentProfile(): JSX.Element {

    const { userName } = useParams()
    console.log(useParams)
    const student = useSelector((state: RootState) => state.student?.studentData) as unknown as StudentData
    return (

        <>
            <NaveBar />
            <div>
                <div className="w-full h-72  bg-slate-800 flex items-end p-6 rounded-es-3xl ">


                    <div className="bg-slate-500 w-36 h-36 rounded-es-3xl  rounded-se-3xl " style={{ backgroundImage: `url(${student.personal_info.photo})`, backgroundRepeat: "no-repeat", backgroundSize: "contain, cover" }}>

                    </div>

                </div>
                <div className="pl-20">
                    <CalendarDemo  />
                </div>
            </div>

        </>
    )
}