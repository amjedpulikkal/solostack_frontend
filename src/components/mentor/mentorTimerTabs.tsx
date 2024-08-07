import { CountdownTimer } from "@/components/CountdownTimer";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs } from "@/components/ui/tabs"
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useGetTodyReview } from "@/reactQuery/mentor/baseApi";

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}

export default function MTimerTab(): JSX.Element {
 
  const{data}  =useGetTodyReview()
  const date = new Date(data?.date)
  date.setHours(data?.time)
  const isEnded = data?.length === 0

  return (
    <Tabs defaultValue="review" className=' relative  col-span-4 sm:col-span-3 h-80 rounded-3xl grid sm:grid-cols-12 grid-cols-1'>
      <AnimatePresence mode="wait" initial>

        <div className="col-span-12 sm:col-span-5 mt-6">
     
           <div className={isEnded ? " ml-3 dark:bg-black/80 blur-md bg-white/30  " : "mt-3 ml-3"}>
            <motion.div {...framer_error} className="">
              <div className=" text-xl">
                <p>{date?.toDateString()|| ""}</p>
              </div>
              <div className="font-bold  text-8xl">
                <p>{date?.getHours() > 12 ? date?.getHours() - 12 || "00" : date?.getHours()|| "00"}:{date?.getMinutes() < 10 ? "0" + date?.getMinutes()|| "00" : date?.getMinutes()|| "00"}</p>
              
              </div>
              <div  className="text-xl mt-3">
                <p>Time remaining</p>
              </div>
              <div key={date.toString()}  className="font-medium text-5xl mt-1 ">
             {!isEnded ?<CountdownTimer endTime={date} />:"00:00:00"}
              </div>
            </motion.div>
          </div>
          <div className={isEnded ? "dark:bg-black/80 blur-md bg-white/30  m-3 flex justify-center w-full":" m-3 flex justify-center w-full"} >
          <Link to={`/videoCall/${data?._id}`}> <Button  className="rounded-lg">  Join now</Button></Link>
          </div>
        </div>
          {isEnded &&
            <div className="absolute  z-10 flex justify-center bg items-center w-full h-full">
            <Button className="rounded-2xl px-7 py-7 text-xl hover:shadow-lg hover:shadow-primary duration-100 transition-colors">Book new</Button>
            </div>
         }
        <div className="hidden md:block col-span-12 sm:col-span-7">

          <div className={isEnded ? "h-full w-full p-5  dark:bg-black/80 blur-md bg-white/30  " : "h-full w-full p-5"}>
            <motion.div {...framer_error} className="h-full w-full rounded-3xl flex justify-center  items-end" style={{ backgroundImage: `url(https://nextui.org/images/album-cover.png)` }}  >
              <div className="h-14 rounded-3xl gap-3 backdrop-blur-sm bg-black/30 mb-4 flex justify-between px-2 items-center text-primary-foreground dark:text-white ">
                <p className="text-lg font-serif">{data?.mentorId?.personal_info?.userName}</p>
                <button className="hover:shadow-lg hover:shadow-primary duration-100 h-3/4 w-20 bg-primary rounded-full font-semibold   text-primary-foreground ">Profile</button>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </Tabs >
  )
}