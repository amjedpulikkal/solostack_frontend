

import { CountdownTimer } from "@/components/CountdownTimer";
import { AnimatePresence, motion } from "framer-motion";

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewTamp } from "./reviewTamp";
import { Button } from "../ui/button";
export default function sTimerTab({ date1, date }: { date1: Date, date: Date }): JSX.Element {

  return (
    <Tabs defaultValue="review" className='relative border-2 border-primary col-span-4 sm:col-span-3 h-80 rounded-3xl grid sm:grid-cols-12 grid-cols-1'>
      <AnimatePresence mode="wait" initial>

        <div className="col-span-12 sm:col-span-5 ">
          <div className="mt-3 m-3" >
            <TabsList className="rounded-2xl">
              <TabsTrigger value="review">Review</TabsTrigger>
              <TabsTrigger value="Conversations">Conversations</TabsTrigger>
            </TabsList>
          </div>
          <ReviewTamp date={date} />
          <TabsContent value="review" className="mt-3 ml-3 ">
            <motion.div {...framer_error} className="">
              <div className=" text-xl">
                <p>{date.toDateString()}</p>
              </div>
              <div className="font-bold  text-8xl">
                <p>{date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}</p>
                <p></p>
              </div>
              <div className="text-xl mt-3">
                <p>Time remaining</p>
              </div>
              <div className="font-medium text-5xl mt-1 ">
                <CountdownTimer endTime={date} />
              </div>
            </motion.div>
          </TabsContent>
        </div>
        <div className="hidden md:block col-span-12 sm:col-span-7">
          <TabsContent value="Conversations">
            <div className="absolute pt-4 z-10 top-[130px] right-[232px]">
              <Button className=" rounded-2xl px-7 py-7 text-xl">Booknew</Button>
            </div>
          </TabsContent>
          <TabsContent value="Conversations" className={true ? "h-full w-full p-5  dark:bg-black/80 blur-md bg-white/30  " : "h-full w-full p-5"}  >
            <motion.div {...framer_error} className="h-full w-full rounded-3xl flex justify-center  items-end" style={{ backgroundImage: `url(https://nextui.org/_next/image?url=%2Fimages%2Fhero-card.webp&w=256&q=75)` }}  >
              <div className="h-14 rounded-3xl w-11/12 backdrop-blur-sm bg-black/30 mb-4 flex justify-between px-2 items-center text-primary-foreground dark:text-white ">
                <p className="text-lg font-serif">@user_____123</p>
                <button className="shadow-lg shadow-primary  h-3/4 w-20 bg-primary rounded-full font-semibold   text-primary-foreground ">Profile</button>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="review" className="h-full w-full p-5 ">
            <motion.div {...framer_error} className="h-full w-full rounded-3xl flex justify-center  items-end" style={{ backgroundImage: `url(https://nextui.org/images/album-cover.png)` }}  >
              <div className="h-14 rounded-3xl w-11/12 backdrop-blur-sm bg-black/30 mb-4 flex justify-between px-2 items-center text-primary-foreground dark:text-white ">
                <p className="text-lg font-serif">@user_____123</p>
                <button className="shadow-lg shadow-primary  h-3/4 w-20 bg-primary rounded-full font-semibold   text-primary-foreground ">Profile</button>
              </div>
            </motion.div>
          </TabsContent>
        </div>
      </AnimatePresence>
    </Tabs >
  )
}