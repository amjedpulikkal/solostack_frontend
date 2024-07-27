import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,

    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoginDialog } from "../logoutdialog"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom"
type Props = {
    avatarUrl?: string
    userName: string
}




export default function UseAvatar({ avatarUrl, userName }: Props): JSX.Element {

    const [isOpen, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const handleRightClick = (e: { preventDefault: () => void }) => {
        e?.preventDefault();
        setSelectedId("profile-mentor")

    };
    const navigate = useNavigate()
    return (
        <div>
            <AnimatePresence >
                {selectedId && (
                    <motion.div layoutId={"profile-mentor"} className=" fixed inset-0 z-50 dark:bg-black/80 backdrop-blur-md bg-white/30  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                        {avatarUrl ?

                            <div className="w-full h-full flex justify-center items-center">
                                <div className="h-96 w-96 bg-white rounded-full flex justify-end items-start" style={{
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundImage: `url(https://d3sd9xkxgxzd5z.cloudfront.net/${avatarUrl})`
                                }}>

                                    <motion.button onClick={() => setSelectedId(null)} >
                                        <IoMdClose size={40} />
                                    </motion.button>
                                </div>

                            </div>
                            :

                            <div className="w-full h-full flex justify-center items-center">
                                <div className="h-96 w-96 bg-white rounded-full flex justify-end items-start" style={{
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundImage: `url(https://github.com/shadcn.png)`
                                }}>

                                    <motion.button onClick={() => setSelectedId(null)} >
                                        <IoMdClose size={40} />
                                    </motion.button>
                                </div>

                            </div>
                        }
                    </motion.div>
                )}
            </AnimatePresence>
            <LoginDialog setOpen={setOpen} isOpen={isOpen} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>

                    <motion.div layoutId={"profile-mentor"} onContextMenu={handleRightClick} onDoubleClick={() => {
                        setSelectedId("profile-mentor")

                    }}>

                        {avatarUrl ?
                            <Avatar >
                                <AvatarImage src={`https://d3sd9xkxgxzd5z.cloudfront.net/${avatarUrl}`} />
                                <AvatarFallback>{userName?.toUpperCase()[0] + userName?.toUpperCase()[1]}</AvatarFallback>
                            </Avatar>
                            :
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        }
                    </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 mr-2 mt-2 rounded-xl">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => navigate(`/mentor/${userName}`)} >
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem className="text-red-600 focus:text-red-500 focus:outline-red-500 " onClick={() => setOpen(!isOpen)}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >

    )



}