
import { Button } from "@/components/ui/button";
import NaveBar from "../../components/navBar";
// import { GoogleLoginPage } from "../../components/GoogleOAuth";
import { Suspense, lazy } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion";
import { LogoLoader } from "@/components/ui/dot-loardes";
import { NavLink } from "react-router-dom";
import { useGetTodyReview } from "@/reactQuery/student/baseApi";



const STimerTab = lazy(() => import("@/components/student/studentTimerTabs"));




export default function Home(): JSX.Element {
  console.log("home")
  
  const {data} =useGetTodyReview()
  console.log(data,"data-----------")

  const date = new Date("2024-03-30T18:00:00")
  const date1 = new Date("2024-03-30T20:00:00")

  return (
    <>
      <div className='px-9'>
        <div className='mt-7 grid sm:grid-cols-7 gap-10 grid-cols-1 '>
          <div className='border-2  border-primary col-span-4 h-80 rounded-3xl '>
          </div >
          <Suspense fallback={<LogoLoader />}>

            <STimerTab date1={date} date={date1} />
          </Suspense>
        </div>
        <div>
          <div className='bg-transparent flex md:justify-center rounded-full mt-16 overflow-x-auto  md:overflow-visible gap-4 md:gap-40 scrollbar  md:pd-0 ' >
            <NavLink className={({ isActive }) =>
              isActive ? "*:bg-primary  transition-colors" : " *:hover:bg-primary-foreground transition-colors"
            } to={"/student/mentor"}>
              <div className="outline outline-1 outline-primary p-3 rounded-3xl" >Mentors</div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "*:bg-primary  transition-colors" : " *:hover:bg-primary-foreground transition-colors"
              } to={"/student/tutors"}>
              <div className="outline outline-1 outline-primary p-3 rounded-3xl" >Tutors</div>

            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? "*:bg-primary  transition-colors" : " *:hover:bg-primary-foreground transition-colors"
            } to={"/student/Conversations"}>
              <div className="outline outline-1 outline-primary p-3 rounded-3xl" >Conversations</div>

            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? "*:bg-primary  transition-colors" : " *:hover:bg-primary-foreground transition-colors"
            } to={"/stundent/chammels"}>

              <div className="outline outline-1 outline-primary p-3 rounded-3xl">Channels</div>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? "*:bg-primary  transition-colors" : " *:hover:bg-primary-foreground transition-colors"
            } to={"/student/plan"}>
              <div className="outline outline-1 outline-primary p-3 rounded-3xl" >Plan</div>
            </NavLink>
          </div>
        </div>
      </div >

    </>
  )
}
