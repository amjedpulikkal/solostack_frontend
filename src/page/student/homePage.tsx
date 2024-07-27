
import { Suspense, lazy } from "react";

import { LogoLoader } from "@/components/ui/dot-loardes";




const STimerTab = lazy(() => import("@/components/student/studentTimerTabs"));




export default function Home(): JSX.Element {



  return (
    <>
      <div className='px-9'>
        <div className='mt-7 grid sm:grid-cols-7 gap-10 grid-cols-1 '>
          <div className='border-2  border-primary col-span-4 h-80 rounded-3xl '>
          </div >
          <Suspense fallback={<LogoLoader />}>

            <STimerTab  />
          </Suspense>
        </div>
        <div>
          <div className='bg-transparent flex md:justify-center rounded-full mt-16 overflow-x-auto  md:overflow-visible gap-4 md:gap-40 scrollbar  md:pd-0 ' >
           
          </div>
        </div>
      </div >

    </>
  )
}
