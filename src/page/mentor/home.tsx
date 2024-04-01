import { Calendar } from "@/components/ui/calendar"
import NaveBar from "./navBar"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { usGetAvailableTime, useUpdateAvailableTime } from "@/reactQuery/mentor/mentorQuery"



export default function homePage(): JSX.Element {
    const [date, setDate] = useState<Date>(new Date())
    const GetAvailableTime = usGetAvailableTime()
    const { isLoading, isError, data, mutate } = useUpdateAvailableTime()
    const [selectedDate, setSelectedDate] = useState<number[]>([])

    useEffect(() => {
        console.log("called",date)
        GetAvailableTime.mutateAsync({ date }).then(data => {

            // const time = as number[]
            setSelectedDate(data.time || [])
        })

        console.log("called")
        console.log(GetAvailableTime.data)
    }, [date])

    // useMemo(()=>{


    //     return
    // },[GetAvailableTime.data])

    const handelSelectedDate = (index: number) => {

        if (selectedDate.includes(index)) {
            setSelectedDate(selectedDate.filter(item => item !== index));
        } else {
            setSelectedDate([...selectedDate, index])
        }
        console.log(selectedDate)

    }

    const handelUpdateDate = () => {
        mutate({ date, time: selectedDate })
    }

    return (

        <>
            <div>
                <NaveBar />
                <div className="pl-2 pt-2 grid grid-cols-12">
                    <div className="col-span-8">
                        <div className="flex justify-evenly mt-10 ">
                            <p>AM</p>
                            {[9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                                <motion.button onClick={() => handelSelectedDate(index)} initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.4 }}
                                    transition={{ duration: 0.1 }} className={`w-12 text-white  dark:dark h-12 rounded-full ${selectedDate.includes(index) ? "bg-primary" : "bg-black"}`}>
                                    {item}
                                </motion.button>
                            ))}
                            <p>PM</p>
                        </div>
                        <div className="flex justify-end mt-5">
                            <Button onClick={handelUpdateDate} >{!isLoading ? "update" : "lording"}</Button>
                        </div>

                    </div>
                    <div className="col-span-4 flex justify-center items-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border shadow "
                        />
                    </div>

                </div>

            </div>
        </>
    )


}
