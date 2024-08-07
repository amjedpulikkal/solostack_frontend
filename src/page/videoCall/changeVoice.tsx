
import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect ,useState} from "react";
import { CiMicrophoneOn } from "react-icons/ci";

export function ChangeVoice({onSelectDevice}:{onSelectDevice:(deviceId: string)=>void}) {

  const [position, setPosition] = useState("bottom")
  const [label, setLabel] = useState<string>("")

  const [videoList,setVideList] = useState< MediaDeviceInfo[]|[]>([])

  useEffect(()=>{
    async function getMediaDeviceList() {
     try {
        setTimeout(async ()=>{
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'audioinput');
            // const audioDevices = devices.filter(device => device.kind === 'audioinput');
            setVideList(videoDevices)
        },3000)

       
      //  console.log('Available video devices:', videoDevices);
      //  // console.log('Available audio devices:', audioDevices);
 
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
              <CiMicrophoneOn className="text-primary" size={25} />
              <p className="truncate w-full">{label}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className=" bg-transparent rounded-2xl">
      
        <DropdownMenuRadioGroup value={position}  onValueChange={setPosition}>

          {videoList.map((item=>{
            return (
              <DropdownMenuRadioItem key={item.label} className="rounded-2xl" onClick={()=>{setLabel(item.label),onSelectDevice(item.deviceId)}} value={item.deviceId}>{item.label}</DropdownMenuRadioItem>
            )
          }))}
          
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



