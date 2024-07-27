import { Calendar } from "@/components/ui/calendar";
import NaveBar from "./navBar";
import {  motion } from "framer-motion";
import {  useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useGetAvailableTime,
  useUpdateAvailableTime,
} from "@/reactQuery/mentor/mentorQuery";
import { toast } from "sonner";

// import { useToast } from "@/components/ui/use-toast";

import { DrawerDialogDetails } from "@/components/mentor/detailsdrawer";
import Requests from "./requests";


export default function HomePage(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [isHovered, setIsHovered] = useState<null | number>(null);
  const [selectedDate, setSelectedDate] = useState<number[]>([]);
  const GetAvailableTime = useGetAvailableTime(setSelectedDate, date);
  const { isLoading, mutate } = useUpdateAvailableTime(GetAvailableTime.refetch);
  // const bigToast = useToast();


  const handelSelectedDate = (index: number) => {
    if (selectedDate.includes(index)) {
      setSelectedDate(selectedDate.filter((item) => item !== index));
    } else {
      setSelectedDate([...selectedDate, index]);
    }
    console.log(selectedDate);
  };
  const handelInvalidSelectedDate = () => {
    toast.error("You cannot select a time before now.");
  };

  const handelUpdateDate = () => {
    mutate({ date, time: selectedDate });
  };
  return (
    <>
      <div className="w-full h-full">


        <audio ref={audioRef} className="hidden">
          <source src="/ringtone-126505.mp3" type="audio/mpeg" />
        </audio>
        <NaveBar />

        {/* <div className="flex w-full h-full"> */}
        {/* <div className="w-36 h-dvh bg-black flex flex-col gap-4 pt-3 ">
            <div className=" w-full h-24 flex gap-2 hover:bg-white/10 p-3 transition-colors">
              <span className="h-full w-1 bg-primary/60 rounded-full"></span>
              <div className=" w-full  h-full rounded-2xl outline outline-1 outline-primary/25 flex justify-center items-center">
                <MdOutlineEventAvailable className="text-primary" size={50} />
              </div>
            </div>
            <div className="w-full h-24 flex gap-2 p-3 transition-colors  hover:bg-white/10">
              <span className="h-full w-1 bg-primary/10 rounded-full"></span>
              <div className="w-full h-full rounded-2xl outline outline-1 outline-primary/10 flex justify-center items-center">
              <BsGraphUp className="text-primary/10"  size={50}/>
              </div>
            </div>

          </div> */}
        <div className="pl-2 pt-2 grid grid-cols-12 w-full h-full">
          <div className="col-span-9">
            <div className="flex justify-evenly mt-10 ">
              <p>AM</p>
              {[9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                const date1 = new Date(date);
                const date2 = new Date();
                const isSameDate =
                  date1.getFullYear() === date2.getFullYear() &&
                  date1.getMonth() === date2.getMonth() &&
                  date1.getDate() === date2.getDate();
                const beforeNew = date1.getFullYear() < date2.getFullYear() ||
                  date1.getMonth() < date2.getMonth() ||
                  date1.getDate() < date2.getDate()
                if (isSameDate && new Date().getHours() - 9 >= index || beforeNew) {
                  return (
                    <motion.button
                      onClick={() => handelInvalidSelectedDate()}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.4 }}
                      transition={{ duration: 0.1 }}
                      className={`line-through cursor-not-allowed text-red-500 w-12   dark:dark h-12 rounded-full ${selectedDate.includes(index) ? "bg-primary" : "bg-black"
                        }`}
                    >
                      &nbsp;{item}&nbsp;
                    </motion.button>
                  );
                } else {
                  return (
                    <motion.button
                      onClick={() => handelSelectedDate(index)}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.4 }}
                      transition={{ duration: 0.1 }}
                      whileTap={{ scale: 1.4 }}
                      className={` text-white w-12   dark:dark h-12 rounded-full ${selectedDate.includes(index) ? "bg-primary" : "bg-black"
                        }`}
                    >
                      &nbsp;{item}&nbsp;
                    </motion.button>
                  );
                }
              })}
              <p>PM</p>
            </div>

            <motion.div className="flex justify-evenly mt-5 px-7">
              {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(
                (item, index) => {
                  const isTimeAvailable = GetAvailableTime.data?.filter(
                    (obj: { time: number; }) => obj.time === item
                  )[0];

                  if (isTimeAvailable) {

                    if (isTimeAvailable.isBooked) {
                       const studentData = isTimeAvailable.requests.filter((item: { studentId: { _id: any; }; })=>item?.studentId._id === isTimeAvailable.bookedId?.studentId)[0]?.studentId
                       console.log(studentData,"-s--------------------studentData")
                      return (
                        <motion.div
                          key={index}
                          onMouseEnter={() => setIsHovered(index)}
                          onMouseLeave={() => setIsHovered(null)}
                          whileHover={{
                            width: "144px",
                            transition: { duration: 0.3 },
                          }}
                          className="text-white bg-black rounded-sm w-14 h-48"
                        >
                          <motion.div key={studentData?.personal_info?.photo}
                            className={`w-full border-4 rounded-md border-black h-14 bg-slate-500 ${isHovered === index
                              ? "hovered overflow-hidden"
                              : ""
                              }`}
                            style={{
                              backgroundImage: `url(${studentData?.personal_info?.photo})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                          ></motion.div>

                          {isHovered === index && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.4 }}
                              className=""
                            >
                              <div className="flex justify-center items-center">
                                <div>
                                  <p className="mt-1">
                                    Status <span className="">:</span>
                                  </p>
                                  <DrawerDialogDetails />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    }

                    if (isTimeAvailable?.requests?.length) {
                      return (
                        <motion.div
                          key={index}
                          onMouseEnter={() => setIsHovered(index)}
                          onMouseLeave={() => setIsHovered(null)}
                          whileHover={{
                            width: "auto",
                            transition: { duration: 0.3 },
                          }}
                          className="text-white bg-black rounded-sm w-14 h-48 pl-1"
                        >
                          <Requests getAvailableTime={GetAvailableTime} requests={isTimeAvailable} />

                        </motion.div>
                      );
                    } else {

                      return (
                        <motion.div
                          key={index}
                          onMouseEnter={() => setIsHovered(index)}
                          onMouseLeave={() => setIsHovered(null)}
                          whileHover={{
                            width: "144px",
                            transition: { duration: 0.3 },
                          }}
                          className="text-white bg-black rounded-sm w-14 h-48 flex justify-center items-center"
                        >
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rotate-90 text-2xl font-bold">No&nbsp;Booked</motion.p>
                        </motion.div>
                      );
                    }

                  } else {
                    return (
                      <motion.div
                        key={index}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        whileHover={{
                          width: "144px",
                          transition: { duration: 0.3 },
                        }}
                        className="text-white bg-black rounded-sm w-14 h-48"
                      ></motion.div>
                    );
                  }
                }
              )}
            </motion.div>

            <div className="flex justify-end mt-5 w-full">
              <Button
                onClick={handelUpdateDate}
                className={`${isLoading ? "cursor-wait" : ""}`}
              >
                {!isLoading ? "update" : "lording"}
              </Button>
              {/* <Button
                onClick={() => {
                  audioRef.current?.play();
                  bigToast.toast({
                    title: "Scheduled: Catch up ",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                    action: (
                      <button onClick={() => audioRef.current?.pause()}>
                        stop
                      </button>
                    ),
                  });
                }}
              >
                Show Toast
              </Button> */}
            </div>
          </div>
          <div className="col-span-3 flex justify-center items-center">
            <Calendar
              // disabled={{ before: new Date() }}
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow "
            />
          </div>
          {/* </div> */}
        </div>


      </div>
    </>
  );
}
