
import NaveBar from "../../components/navBar";
import {GoogleLoginPage} from "../../components/GoogleOAuth";
import { Skeleton } from "@/components/ui/skeleton";
 
export default function Home(): JSX.Element {
  return (
    <>
      <NaveBar />
      <div className='px-9'>
        <div className='mt-7  flex justify-between '>
          <Skeleton  className='bg-slate-400 w-7/12 h-80 rounded-3xl '>
            
          </Skeleton >
          <Skeleton  className='bg-slate-400 w-2/5  h-80 rounded-3xl'>

          </Skeleton >

        </div>
        <div className='flex justify-around mt-16 ' >
          <Skeleton  className='bg-slate-400 h-10 w-28 rounded-full'></Skeleton >
          <Skeleton  className='bg-slate-400 h-10 w-28 rounded-full'></Skeleton >
          <Skeleton  className='bg-slate-400 h-10 w-28 rounded-full'></Skeleton >
          <Skeleton  className='bg-slate-400 h-10 w-28 rounded-full'></Skeleton >
          <Skeleton  className='bg-slate-400 h-10 w-28 rounded-full'></Skeleton >
          <Skeleton  className='bg-slate-400 h-10 w-28 rounded-full'></Skeleton >
        </div>  
        <div className='flex justify-between mt-16 mb-16'>
          <Skeleton className='bg-slate-400 h-52 w-48 rounded-3xl flex items-end'>

            <Skeleton className='bg-lime-800 h-11 w-full rounded-b-3xl flex justify-between  '>
              <div className='flex ml-4 mt-2'>
               {/* <div></div> */}
              </div>
              <div></div>
            </Skeleton>
          </Skeleton>
        </div>
      </div>

    </>
  )
}
