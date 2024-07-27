
import QATest from "@/components/QATest";
import { useEffect, useRef, useState } from "react"
import { VideoCallMain } from "./videoCall/mainPage";

import Peer, { Peer as Ipeer,  } from "peerjs";
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

      // navigator.permissions.query({ name: "" }).then((res) => {
      //   console.log(res);
      // });

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


  
  useEffect(() => {
    if(remotePeerId&& peerInstance.current){
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


  if (isStartingPage) {
    return (
      <QATest
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
