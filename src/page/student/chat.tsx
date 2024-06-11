import { ModeToggle } from "../../components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
// import { RiCheckDoubleLine } from "react-icons/ri";
import { IoSendOutline } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { socket } from "../socket";
import { useRef } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ChatMain from "./chat/chatMain";
import { useChatHistory, useGetGroup } from "@/reactQuery/student/chatQuery";

const framerAni = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
import {
  DropdownMenu,
  DropdownMenuItem,
  // <DropdownMenu></DropdownMenu>,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { CiMenuKebab } from "react-icons/ci";
import JoinNewGroup from "./chat/joinNewGroup";




export default function Chat(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentGroup, setCurrentGroup] = useState(null)
  const author = useSelector((state: RootState) => state.author?.authorData)
  const [isCGOpen, setIsCGopen] = useState(false)
  const [currentChatData, setCurrentChatData] = useState(null);

  // const {isLoading,data }=useGetGroup(author._id)

  const [chatData, setChatData] = useState([]);
  const [group, setGroup] = useState([])
  // const { isLoading, data } = useChatHistory(currentGroup?._id, setChatData)
  const handleCurrentChat = (item) => {
    setChatData([...item.messages].reverse())
    item.notification = 0
    setCurrentGroup(item)
  }
  useEffect(() => {
    socket.emit("userID", { userID: author?._id })
    // socket.emit("subscription", { group: "mernStack" });
  }, [author?._id]);

  socket.on("groups", ({ data }) => {
    console.log(data)
    // setCurrentGroup(data[0])
    setGroup(data)
  })



  // const obj = [...group]
  // obj.find(i => i._id === data.groupId).messages = [...obj.find(i => i._id === data.groupId), data]
  // setGroup(obj)

  useEffect(() => {
    console.log("chatData=------------------", currentChatData)
    const obj = [...group]
    if (currentChatData) {
      if (currentGroup?._id === currentChatData.groupId) {
        console.log("-------sffsdfsd----------")
        audioRef.current?.play();

        setChatData([currentChatData, ...chatData]);
      }
      const chatObj = obj.find(i => i._id === currentChatData.groupId)
      chatObj.messages = [...chatObj.messages, currentChatData]

      if (chatObj?._id !== currentGroup?._id) {
        chatObj.notification = typeof chatObj.notification === "number" ? chatObj.notification += 1 : chatObj.notification===undefined?1:0
      }
    }
    obj.sort((a, b) => {
      return (new Date(b.messages[b.messages?.length - 1]?.date)) - (new Date(a.messages[a.messages?.length - 1]?.date))
    });
    console.log(obj)
    setGroup(obj)
  }, [currentChatData])

  console.log("data");
  socket.on("receiveData", ({ data }) => {
    console.log("receive--", data);
    setCurrentChatData(data)


  });

  const handleSendData = () => {
    if (!inputRef.current.value.trim()) return;
    const data = {
      groupId: currentGroup?._id,
      senderId: author._id,
      message: { data: inputRef.current?.value, type: "text" },
      senderTag: "student",
      email: author.email,
      user: author.personal_info.userName,
      url: `https://i.pravatar.cc/150?u=a042581f4e29026024d`,
      data: inputRef.current?.value,
      date: new Date(),
    }

    socket.emit("sendData", data);
    inputRef.current.value = "";
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendData();
    }
  };

  return (
    <>
      <div className=" h-dvh w-dvw flex justify-between md:p-5">
        <audio className="hidden" src="/bloop-1-184019.mp3 " ref={audioRef} />
        <JoinNewGroup isCGOpen={isCGOpen} setIsCGopen={setIsCGopen} />
        <div className="w-1/4 h-full hidden md:block dark:bg-black rounded-3xl  outlie dark:border-none border-2  pb-2 ">
          <div className="w-full h-20 flex justify-around items-center">
            <img
              src={author.personal_info?.photo}
              className="bg-slate-400 rounded-full w-10 h-10"
              alt=""
            />
            <input
              type="text"
              className="bg-transparent outline pl-4 outline-1 outline-primary/30 rounded-full h-10"
            />
            <ModeToggle />
            <div className="flex items-center text-xl">
              <DropdownMenu  >
                <DropdownMenuTrigger asChild>
                  <button >
                    <CiMenuKebab size={30} className="hover:text-primary" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl" >
                  {/* <DropdownMenuRadioGroup > */}
                  <DropdownMenuItem className="rounded-2xl" onClick={() => setIsCGopen(true)} >
                    join new Groups
                  </DropdownMenuItem >
                  {/* <DropdownMenuItem className="flex justify-between"  >
                    <p>Them</p>  <ModeToggle />
                  </DropdownMenuItem > */}

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div
            className=" w-full h-full  overflow-y-scroll scrollbar px-3"
            style={{ height: "85%" }}
          >
            <LayoutGroup>

              {group.map((item) => {
                return (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }} onClick={() => handleCurrentChat(item)} className="rounded-xl mt-3 relative w-auto h-16  outline outline-1 outline-white/10 hover:bg-slate-200 dark:hover:bg-zinc-900 p-2 flex">
                    <img className="w-1/5 h-full rounded-xl  " src={`https://d3sd9xkxgxzd5z.cloudfront.net/${item.image}`} />
                    <div className="pl-2 truncate ">
                      <p
                        className="capitalize dark:text-white text-black"
                        style={{ fontSize: "18px" }}
                      >
                        {item.groupName}
                      </p>
                      <p className="text-white/40">
                        @{item?.messages[item?.messages?.length - 1]?.senderData?.personal_info?.userName || item?.messages[item?.messages?.length - 1].user}:<span>{item?.messages[item?.messages?.length - 1]?.message?.data}</span>
                      </p>
                    </div>
                    {item.notification >= 1 &&

                      (<div className="w-6 h-6 rounded-3xl bg-primary absolute top-0 mt-6 mb-6 me-2 right-0 text-black/90 flex justify-center  items-center">{item.notification}</div>)
                    }
                  </motion.div>
                );
              })}
            </LayoutGroup>

          </div>
        </div>
        <ChatMain handleKeyPress={handleKeyPress} handleSendData={handleSendData} inputRef={inputRef} chatData={chatData || []} currentGroup={currentGroup} />
      </div>
    </>
  );
}
