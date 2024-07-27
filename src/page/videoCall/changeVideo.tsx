
import * as React from "react"
import { BsFillCameraVideoFill } from "react-icons/bs";


import {
  DropdownMenu,
  DropdownMenuContent,
  
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect ,useState} from "react";

export function ChangeVideo() {

  const [position, setPosition] = useState("bottom")
  const [label, setLabel] = useState<string>("")

  const [videoList,setVideList] = useState< MediaDeviceInfo[]|[]>([])

  useEffect(()=>{
    async function getMediaDeviceList() {
     try {
      setTimeout(async ()=>{

       const devices = await navigator.mediaDevices.enumerateDevices();
       const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
       console.log(videoDevices)
       setVideList(videoDevices)
      },3000)

      
     } catch (error) {
       console.error('Error enumerating media devices:', error);
     }
   }
   
   getMediaDeviceList()
 },[])

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
      <div className="flex items-center gap-2 px-2 rounded-full w-36 h-10 outline outline-1 dark:outline-white/40 outline-black/40 dark:hover:bg-white/15  hover:bg-black/15 transition-colors ">
              <BsFillCameraVideoFill className="text-primary" size={25} />
              <p className="truncate w-full">{label}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className=" bg-transparent rounded-2xl">
      
        <DropdownMenuRadioGroup value={position}  onValueChange={setPosition}>

          {videoList.map((item=>{
            return (
              <DropdownMenuRadioItem className="rounded-2xl" onClick={()=>setLabel(item.label)} value={item.deviceId}>{item.label}</DropdownMenuRadioItem>
            )
          }))}
          
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



