
import { MdCallEnd } from "react-icons/md";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { motion } from "framer-motion";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { ModeToggle } from "@/components/mode-toggle";
import ReactMic from "@/components/ReactMic";

type props = {
  // videoRef:RefObject<HTMLVideoElement>,
  videoStream: MediaStream;
  audioMuted: {
    audioMuted: boolean;
    setAudioMuted: Dispatch<SetStateAction<boolean>>;
  };
  videoMuted: {
    videoMuted: boolean;
    setVideoMuted: Dispatch<SetStateAction<boolean>>;
  };
  toggle: {
    toggleAudioMute: () => void;
    toggleVideoMute: () => void;
  };
  
  
  remoteVideoStream: MediaStream,

  //  startPage:Dispatch<SetStateAction<boolean>>
};
export function VideoCallMain({
  videoStream,
  toggle,
  videoMuted,
  audioMuted,

  remoteVideoStream,
  
}: props): JSX.Element {
  const constraintsRef = useRef<HTMLDivElement>(null);

  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
 


  useEffect(()=>{
    if (videoStream) {
      currentUserVideoRef!.current!.srcObject = videoStream;
    }
    if(remoteVideoStream){
      remoteVideoRef!.current!.srcObject =  remoteVideoStream

    }
   
   
  },[videoStream]);
    
  

  return (
    <div>
      <div className="absolute top-3 right-3">
      <ModeToggle/>
      </div>
      <div className="w-dvw h-dvh pt-10">
        <div className="flex justify-center w-full h-4/5 ">
          <motion.div
            className="bg-slate-600 relative drag-area h-full  rounded-3xl "
            ref={constraintsRef}
          >
            <video width={1920} height={1080}
              autoPlay
              ref={remoteVideoRef}
            // ref={currentUserVideoRef} 
            style={{ transform: "scaleX(-1)" }} 
              playsInline
              className="rounded-2xl  outline-primary  w-full h-full"
            ></video>
            <div className="example-container"> 
            <motion.div   drag   whileTap={{ cursor: "grabbing" }} className="relative  outline outline-2 outline-primary rounded-2xl"   dragConstraints={constraintsRef} >
                <video autoPlay style={{ transform: "scaleX(-1)" }} ref={currentUserVideoRef} muted width={180} height={180} src="" className="rounded-2xl bg-slate-200"></video>
                {/* <div className=""> */}
                    <ReactMic className="bg-primary rounded-full absolute bottom-1 left-1  " width={35} height={30} stream={videoStream}/>
                 {/* </div> */}
              </motion.div>
            </div>
          <ReactMic className="bg-primary rounded-full absolute bottom-1 left-1  " width={50} height={40} stream={remoteVideoStream!}/>
          </motion.div>
          

        </div>
        <div className="flex w-full h-14 justify-center mt-4 gap-2">
          <div
            onClick={toggle.toggleVideoMute}
            className="outline outline-1 dark:outline-white/40 outline-black/40 dark:hover:bg-white/15  hover:bg-black/15 transition-colors flex justify-center items-center rounded-full p-3"
          >
            {!videoMuted.videoMuted ? (
              <BsFillCameraVideoFill className="text-primary" size={30} />
            ) : (
              <BsFillCameraVideoOffFill className="text-primary" size={30} />
            )}
          </div>
          <div
            onClick={toggle.toggleAudioMute}
            className="outline outline-1 dark:outline-white/40 outline-black/40 dark:hover:bg-white/15  hover:bg-black/15 transition-colors flex justify-center items-center rounded-full p-3"
          >
            {!audioMuted.audioMuted ? (
              <CiMicrophoneOn className="text-primary" size={30} />
            ) : (
              <CiMicrophoneOff className="text-primary" size={30} />
            )}
          </div>
          <div className="outline outline-1 dark:outline-white/40 outline-black/40 dark:hover:bg-white/15  hover:bg-black/15 transition-colors flex justify-center items-center rounded-full p-3">
          
              <MdCallEnd className="text-primary" size={30} />
          
          </div>
          
        </div>
      </div>
    </div>
  );
}
