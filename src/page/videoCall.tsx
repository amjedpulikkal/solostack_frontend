//  import React, { useEffect, useRef, useState } from 'react';
//  import Peer from 'peerjs';

import QATest from "@/components/QATest";
import { useEffect, useRef, useState } from "react"
import { VideoCallMain } from "./videoCall/mainPage";

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
import Peer, { Peer as Ipeer, MediaConnection } from "peerjs";
import { socket } from "./socket";
export default function VideoCall(): JSX.Element {
  const [isStartingPage, setIsStartingPage] = useState(true);
  const [peerId, setPeerId] = useState("");
  const peerInstance = useRef<Peer | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [videoMuted, setVideoMuted] = useState<boolean>(false);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream | null>(null);
const [remotePeerId,setRemotePeerId] = useState(null)

  useEffect(() => {
    if (!videoMuted && !audioMuted) {
      console.log(!videoMuted && !audioMuted, videoMuted, audioMuted);
      console.log(1);
      console.log("seeeeeeeeeeeeeeeeet1111111");

      navigator.permissions.query({ name: "camera" }).then((res) => {
        console.log(res);
      });

      navigator.mediaDevices
        .getUserMedia({
          video: { width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: true,
        })
        .then((mediaStream) => {
          console.log("seeeeeeeeeeeeeeeeet222222222");
          setVideoStream(mediaStream);
          if (currentUserVideoRef.current) {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
          }
        });
    } else if (videoMuted) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
        setVideoStream(mediaStream);
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
        }
        console.log(2);
      });
    } else if (audioMuted) {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        })
        .then((mediaStream) => {
          setVideoStream(mediaStream);
          if (currentUserVideoRef.current) {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
          }
          console.log(3);
        });
    } else {
      navigator.mediaDevices.getDisplayMedia({ audio: false, video: false });
      setVideoStream(null);
      console.log("4");
    }
  }, [videoMuted, audioMuted]);

  const toggleVideoMute = () => {
    if (videoStream) {
      videoStream.getVideoTracks().forEach((track) => {
        track.enabled = !!videoMuted;
      });
      console.log(!videoMuted, "-----------", videoMuted);

      setVideoMuted(!videoMuted);
    }
  };

  const toggleAudioMute = () => {
    if (videoStream) {
      videoStream.getAudioTracks().forEach((track) => {
        track.enabled = !!audioMuted;
      });
      setAudioMuted(!audioMuted);
    }
  };

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log(id);
      setPeerId(id);
    });

    peerInstance.current = peer;
  }, []);

  useEffect(() => {
    const peer = peerInstance.current as Ipeer;

    peer.on("call", (call) => {
      call.answer(videoStream!);
      call.on("stream", function (remoteStream) {
        console.log("call",remoteStream)
        setRemoteVideoStream(remoteStream);
        
        setIsStartingPage(false);
      });
    });

    peerInstance.current = peer;
  }, [videoStream]);

  const callFn = (peerId: string) => {
console.log(peerId,peerId.length)
    if (peerInstance.current) {
      const call = peerInstance.current.call(peerId, videoStream);

      console.log(call, peerInstance.current)

      call.on("stream", (remoteStream: MediaStream) => {
        console.log(remoteStream, "remoteStream")

        setRemoteVideoStream(remoteStream);
        
        setIsStartingPage(false);
      });  
    } else {
      console.error("Peer instance is not initialized.");

    }
  };
  
  useEffect(() => {
    if(remotePeerId&& peerInstance.current){
      const call = peerInstance.current.call(remotePeerId, videoStream);

      console.log("useEfact----------")
      call.on("stream", (remoteStream: MediaStream) => {
        console.log(remoteStream, "remoteStream")

        setRemoteVideoStream(remoteStream);
        
        setIsStartingPage(false);
      });  
    }
    }, [remotePeerId]);
  socket.on("callUser", ({ peerId }) => {

    console.log("===================================++++===============", peerId, videoStream);
    // callFn(peerId) 
    setRemotePeerId(peerId)
  });


  if (isStartingPage) {
    return (
      <QATest
        peerId={peerId}
        toggle={{ toggleAudioMute, toggleVideoMute, startPage: setIsStartingPage }}
        videoMuted={{ videoMuted, setVideoMuted }}
        audioMuted={{ audioMuted, setAudioMuted }}
        videoStream={videoStream!}
        videoRef={currentUserVideoRef!}
        callFn={callFn}
      />
    );
  } else {
    return (
      <VideoCallMain
        remoteVideoStream={remoteVideoStream}
        toggle={{ toggleAudioMute, toggleVideoMute }}
        videoMuted={{ videoMuted, setVideoMuted }}
        audioMuted={{ audioMuted, setAudioMuted }}
        videoStream={videoStream!}
        {...{ peerId,  }}
      />
    );
  }
}
