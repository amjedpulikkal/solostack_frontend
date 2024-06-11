import React, { useState } from 'react'



import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useAcceptRequest } from '@/reactQuery/mentor/mentorQuery'

function DrawerDialog({data,open,setOpen,handelAcceptRequest}) {
  // const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  // console.log(data,"-234-   ")
  if (isDesktop) {
    return (
      <Dialog open={open} defaultOpen={true} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <ProfileForm handelAcceptRequest={handelAcceptRequest} data={data}/>
        </DialogContent>
      </Dialog>
    )
  }else{

   return (
     <Drawer open={open}  onOpenChange={setOpen}>
       <DrawerTrigger asChild>
         <Button variant="outline">details</Button>
       </DrawerTrigger>
       <DrawerContent>
         <DrawerHeader className="text-left">
           <DrawerTitle>Details</DrawerTitle>
         </DrawerHeader>
         <ProfileForm handelAcceptRequest={handelAcceptRequest} data={data}/>
         <DrawerFooter className="pt-2">
           <DrawerClose asChild>
             <Button variant="outline">Cancel</Button>
           </DrawerClose>
         </DrawerFooter>
       </DrawerContent>
     </Drawer>
   )
  }

   
}



function ProfileForm({data,handelAcceptRequest}) {

console.log(data,"11111111111111111111111")

    return (
      <div className={cn("grid grid-cols-2 items-start gap-4")}>

        <div className="bg-slate-700 w-40 rounded-2xl h-52 col-span-1">
        </div>
        <div className="col-span-1">
          <p className="text-2xl py-2">1/3/5003</p>
          <p>name : {data?.studentId?.personal_info?.name} </p>
          <p>Status:{data.status}</p>
          <p>user Bookend @ 9:00 pm</p>
          <p className='break-words'>for&nbsp;{data.reviewFor}</p>
          <div className='flex justify-between'>
          <Button  variant="destructive" className="mt-5 bg">Reject</Button>
          <Button  className="mt-5 bg" onClick={()=>handelAcceptRequest(data)}>Accept</Button>

          </div>
        </div>
      </div>
    )
  
}


export default function  Requests({requests,getAvailableTime}) {
  const [open, setOpen] = useState(false)
  const [user,setUser] = useState()

  const {mutate}=useAcceptRequest(getAvailableTime)

  const handelAcceptRequest = ()=>{
    console.log(user,"------www-------")
    mutate({requests,user})
    setOpen()
  }

  return (
    <div className=" overflow-hidden h-full overflow-y-auto">
    {requests.requests.map((item) => {
     

      return (
        <div onClick={()=>{setUser(item),setOpen(true)}} className="flex mt-1 items-center gap-1 hover:bg-white/30 p-1 transition-colors">
          <img
            src="/download.png"
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <p className="text-sm">
            @{item?.studentId?.personal_info?.userName}
          </p>
        </div>
      );
    })}
     <DrawerDialog open={open} setOpen={setOpen} handelAcceptRequest={handelAcceptRequest} data={user}/>
  </div>
  )
}
