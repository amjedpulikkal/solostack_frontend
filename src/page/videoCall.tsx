
import QATest from "@/components/QATest";
import { useEffect, useRef, useState } from "react"
import { VideoCallMain } from "./videoCall/mainPage";

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
      setupMediaStream({ video: { width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: true });
    } else if (videoMuted && !audioMuted) {
      setupMediaStream({ audio: true });
    } else if (!videoMuted && audioMuted) {
      setupMediaStream({ video: { width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
    } else {
      navigator.mediaDevices.getDisplayMedia({ audio: false, video: false })
        .then((mediaStream) => setVideoStream(mediaStream))
        .catch((error) => console.error('Error accessing display media.', error));
    }

    return () => clearMediaStream();
  }, [videoMuted, audioMuted]);

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
        {...{ peerId, }}
      />
    );
  }
}
