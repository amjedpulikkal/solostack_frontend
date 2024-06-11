import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useChatHistory } from '@/reactQuery/student/chatQuery';
import { RootState } from '@/redux/store';
import { Avatar } from '@radix-ui/react-avatar';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { IoSendOutline } from 'react-icons/io5';
import { MdAddCircleOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';


type props = {
  chatData: [
    user: {
      type: string,
      user: string,
      data: string,
      Url: string,
      date: Date
    }
  ],

  handleKeyPress
  inputRef
  handleSendData,
  currentGroup
}
const framerAni = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
import { FaArrowDown } from "react-icons/fa";
export default function ChatMain({ chatData, handleKeyPress, inputRef, handleSendData, currentGroup }: props) {
  const author = useSelector((state: RootState) => state.author?.authorData)
  const chatDiv = useRef<HTMLDivElement>(null)
  const [isHidden, setIsHidden] = useState(false)
  const allDate = new Set()
  let preV = ""

  const handleScroll = () => {
    if (chatDiv.current) {
      setIsHidden(chatDiv.current.scrollTop <= -5);
    }
  };

  useEffect(() => {
    if (chatDiv.current) {
      chatDiv.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (chatDiv.current) {
        chatDiv.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  return (
    <div className="w-full md:w-9/12 rounded-3xl md:ml-2   flex flex-col  ">
      <div className="dark:bg-white/10  bg-black/10 w-full h-20  flex justify-start  gap-2 md:rounded-t-3xl px-3 items-center ">
        <img className="bg-black w-10 h-10 rounded-3xl " src={`https://d3sd9xkxgxzd5z.cloudfront.net/${currentGroup?.image}`} />
        <div className="">
          <p className="capitalize">{currentGroup?.groupName}</p>
          <p className="text-black/20 dark:text-white/20 w-1/2 text-clip">
            @amjed_+pulikkal,@amjeded24234
          </p>
        </div>
      </div>
      <div ref={chatDiv} className="px-2 w-full div1 h-full flex flex-col-reverse  rounded-xl overflow-hidden scrollbar overflow-y-scroll pb-7 ">
        <span className=' w-full flex justify-center '>
          <AnimatePresence>
            {isHidden && <motion.div onClick={() => {
              if (chatDiv.current) {
                chatDiv.current.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });

              }
            }}
              {...{
                initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 20 }, exit: { opacity: 0, y: 80 },
                transition: { duration: 0.2 }, whileHover: { scale: 1.3 }
              }} className='w-10 h-10 absolute -mt-20 cursor-pointer bg-primary rounded-full flex justify-center items-center'>
              <FaArrowDown size={28} />
            </motion.div>}
          </AnimatePresence>
        </span>
        {/* <div className='flex w-full justify-center'>{}</div> */}
        {chatData.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <span className="wrapper w-[800px] bg-transparent ">
              <svg className="">
                <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                  SoloStack
                </text>
              </svg>
            </span>
          </div>
        ) : (
          chatData.map((item, i) => {
            const dateObject = new Date(item.date);

            const formattedDate = dateObject.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            let newDate: string

            if (!allDate.has(formattedDate)) {
              newDate = preV
              preV = formattedDate
              // newDate = formattedDate

              console.log(newDate, "--------sde222222222222")
              allDate.add(formattedDate)
            }



            if (item.senderId === author._id) {
              if (item.message.type == "image") {
                return (
                  <div key={item._id} className=" flex justify-end mt-5 ">
                    <div className="md:w-1/2 w-10/12 flex justify-end">
                      <div className="py-3 px-4 text-start bg-black/10 dark:bg-white/10  rounded-bl-3xl rounded-tl-3xl rounded-tr-xl">
                        <div className="flex justify-center bg-black  rounded-2xl">
                          <img
                            src={item.Url}
                            className="max-w-40 max-h-40 "
                            alt=""
                          />
                        </div>
                        <div className="mt-2">{item.message?.data}</div>

                        <div className=" flex justify-start mt-2">
                          <p className=" dark:text-white/50 text-black/50 text-sm font">
                            5:40pm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <>
                    <div className='flex mt-2 w-full justify-center'>
                      <div className='bg-primary/80 px-4 rounded-full'>
                        {newDate === new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) ? "Today" : newDate}
                      </div>
                    </div>
                    <motion.div key={item._id}
                      {...framerAni}
                      className=" flex justify-end mt-4 "
                    >
                      <div className="md:w-1/2 w-10/12 flex justify-end">
                        <div className="py-3 px-4 text-start dark:bg-white/10 bg-black/10 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl">
                          {item.message?.data}
                          <div className=" flex justify-start mt-2">
                            <p className="dark:text-white/50 text-black/50 text-sm font">
                              {new Intl.DateTimeFormat("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }).format(new Date(item.date))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                );
              }
            } else {
              return (<>

                <div className='flex mt-4 w-full justify-center '>
                  <div className='bg-primary/80 px-4 rounded-full'>
                    {newDate === new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) ? "Today" : newDate}
                  </div>

                </div>
                <motion.div key={item._id} {...framerAni} className="w-full flex mt-5 ">

                  <div className="py-3 text-black/80 px-4 bg-black/5 dark:bg-white/5 rounded-b-3xl rounded-tr-3xl   dark:text-white md:w-1/2 w-10/12">
                    <div className="flex gap-2 items-center "> 
                      <Avatar>
                        <AvatarImage   className='w-12 rounded-full' src={item.senderData?.personal_info?.photo} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="">
                        <p className="">
                          {item.senderData?.email || item.email}
                          <span className="capitalize ml-1 inline-flex items-center gap-x-1.5 py-1 px-2 rounded-full text-xs font-medium border border-gray-500 text-gray-500 dark:text-neutral-400">
                            {item?.senderTag}
                          </span>
                        </p>
                        <p className="text-black/20 dark:text-white/20">
                          @ {item.senderData?.personal_info?.userName || item.user}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">{item.message?.data}</div>
                    <div className="w-full  flex justify-end">
                      <p className="dark:text-white/50 text-black/50  text-sm font">
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }).format(new Date(item.date))}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
              );
            }
          })
        )}
      </div>
      <div className="dark:bg-white/10  bg-black/10 w-full h-20  md:px-0  md:rounded-b-3xl flex justify-between ">
        <div className="flex justify-center items-center w-[8.35%] ">
          <MdAddCircleOutline onClick={() => setIsHidden(!isHidden)}
            className="text-white/80  hover:text-primary/70  transition-colors"
            size={40}
          />
        </div>
        <div className="col-span-6 w-5/6 h-full flex justify-center items-center ">
          <Input
            onKeyDown={handleKeyPress}
            ref={inputRef}
            placeholder="sent message"
            className="w-full h-full focus-visible:ring-0 rounded-none focus-visible:ring-offset-0 dark:bg-white/5 bg-black/30 "
            type="text"
          />
        </div>
        <div className="flex  justify-center items-center w-[8.35%] ">
          <IoSendOutline
            className="text-white/80  hover:text-primary/70 transition-colors"
            size={40}
            onClick={handleSendData}
          />
        </div>
      </div>
    </div>
  )
}

