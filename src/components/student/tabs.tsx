
import {  motion } from "framer-motion";

import { useEffect, useState } from "react";
import { useAvailableTime } from "@/reactQuery/mentor/mentorQuery";

import { IoMdClose } from "react-icons/io";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};



const categoryAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
import { DatePickerDemo } from "@/components/datePicker";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import DialogBookMentor from "./dialogBookMentor";
import { ReviewDbObj } from "@/type";


export default function StudentTabs(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());
  const [openAndData, setOpenAndData] = useState<{ isOpen: boolean, data: ReviewDbObj|null }>({ isOpen: false, data: null });
  const [time, setTime] = useState<number>(4);
  const { data, isLoading, isSuccess, mutate } = useAvailableTime();
  const [category, setCategory] = useState<string[]>([]);
  if (isSuccess) {
    console.log(data);
  }
  useEffect(() => {
    mutate({ date, time });
  }, [time, date]);
  return (
    <div className="h-full w-full p-5 ">
      <div className="w-full flex justify-end relative">
        <div className="grid grid-cols-6  gap-2 w-full pe-4">
          <div className="flex  md:col-span-3 col-span-6 justify-end bg-secondary rounded-ss-full  rounded-es-full  rounded-se-full rounded-ee-full">
            <motion.div className="w-full h-full  gap-1 flex justify-around items-center ">
              {[9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                if (time === index) {
                  return (
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className="w-10 hover:border  h-10 outline outline-primary  bg-background rounded-full flex justify-center items-center text-primary"
                    >
                      {item}
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    onClick={() => {
                      setTime(index);
                    }}
                    className="w-10 h-10  bg-white  rounded-full flex justify-center items-center text-primary"
                  >
                    {item}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <Input
            className="md:col-span-1 col-span-6"
            type="search"
            placeholder="Search mentor"
          />
          <Input
            className="md:col-span-1 col-span-2 "
            // onPaste={(e) => setCategory([...category, e.target?.value])}
            type="search"
            placeholder="category"
          />
          <DatePickerDemo date={date} setDate={setDate} />

          {/* <span className="absolute top-0 left-8 transform -translate-y-1/2 w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span> */}
        </div>
      </div>
      <div className="flex justify-start mt-5">
        {/* <AnimatePresence mode="popLayout" > */}

        {category.map((item, index) => (
          <motion.div
            key={index}
            {...categoryAnimation}
            className="flex bg-primary ml-2 rounded-full px-3 py-1 "
          >
            {item}
            <button
              className="ml-2"
              onClick={() => {
                setCategory([...category.filter((i) => i !== index.toString())]);
              }}
            >
              <IoMdClose color="black" size={20} />
            </button>
          </motion.div>
        ))}

        {/* </AnimatePresence> */}
      </div>
      {(!data?.length && !isLoading) && <div className="md:w-screen h-full flex justify-center flex-col gap-4">

        <img src="/undraw_diary_re_4jpc.svg" className="md:h-3/4 w-[80%] " alt="" />

        <p className="text-center text-pri text-4xl">No results found</p>
      </div>}


      <motion.div
        variants={container}
        
        initial="hidden"
        animate="visible"
        className=" grid mt-14 mb-16 grid-cols-12 gap-3"
      >
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2].map(() =>
            <motion.div  className="col-span-2 animate-pulse   bg-muted  rounded-3xl h-60  w-48 flex justify-center  items-end ">
              {/* <Skeleton
                className=""

              > */}
                <div className="w-full flex flex-col justify-center">
                  <div className="flex justify-center">
                    <div className="h-11 rounded-3xl w-11/12 backdrop-blur-sm bg-black/30 mb-2 flex justify-center px-2 items-center text-primary-foreground dark:text-white ">
                      <p className="text-lg font-serif  ">
                        {/* @{data.mentorId.personal_info.userName} */}
                      </p>
                    </div>
                  </div>
                  <Button
                    // onClick={() => setOpenAndData({ isOpen: true, data: data?._id })}
                    className="rounded-ee-3xl bg-primary-foreground  rounded-ss-none rounded-se-none rounded-es-3xl"
                  >
                    Book new
                  </Button>
                </div>


              {/* </Skeleton> */}
            </motion.div>
          )
        }
        {/* {!group.length &&} */}
        {data?.map((data:ReviewDbObj) => (
          <>
            <motion.div
              className="col-span-2  rounded-3xl h-60  w-48 flex justify-center  items-end"
              style={{
                backgroundImage: `url(https://d3sd9xkxgxzd5z.cloudfront.net/${data?.mentorId.personal_info.photo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: " cover",
              }}
            >
              <div className="w-full flex flex-col justify-center">
                <div className="flex justify-center">
                  <div className="h-11 rounded-3xl w-11/12 backdrop-blur-sm bg-black/30 mb-2 flex justify-center px-2 items-center text-primary-foreground dark:text-white ">
                    <p className="text-lg font-serif  ">
                      @{data.mentorId.personal_info.userName}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setOpenAndData({ isOpen: true, data: data })}
                  className="rounded-ee-3xl rounded-ss-none rounded-se-none rounded-es-3xl"
                >
                  Book new
                </Button>
              </div>
            </motion.div>
          </>
        ))}
      </motion.div>

      <DialogBookMentor openAndData={openAndData} setOpenAndData={setOpenAndData} />

    </div >
  );
}
