import { CountdownTimer } from "@/components/CountdownTimer";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs } from "@/components/ui/tabs"
import { Button } from "../ui/button";

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}

export default function MTimerTab(): JSX.Element {
  const date = new Date()
  const isEnded = false

  return (
    <Tabs  className='relative col-span-4 sm:col-span-3 h-80 rounded-3xl grid sm:grid-cols-12 grid-cols-1'>
      <AnimatePresence mode="wait" initial>
        <div className="col-span-12 sm:col-span-5 ">
          <div className="mt-3 m-3" >
            <div className="rounded-2xl text-2xl font-extrabold text-primary">
              Next review
            </div>
          </div>
          <div  className={isEnded ? "mt-3 ml-3 dark:bg-black/80 blur-md bg-white/30" : "mt-3 ml-3"}>
            <motion.div {...framer_error} className="">
              <div className="text-xl">
                <p>{date?.toDateString()}</p>
              </div>
              <div className="font-bold text-8xl">
                <p>{date?.getHours() > 12 ? date?.getHours() - 12 : date?.getHours()}:{date?.getMinutes() < 10 ? "0" + date?.getMinutes() : date?.getMinutes()}</p>
              </div>
              <div className="text-xl mt-3">
                <p>Time remaining</p>
              </div>
              <div className="font-medium text-5xl mt-1 ">
                {!isEnded ? <CountdownTimer endTime={date} /> : <>00:00:00</>}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="hidden md:block col-span-12 sm:col-span-7">
          {isEnded && <div >
            <div className="absolute pt-4 z-10 top-[130px] right-[232px]">
              <Button className="rounded-2xl px-7 py-7 text-xl">Booknew</Button>
            </div>
          </div>}
          <div className={isEnded ? "h-full w-full p-5 dark:bg-black/80 blur-md bg-white/30" : "h-full w-full p-5"}>
            <motion.div {...framer_error} className="h-full w-full rounded-3xl flex justify-center items-end" style={{ backgroundImage: `url(https://nextui.org/images/album-cover.png)` }}>
              <div className="h-14 rounded-3xl gap-3 backdrop-blur-sm bg-black/30 mb-4 flex justify-between px-2 items-center text-primary-foreground dark:text-white ">
                <p className="text-lg font-serif"></p>
                <button className="hover:shadow-lg hover:shadow-primary duration-100 h-3/4 w-20 bg-primary rounded-full font-semibold text-primary-foreground">Profile</button>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </Tabs>
  )
}