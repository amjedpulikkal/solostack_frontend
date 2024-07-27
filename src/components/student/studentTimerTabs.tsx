

import { CountdownTimer } from "@/components/CountdownTimer";
import { AnimatePresence, motion } from "framer-motion";

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
import { useGetTodyReview } from "@/reactQuery/student/baseApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewTamp } from "../reviewTamp";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
export default function STimerTab(): JSX.Element {

  const{data}  =useGetTodyReview()
  const date = new Date(data?.date)
  date.setHours(data?.time)
  const isEnded = (new Date()> (new Date(data?.date)).setHours(data?.time))
  console.log("date",isEnded)
  return (
    <Tabs defaultValue="review" className=' relative border-2 border-primary col-span-4 sm:col-span-3 h-80 rounded-3xl grid sm:grid-cols-12 grid-cols-1'>
      <AnimatePresence mode="wait" initial>

        <div className="col-span-12 sm:col-span-5 mt-6">
         
        {/*  <ReviewTamp date={date} /> */}
           <TabsContent value="review" className={isEnded ? " ml-3 dark:bg-black/80 blur-md bg-white/30  " : "mt-3 ml-3"}>
            <motion.div {...framer_error} className="">
              <div className=" text-xl">
                <p>{date?.toDateString()}</p>
              </div>
              <div className="font-bold  text-8xl">
                <p>{date?.getHours() > 12 ? date?.getHours() - 12 : date?.getHours()}:{date?.getMinutes() < 10 ? "0" + date?.getMinutes() : date?.getMinutes()}</p>
              
              </div>
              <div  className="text-xl mt-3">
                <p>Time remaining</p>
              </div>
              <div key={date}  className="font-medium text-5xl mt-1 ">
             {!isEnded ?<CountdownTimer endTime={date} />:<>00:00:00</>}
              </div>
            </motion.div>
          </TabsContent>
          <div className=" m-3 flex justify-center w-full" >
            {/* <TabsList className="rounded-2xl">
              <TabsTrigger value="review">Review</TabsTrigger>
        
            </TabsList> */}
          <Link to={`/videoCall/${data?._id}`}> <Button  className="rounded-lg">  Join now</Button></Link>
          </div>
        </div>
        <div className="hidden md:block col-span-12 sm:col-span-7">
          {isEnded &&<TabsContent value="review"  >
            <div className="absolute pt-4 z-10 top-[130px] right-[232px]">
              <Button className=" rounded-2xl px-7 py-7 text-xl">Booknew</Button>
            </div>
          </TabsContent>}
          {/* <TabsContent value="Conversations" className={true ? "h-full w-full p-5  dark:bg-black/80 blur-md bg-white/30  " : "h-full w-full p-5"}  >
            <motion.div {...framer_error} className="h-full w-full rounded-3xl flex justify-center  items-end" style={{ backgroundImage: `url(https://nextui.org/_next/image?url=%2Fimages%2Fhero-card.webp&w=256&q=75)` }}  >
              <div className="h-14 rounded-3xl w-11/12 backdrop-blur-sm bg-black/30 mb-4 flex justify-between px-2 items-center text-primary-foreground dark:text-white ">
                <p className="text-lg font-serif">@user_____123</p>
                <button className="shadow-lg shadow-primary  h-3/4 w-20 bg-primary rounded-full font-semibold   text-primary-foreground ">Profile</button>
              </div>
            </motion.div>
          </TabsContent> */}
          <TabsContent value="review" className={isEnded ? "h-full w-full p-5  dark:bg-black/80 blur-md bg-white/30  " : "h-full w-full p-5"}>
            <motion.div {...framer_error} className="h-full w-full rounded-3xl flex justify-center  items-end" style={{ backgroundImage: `url(https://nextui.org/images/album-cover.png)` }}  >
              <div className="h-14 rounded-3xl gap-3 backdrop-blur-sm bg-black/30 mb-4 flex justify-between px-2 items-center text-primary-foreground dark:text-white ">
                <p className="text-lg font-serif">{data?.mentorId?.personal_info?.userName}</p>
                <button className="hover:shadow-lg hover:shadow-primary duration-100 h-3/4 w-20 bg-primary rounded-full font-semibold   text-primary-foreground ">Profile</button>
              </div>
            </motion.div>
          </TabsContent>
        </div>
      </AnimatePresence>
    </Tabs >
  )
}