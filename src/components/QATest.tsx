import  {
  Dispatch,
  RefObject,
  SetStateAction,
  
} from "react";


import { CiMicrophoneOff } from "react-icons/ci";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { CiMicrophoneOn } from "react-icons/ci";

import ReactMic from "@/components/ReactMic";
import { RoundCountdownTimer } from "../page/videoCall/RoundCountdowntimer";
import IntelPage from "../page/videoCall/intelPage";
import { Button } from "./ui/button";

import { ChangeVideo } from "@/page/videoCall/changeVideo";
import { ChangeVoice } from "@/page/videoCall/changeVoice";
import { ChangeAudioinput } from "@/page/videoCall/chageAudiooutput";
import {socket} from "@/page/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type props = {
  videoRef: RefObject<HTMLVideoElement>;
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
    startPage: Dispatch<SetStateAction<boolean>>;
  },
  peerId:string,
};
export default function QATest({
  videoRef,
  videoStream,
  audioMuted,
  videoMuted,
  toggle,
  peerId,
}: props) {

  const { id } = useParams();
  const author = useSelector((state: RootState) => state.author?.author)
  const handleButton =()=>{

    socket.emit("joinVideoCall",{peerId:peerId,id,author})
    // toggle.startPage(false)
  }


  return (
    <>
     
      <div className=" p-10 gap-6 grid grid-cols-2">
        <div className=" md:col-span-1 col-span-2 h-3/5">
          <div className="relative rounded-2xl">
            <video
              width={1920}
              height={1080}
              muted
              className="outline outline-2  bg-slate-200 rounded-2xl outline-black/40  "
              ref={videoRef}
              style={{ transform: "scaleX(-1)" }}
            />
            <div className="flex w-full h-14 absolute bottom-0  justify-between mb-4 gap-2">
              <div className="">
                {!audioMuted.audioMuted && (
                  <ReactMic
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                    width={50}
                    height={40}
                    className="bg-primary absolute ml-3  rounded-full p-2 "
                    stream={videoStream}
                  />
                )}
              </div>

              <div className="flex justify-center w-full gap-2 mt-8">
                <div
                  onClick={toggle.toggleVideoMute}
                  className="outline outline-1 dark:outline-white/40 outline-black/40 dark:hover:bg-white/15  hover:bg-black/15 transition-colors flex justify-center items-center rounded-full p-3"
                >
                  {!videoMuted.videoMuted ? (
                    <BsFillCameraVideoFill className="text-primary" size={30} />
                  ) : (
                    <BsFillCameraVideoOffFill
                      className="text-primary"
                      size={30}
                    />
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
              </div>
            </div>
          </div>
          <div className=" w-full h-20 mt-3 flex justify-around ">
              <ChangeVideo/>
              <ChangeVoice/>
              <ChangeAudioinput/>
          </div>
        </div>
        <div className="  md:col-span-1 col-span-2 ">
          <div className=" mt-10 flex justify-center ">
            <IntelPage />
          </div>
          <div>
         
          <div className="flex justify-center">
            
            <Button className="mt-10" onClick={handleButton}>
              join new
            </Button>
          </div>
          </div>
        </div>
                 
        <div className="absolute top-0 right-0">
          <RoundCountdownTimer time={60} />
        </div>
        {/* <div jsslot="" jsname="rZHESd" class="bwApif-cnG4Wd"><div jscontroller="YDUgBc" jsaction="JIbuQc:Vtnhdc(aO7olb),TvD9Pc(IbE0S)"><div class="S3hgFf PwfYz"><div class="rqEaD"><img class="Ygemmd" alt="Arrow pointing towards the browser's permission dialog." data-iml="11886" src=""></div><div class="VlHPz"><h1 class="sZZjvf">Click <span class="hJH4we">Allow</span></h1>You can still turn off your microphone and camera anytime in the meeting.</div></div></div></div> */}
      </div>
    </>
  );
}
