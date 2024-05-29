import React from 'react'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGetAllGroup, useJoinGroup } from '@/reactQuery/student/chatQuery'


export default function JoinNewGroup({ isCGOpen, setIsCGopen }) {
  const {data,isSuccess} = useGetAllGroup()
  const {mutate}= useJoinGroup()

  const handleJoin=(id:string)=>{

    mutate(id)
  }
  return (
    <Dialog open={isCGOpen} onOpenChange={setIsCGopen}>

      <DialogContent className="sm:max-w-[500px] pt-10">



        <Input type="text" />
        <div className='w-full flex justify-around px-2 h-44 scrollbar  gap-4 overflow-x-auto  flex-wrap'>
          {isSuccess&&data.map(i => {
            return (
              <div className='h-36 w-32 border rounded-3xl overflow-hidden relative   '>
                <img src={`https://d3sd9xkxgxzd5z.cloudfront.net/${i.image}`} className='h-full ' alt="" />
                <div className='absolute top-2 w-full flex justify-center text-black/50'>
                  <p>{i.groupName}</p>
                </div>
                <div className=' absolute w-full flex bottom-3 justify-center '>
                  <button onClick={()=>handleJoin(i._id)} className='w-20 h-8  hover:bg-primary/80 transition-colors rounded-full bg-primary'>join</button>
                </div>
              </div>
            )
          })}
        </div>


      </DialogContent>
    </Dialog>
  )
}
