import { Calendar } from "@/components/ui/calendar"
import NaveBar from "./navBar"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { usGetAvailableTime, useUpdateAvailableTime } from "@/reactQuery/mentor/mentorQuery"
import { toast } from "sonner"
import DotLoader from "@/components/ui/dot-loardes"
import { useToast } from "@/components/ui/use-toast"
import { number } from "zod"
import { DrawerDialogDetails } from "@/components/mentor/detailsdrawer"



export default function homePage(): JSX.Element {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [date, setDate] = useState<Date>(new Date())
    const [isHovered, setIsHovered] = useState<null | number>(null);
    const GetAvailableTime = usGetAvailableTime()
    const { isLoading, isError, data, mutate } = useUpdateAvailableTime()
    const [selectedDate, setSelectedDate] = useState<number[]>([])
    const bigToast = useToast();

    useEffect(() => {
        console.log("called", date)
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
    const handelInvalidSelectedDate = () => {

        toast.error("You cannot select a time before now.");
    }

    const handelUpdateDate = () => {
        mutate({ date, time: selectedDate })
    }
    return (

        <>
            <div>
                <audio ref={audioRef} className="hidden">
                    <source src="/ringtone-126505.mp3" type="audio/mpeg" />
                </audio>
                <NaveBar />
                <div className="pl-2 pt-2 grid grid-cols-12">
                    <div className="col-span-8">
                        <div className="flex justify-evenly mt-10 ">
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

                                        <motion.button onClick={() => handelSelectedDate(index)} initial={{ scale: 1 }}
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
                                                    <DrawerDialogDetails />

                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                </motion.div>

                            ))}


                        </motion.div>

                        <div className="flex justify-end mt-5">
                            <Button onClick={handelUpdateDate} className={`${isLoading ? "cursor-wait" : ""}`} >{!isLoading ? "update" : "lording"}</Button>
                            <Button
                                onClick={() => {
                                    audioRef.current?.play();
                                    bigToast.toast({
                                        title: "Scheduled: Catch up ",
                                        description: "Friday, February 10, 2023 at 5:57 PM",
                                        action: (
                                            <button onClick={() => audioRef.current?.pause()}>stop</button>
                                        )
                                    })
                                }}
                            >
                                Show Toast
                            </Button>
                        </div>

                    </div>
                    <div className="col-span-4 flex justify-center items-center">
                        <Calendar
                            disabled={{ before: new Date() }}
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border shadow "
                        />
                    </div>

                </div>

            </div >
        </>
    )


}
