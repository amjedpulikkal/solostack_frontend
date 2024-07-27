import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MdNetworkCheck } from "react-icons/md";
import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import { CiMicrophoneOff } from "react-icons/ci";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { CiMicrophoneOn } from "react-icons/ci";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import ReactMic from "@/components/ReactMic";
import { RoundCountdownTimer } from "../page/videoCall/RoundCountdowntimer";
import IntelPage from "../page/videoCall/intelPage";
import { Button } from "./ui/button";
// import ReactMic from 'react-mic';
import { FaChevronDown } from "react-icons/fa";
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
  callFn
};
export default function QATest({
  videoRef,
  videoStream,
  audioMuted,
  videoMuted,
  toggle,
  peerId,
  callFn
}: props) {
  const [speedMeter, SetSpeedMeter] = useState(0);
  const { id } = useParams();
  const[pid,setId] = useState(null)
  const author = useSelector((state: RootState) => state.author?.author)
  const handleButton =()=>{

    socket.emit("joinVideoCall",{peerId:peerId,id,author})
    // toggle.startPage(false)
  }


  return (
    <>
      <ReactInternetSpeedMeter
        outputType=""
        customClassName={null}
        pingInterval={2000} // milliseconds
        thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
        threshold={100}
        imageUrl="https://images.pexels.com/photos/3396664/pexels-photo-3396664.jpeg"
        downloadSize="1781287" //bytes
        callbackFunctionOnNetworkDown={(speed) => SetSpeedMeter(speed)}
        callbackFunctionOnNetworkTest={(speed) => SetSpeedMeter(speed)}
      />
      <div className="w-screen h-screen bg-white dark:bg-black p-8 pl-20 gap-6 flex">
        <div className=" w-3/5 h-3/5">
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

              <div className="flex justify-center w-full gap-2">
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
        <div className=" w-1/2 ">
          <div className="flex mt-8 gap-2 text-xl">
            <MdNetworkCheck className="text-primary" size={30} /> : {speedMeter}
            mb
          </div>
          <div className=" mt-10 flex justify-center ">
            <IntelPage />
          </div>
          <div>
          <input type="text" onChange={(e)=>setId(e.target.value)} />
          <button onClick={()=>callFn(pid)}>add</button>
          
            <Button className="mt-10" onClick={handleButton}>
              join new
            </Button>
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
