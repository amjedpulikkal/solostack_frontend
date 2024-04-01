
import { Button } from "@/components/ui/button";
import NaveBar from "../../components/navBar";
// import { GoogleLoginPage } from "../../components/GoogleOAuth";
import { Suspense, lazy } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion";
import { LogoLoader } from "@/components/ui/dot-loardes";
const STimerTab = lazy(() => import("@/components/student/studentTimerTabs"));
const StudentTabs = lazy(() => import("@/components/student/tabs"));


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



export default function Home(): JSX.Element {
  console.log("home")


  const date = new Date("2024-03-30T18:00:00")
  const date1 = new Date("2024-03-30T20:00:00")

  return (
    <>

      <NaveBar />
      <div className='px-9'>
        <div className='mt-7 grid sm:grid-cols-7 gap-10 grid-cols-1 '>
          <div className='border-2  border-primary col-span-4 h-80 rounded-3xl '>
          </div >
          <Suspense fallback={<LogoLoader />}>

            <STimerTab date1={date} date={date1} />
          </Suspense>
        </div>
        <Tabs defaultValue="Tutors">

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

                <div className="h-24 rounded-lg bg-black-"></div>
                {/* <div className="space-y-3">
                    <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
                    <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
                    <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
                  </div> */}

              </div>
            </div>
          </TabsContent>
          <Suspense fallback={<LogoLoader />}>
            <StudentTabs />
          </Suspense>
        </Tabs>
      </div >

    </>
  )
}
