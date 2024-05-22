import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useChatHistory } from '@/reactQuery/student/chatQuery';
import { RootState } from '@/redux/store';
import { Avatar } from '@radix-ui/react-avatar';
import { motion } from 'framer-motion';
import React from 'react'
import { IoSendOutline } from 'react-icons/io5';
import { MdAddCircleOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';


type props ={
    chatData:[
        user:{
          type:string,
          user:string,
          data:string,
          Url:string,
          date:Date
        }
    ],
    
    handleKeyPress
    inputRef
    handleSendData
}
const framerAni = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

export default function ChatMain({chatData,handleKeyPress,inputRef,handleSendData}:props) {
  const author = useSelector((state: RootState) => state.author?.authorData)

  return (
    <div className="w-full md:w-9/12 rounded-3xl md:ml-2   flex flex-col  ">
          <div className="dark:bg-white/10  bg-black/10 w-full h-20  flex justify-start  gap-2 md:rounded-t-3xl px-3 items-center ">
            <div className="bg-black w-10 h-10 rounded-3xl "></div>
            <div className="">
              <p className="capitalize">full stackn</p>
              <p className="text-black/20 dark:text-white/20 w-1/2 text-clip">
                @amjed_+pulikkal,@amjeded24234
              </p>
            </div>
          </div>
          <div className="px-2 w-full div1 h-full flex flex-col-reverse rounded-xl scrollbar overflow-y-scroll pb-7">
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
              chatData.map((item) => {
                if (item.senderId === author._id) {
                  if (item.message.type == "image") {
                    return (
                      <div className=" flex justify-end mt-5 ">
                        <div className="md:w-1/2 w-10/12 flex justify-end">
                          <div className="py-3 px-4 text-start bg-black/10 dark:bg-white/10  rounded-bl-3xl rounded-tl-3xl rounded-tr-xl">
                            <div className="flex justify-center bg-black  rounded-2xl">
                              <img
                                src={item.Url}
                                className="max-w-40 max-h-40 "
                                alt=""
                              />
                            </div>
                            <div className="mt-2">{item.message.data}</div>

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
                      <motion.div
                        {...framerAni}
                        className=" flex justify-end mt-4 "
                      >
                        <div className="md:w-1/2 w-10/12 flex justify-end">
                          <div className="py-3 px-4 text-start dark:bg-white/10 bg-black/10 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl">
                            {item.message.data}
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
                    );
                  }
                } else {
                  return (
                    <motion.div {...framerAni} className="w-full flex mt-5 ">
                      <div className="py-3 text-black/80 px-4 bg-black/5 dark:bg-white/5 rounded-b-3xl rounded-tr-3xl   dark:text-white md:w-1/2 w-10/12">
                        <div className="flex gap-2 items-center ">
                          <Avatar>
                            <AvatarImage src={item.Url} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="">
                            <p className="capitalize">
                              {item.user}
                              <span className=" ml-1 inline-flex items-center gap-x-1.5 py-1 px-2 rounded-full text-xs font-medium border border-gray-500 text-gray-500 dark:text-neutral-400">
                                Student
                              </span>
                            </p>
                            <p className="text-black/20 dark:text-white/20">
                              @{item.user}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">{item.data}</div>
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
                  );
                }
              })
            )}
          </div>
          <div className="dark:bg-white/10  bg-black/10 w-full h-20  md:px-0  md:rounded-b-3xl flex justify-between ">
            <div className="flex justify-center items-center w-[8.35%] ">
              <MdAddCircleOutline
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
