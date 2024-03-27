
import { Button } from "@/components/ui/button";
import NaveBar from "../../components/navBar";
// import { GoogleLoginPage } from "../../components/GoogleOAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { CountdownTimer } from "@/components/CountdownTimer";



import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion";


const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};


const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
export default function Home(): JSX.Element {
  console.log("home")


  const date = new Date("2024-03-25T18:00:00")
  const date1 = new Date("2024-03-26T20:00:00")

  return (
    <>

      <NaveBar />
      <div className='px-9'>
        <div className='mt-7 grid sm:grid-cols-7 gap-10 grid-cols-1 '>
          <div className='border-2  border-primary col-span-4 h-80 rounded-3xl '>

          </div >
          <Tabs defaultValue="account" className='border-2 border-primary col-span-4 sm:col-span-3 h-80 rounded-3xl grid sm:grid-cols-12 grid-cols-1'>
            <AnimatePresence mode="wait" initial>

              <div className="col-span-12 sm:col-span-5 ">

                <div className="mt-3 m-3" >
                  <TabsList className="rounded-2xl">
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="account">Conversations</TabsTrigger>
                  </TabsList>

                </div>
                {/* <AnimatePresence mode="wait" initial={false}> */}

                <TabsContent value="account" className="mt-3 ml-3 ">
                  <motion.div  {...framer_error} className="">
                    <div className=" text-xl">
                      <p>{date1.toDateString()}</p>
                    </div>
                    <div className="font-bold  text-8xl">
                      <p>{date1.getHours() > 12 ? date1.getHours() - 12 : date1.getHours()}:{date1.getMinutes() < 10 ? "0" + date1.getMinutes() : date1.getMinutes()}</p>
                      <p></p>
                    </div>
                    <div className="text-xl mt-3">
                      <p>Time remaining</p>
                    </div>
                    <div className="font-medium text-5xl mt-1 ">
                      <CountdownTimer endTime={date1} />
                    </div>
                  </motion.div>

                </TabsContent>


                <TabsContent value="password" className="mt-3 ml-3 ">
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
                {/* </AnimatePresence> */}



              </div>

              <div className="hidden md:block col-span-12 sm:col-span-7 ">
                <TabsContent value="account" className="h-full w-full p-5 ">
                  <motion.div {...framer_error} className="h-full w-full rounded-3xl flex justify-center  items-end" style={{ backgroundImage: `url(https://nextui.org/_next/image?url=%2Fimages%2Fhero-card.webp&w=256&q=75)` }}  >
                    <div className="h-14 rounded-3xl w-11/12 backdrop-blur-sm bg-black/30 mb-4 flex justify-between px-2 items-center text-primary-foreground dark:text-white ">
                      <p className="text-lg font-serif">@user_____123</p>
                      <button className="shadow-lg shadow-primary  h-3/4 w-20 bg-primary rounded-full font-semibold   text-primary-foreground ">Profile</button>
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="password" className="h-full w-full p-5 ">
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
        </div>
        <Tabs defaultValue="Mentors">

          <TabsList className='bg-transparent flex md:justify-center rounded-full mt-16 overflow-x-auto  gap-4 md:gap-40 scrollbar  md:pd-0 ' >

            <TabsTrigger value="Mentors" className="outline outline-1 outline-primary " >Mentors</TabsTrigger>
            <TabsTrigger value="Tutors" className="outline outline-1 outline-primary" >Tutors</TabsTrigger>
            <TabsTrigger value="Conversations" className="outline outline-1 outline-primary" >Conversations</TabsTrigger>
            <TabsTrigger value="Channels" className="outline outline-1 outline-primary">Channels</TabsTrigger>
            <TabsTrigger value="Plan" className="outline outline-1 outline-primary" >Plan</TabsTrigger>
          </TabsList>
          <TabsContent value="Tutors" className="h-full w-full p-5 ">
            <div className="w-48 h-20">
              <div className="rounded-2xl isolate overflow-hidden shadow-xl shadow-black/5 before:border-t before:border-rose-100/10 relative  before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
                <div className="  space-y-5 rounded-2xl bg-white/5 p-4">
                  <div className="h-24 rounded-lg bg-rose-100/10"></div>
                  <div className="space-y-3">
                    <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
                    <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
                    <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Mentors" className="h-full w-full p-5 ">
            <motion.div variants={container}
              initial="hidden"
              animate="visible" className=' grid mt-14 mb-16 grid-cols-12'>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17].map((index) => (
                <motion.div key={index} className="item" variants={item} className='bg-slate-400 mt-3 col-span-2 h-52 w-48 rounded-3xl flex items-end'>
                  <div className='bg-lime-800 h-11 w-full rounded-b-3xl flex justify-between  '>
                    <div className='flex ml-4 mt-2'>
                      {/* <div></div> */}
                    </div>
                    <div></div>
                  </div>
                </motion.div>
              ))}

            </motion.div>
          </TabsContent>
        </Tabs>
      </div >

    </>
  )
}
