
import QATest from "@/components/QATest";
import { useEffect, useRef, useState } from "react"
import { VideoCallMain } from "./videoCall/mainPage";
import { ChangeVideo } from "./videoCall/changeVideo";
import { ChangeVoice } from "./videoCall/changeVoice";
import Peer, { Peer as Ipeer, } from "peerjs";
import { socket } from "./socket";
import { useIceServers } from "@/reactQuery/stripe";
export default function VideoCall(): JSX.Element {
  const { data, isSuccess } = useIceServers()

  const [isStartingPage, setIsStartingPage] = useState(true);
  const [peerId, setPeerId] = useState("");
  const peerInstance = useRef<Peer | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [videoMuted, setVideoMuted] = useState<boolean>(false);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream | null>(null);
  const [remotePeerId, setRemotePeerId] = useState(null)
  const [deviceId, setDeviceId] = useState(null)
  const [audioDeviceId, setAudioDeviceId] = useState(null)
  const setupMediaStream = async (constraints) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (currentUserVideoRef.current) {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
      }
      setVideoStream(mediaStream);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const clearMediaStream = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
    }
    setVideoStream(null);
  };

  useEffect(() => {
        clearMediaStream();
        if (!videoMuted && !audioMuted) {
          // setupMediaStream({ video: { width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: true });
          setupMediaStream({ video: { deviceId: (deviceId ? { exact: deviceId } : undefined), width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: {deviceId:(audioDeviceId ? { exact: audioDeviceId } : undefined)} });
    
        } else if (videoMuted && !audioMuted) {
          setupMediaStream({ audio: {deviceId:(audioDeviceId ? { exact: audioDeviceId } : undefined)} } );
        } else if (!videoMuted && audioMuted) {
          setupMediaStream({ video: { deviceId: (deviceId ? { exact: deviceId } : undefined), width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
        } else {
          navigator.mediaDevices.getDisplayMedia({ audio: false, video: false })
            .then((mediaStream) => setVideoStream(mediaStream))
            .catch((error) => console.error('Error accessing display media.', error));
        }
    
        return () => clearMediaStream();
      }, [videoMuted, audioMuted, deviceId,audioDeviceId]);

  const toggleVideoMute = () => {
    if (videoStream) {
      videoStream.getVideoTracks().forEach(track => {
        track.enabled = !videoMuted;
      });
      setVideoMuted(prev => !prev);
    }
  };

  const toggleAudioMute = () => {
    if (videoStream) {
      videoStream.getAudioTracks().forEach(track => {
        track.enabled = !audioMuted;
      });
      setAudioMuted(prev => !prev);
    }
  };


  useEffect(() => {

    if (isSuccess) {
      const iceServers = data.data?.v?.iceServers
      console.log(iceServers)
      const peerConfig = {
        config: {
          iceServers: [
            {
              urls: iceServers.urls,
              username: iceServers.username,
              credential: iceServers.credential
            }
          ]
        }
      };

      const peer = new Peer(peerConfig);

      peer.on("open", (id) => {
        console.log(id);
        setPeerId(id);
      });

      peerInstance.current = peer;
    }
  }, [isSuccess]);

  useEffect(() => {
     
    const peer = peerInstance.current as Ipeer;

    peer?.on("call", (call) => {
      call.answer(videoStream!);
      call.on("stream", function (remoteStream) {
        console.log("call", remoteStream)
        setRemoteVideoStream(remoteStream);

        setIsStartingPage(false);
      });
    });

    peerInstance.current = peer;
    
  }, [videoStream,isSuccess]);



  useEffect(() => {
    if (remotePeerId && peerInstance.current) {
      const call = peerInstance.current.call(remotePeerId, videoStream!);

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

  const handleSelectDevice = (deviceId: string) => {
        setDeviceId(deviceId)
       
      };
      const handleSelectAudioDevice = (deviceId: string) => {
        setAudioDeviceId(deviceId)
       
      };
    
 if (isStartingPage) {
        return (
          <QATest
            ChangeVideo={<ChangeVideo onSelectDevice={handleSelectDevice} />}
            ChangeVoice={<ChangeVoice onSelectDevice={handleSelectAudioDevice} />}
            peerId={peerId}
            toggle={{ toggleAudioMute, toggleVideoMute, startPage: setIsStartingPage }}
            videoMuted={{ videoMuted, setVideoMuted }}
            audioMuted={{ audioMuted, setAudioMuted }}
            videoStream={videoStream!}
            videoRef={currentUserVideoRef!}
          />
        );
  } else {
    return (
      <VideoCallMain
        endCall={function (): void {
          throw new Error("Function not implemented.");
        } } remoteVideoStream={remoteVideoStream}
        toggle={{ toggleAudioMute, toggleVideoMute }}
        videoMuted={{ videoMuted, setVideoMuted }}
        audioMuted={{ audioMuted, setAudioMuted }}
        videoStream={videoStream!}
        {...{ peerId, }}      />
    );
  }
}


// import QATest from "@/components/QATest";
// import { useEffect, useRef, useState } from "react";
// import { VideoCallMain } from "./videoCall/mainPage";
// import Peer, { Peer as Ipeer } from "peerjs";
// import { socket } from "./socket";
// import { useIceServers } from "@/reactQuery/stripe";
// import { ChangeVideo } from "./videoCall/changeVideo";
// import { ChangeVoice } from "./videoCall/changeVoice";


// export default function VideoCall(): JSX.Element {
//   const { data, isSuccess } = useIceServers();

//   const [isStartingPage, setIsStartingPage] = useState(true);
//   const [peerId, setPeerId] = useState("");
//   const peerInstance = useRef<Peer | null>(null);
//   const callInstance = useRef<any>(null);
//   const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
//   const [videoMuted, setVideoMuted] = useState<boolean>(false);
//   const [audioMuted, setAudioMuted] = useState<boolean>(false);
//   const currentUserVideoRef = useRef<HTMLVideoElement>(null);
//   const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream | null>(null);
//   const [remotePeerId, setRemotePeerId] = useState(null);
//   const [deviceId, setDeviceId] = useState(null)
//   const [audioDeviceId, setAudioDeviceId] = useState(null)

//   const setupMediaStream = async (constraints) => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
//       if (currentUserVideoRef.current) {
//         currentUserVideoRef.current.srcObject = mediaStream;
//         currentUserVideoRef.current.play();
//       }
//       setVideoStream(mediaStream);
//     } catch (error) {
//       console.error('Error accessing media devices.', error);
//     }
//   };

//   const clearMediaStream = () => {
//     if (videoStream) {
//       videoStream.getTracks().forEach(track => track.stop());
//     }
//     setVideoStream(null);
//   };

//   useEffect(() => {
//     clearMediaStream();
//     if (!videoMuted && !audioMuted) {
//       // setupMediaStream({ video: { width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: true });
//       setupMediaStream({ video: { deviceId: (deviceId ? { exact: deviceId } : undefined), width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: {deviceId:(audioDeviceId ? { exact: audioDeviceId } : undefined)} });

//     } else if (videoMuted && !audioMuted) {
//       setupMediaStream({ audio: {deviceId:(audioDeviceId ? { exact: audioDeviceId } : undefined)} } );
//     } else if (!videoMuted && audioMuted) {
//       setupMediaStream({ video: { deviceId: (deviceId ? { exact: deviceId } : undefined), width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
//     } else {
//       navigator.mediaDevices.getDisplayMedia({ audio: false, video: false })
//         .then((mediaStream) => setVideoStream(mediaStream))
//         .catch((error) => console.error('Error accessing display media.', error));
//     }

//     return () => clearMediaStream();
//   }, [videoMuted, audioMuted, deviceId,audioDeviceId]);

//   const toggleVideoMute = () => {
//     if (videoStream) {
//       videoStream.getVideoTracks().forEach(track => {
//         track.enabled = !videoMuted;
//       });
//       setVideoMuted(prev => !prev);
//     }
//   };

//   const toggleAudioMute = () => {
//     if (videoStream) {
//       videoStream.getAudioTracks().forEach(track => {
//         track.enabled = !audioMuted;
//       });
//       setAudioMuted(prev => !prev);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       const iceServers = data.data?.v?.iceServers;
//       console.log(iceServers);
//       const peerConfig = {
//         config: {
//           iceServers: [
//             {
//               urls: iceServers.urls,
//               username: iceServers.username,
//               credential: iceServers.credential
//             }
//           ]
//         }
//       };

//       const peer = new Peer(peerConfig);

//       peer.on("open", (id) => {
//         console.log(id);
//         setPeerId(id);
//       });

//       peerInstance.current = peer;
//     }
//   }, [isSuccess]);

//   const endCall = () => {
//     if (callInstance.current) {
//       callInstance.current.close();
//       setRemoteVideoStream(null);
//       setIsStartingPage(true);
//     }
//   };
//   useEffect(() => {
//     const peer = peerInstance.current as Ipeer;

//     const handleCall = (call) => {
//       call.answer(videoStream!);
//       callInstance.current = call;
//       call.on("stream", function (remoteStream) {
//         console.log("call", remoteStream);
//         setRemoteVideoStream(remoteStream);
//         setIsStartingPage(false);
//       });

//       return () => {
//         call.close();
//         call.off("stream");
//       };
//     };

//     peer?.on("call", handleCall);


//     return () => {
//       peer?.off("call", handleCall);
//       peerInstance.current = null;
//     };
//   }, [videoStream, isSuccess]);

//   useEffect(() => {
//     if (remotePeerId && peerInstance.current) {
//       const call = peerInstance.current.call(remotePeerId, videoStream!);

//       console.log("useEffect----------");
//       call.on("stream", (remoteStream: MediaStream) => {
//         console.log(remoteStream, "remoteStream");
//         setRemoteVideoStream(remoteStream);
//         setIsStartingPage(false);
//       });


//       return () => {
//         call.close();
//         call.off("stream");
//       };
//     }
//   }, [remotePeerId]);

//   socket.on("callUser", ({ peerId }) => {
//     console.log("===================================++++===============", peerId, videoStream);
//     setRemotePeerId(peerId);
//   });
//   const handleSelectDevice = (deviceId: string) => {
//     setDeviceId(deviceId)
   
//   };
//   const handleSelectAudioDevice = (deviceId: string) => {
//     setAudioDeviceId(deviceId)
   
//   };

//   if (isStartingPage) {
//     return (
//       <QATest
//         ChangeVideo={<ChangeVideo onSelectDevice={handleSelectDevice} />}
//         ChangeVoice={<ChangeVoice onSelectDevice={handleSelectAudioDevice} />}
//         peerId={peerId}
//         toggle={{ toggleAudioMute, toggleVideoMute, startPage: setIsStartingPage }}
//         videoMuted={{ videoMuted, setVideoMuted }}
//         audioMuted={{ audioMuted, setAudioMuted }}
//         videoStream={videoStream!}
//         videoRef={currentUserVideoRef!}
//       />
//     );
//   } else {
//     return (
//       <VideoCallMain
//         remoteVideoStream={remoteVideoStream}
//         toggle={{ toggleAudioMute, toggleVideoMute }}
//         videoMuted={{ videoMuted, setVideoMuted }}
//         audioMuted={{ audioMuted, setAudioMuted }}
//         videoStream={videoStream!}
//         {...{ peerId, endCall }}
//       />
//     );
//   }
// }

