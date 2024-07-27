//  import React, { useEffect, useRef, useState } from 'react';
//  import Peer from 'peerjs';

// import { motion } from "framer-motion";

// export function VideoCall(): JSX.Element{
//     const constraintsRef = useRef<HTMLDivElement>(null);
//     const userVideoRef = useRef<HTMLVideoElement>(null);
//     const remoteVideoRef = useRef<HTMLVideoElement>(null);
//     const currentUserVideoRef = useRef<HTMLVideoElement>(null);
//     const peerInstance = useRef<Peer.Instance | null>(null);

//     const [peerId, setPeerId] = useState<string>('');
//     const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>('');

//     const call = (remotePeerId: string): void => {
//         var getUserMedia = navigator.getUserMedia  || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//                getUserMedia({ video: true, audio: true }, (mediaStream) => {
//                  currentUserVideoRef.current.srcObject = mediaStream;
//                  currentUserVideoRef.current.play();
//                  const call = peerInstance.current.call(remotePeerId, mediaStream)
//                  call.on('stream', (remoteStream) => {
//                    remoteVideoRef.current.srcObject = remoteStream
//                    remoteVideoRef.current.play();
//                  });
//                });
//     }

//     useEffect(() => {
//         // navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(data => {
//         //     if (userVideoRef.current) {
//         //         userVideoRef.current.style.display = 'block';
//         //         userVideoRef.current.srcObject = data;

//         //         userVideoRef.current.onended = () => {};
//         //     }
//         // });

//         const peer = new Peer();

//         peer.on('open', (id) => {
//             setPeerId(id)
//         });

//         peer.on('call', (call) => {
//             navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(mediaStream => {
//                 userVideoRef.current!.srcObject = mediaStream;
//                 userVideoRef.current!.play();
//                 call.answer(mediaStream)
//                 call.on('stream', function(remoteStream) {
//                     remoteVideoRef.current!.srcObject = remoteStream
//                     remoteVideoRef.current!.play();
//                 });
//             });
//         })

//         peerInstance.current = peer;
//     }, []);
//     return (
//         <div className="w-dvw h-dvh bg-black pt-10">
//         <div className="flex justify-center w-full h-4/5 ">
//             <motion.div className="bg-slate-600 drag-area h-full w-9/12 rounded-3xl " ref={constraintsRef}>
//                 <video ref={remoteVideoRef} autoPlay playsInline muted className="rounded-2xl w-full h-full" ></video>
//                 <div className="example-container">
//                     <motion.div drag      whileTap={{ cursor: "grabbing" }} dragConstraints={constraintsRef} >
//                         <video ref={userVideoRef} autoPlay playsInline muted width={180} height={160} src="" className="rounded-3xl" ></video>
//                     </motion.div>
//                 </div>
//             </motion.div>
//             <div className="bg-slate-600 h-full w-1/5 rounded-3xl ml-3">
//                 <h1>{peerId}</h1>
//                 <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
//                 <button onClick={() => call(remotePeerIdValue)}>Call</button>
//             </div>
//         </div>
//         <div className="flex justify-center w-dvw h-32 pt-7">
//             <div className=" w-1/2 flex justify-between">
//                 <div className="w-10 h-10"></div>
//                 <div className="w-10 h-10"></div>
//                 <div className="bg-slate-800 w-10 h-10"></div>
//                 <div className="bg-slate-800 w-10 h-10"></div>
//                 <div className="bg-slate-800 w-10 h-10"></div>
//                 <div className="bg-slate-800 w-10 h-10"></div>
//             </div>
//         </div>
//     </div>
//     );
// }
import { MdCallEnd } from "react-icons/md";
import React, { RefObject, useEffect, useRef, useState } from "react";

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
  
  
  remoteVideoStream,
  remoteVideoRef
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
