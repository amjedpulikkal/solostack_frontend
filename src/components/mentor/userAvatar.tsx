import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoginDialog } from "../logoutdialog"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { setPresence } from "@/redux/slices/authorSlice"
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom"
type Props = {
    avatarUrl?: string
    userName?: string
}




export default function UseAvatar({ avatarUrl, userName }: Props): JSX.Element {

    const [isOpen, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const dispatch = useDispatch()
    const handleRightClick = (e) => {
        e.preventDefault();
        setSelectedId("profile-mentor")

    };
    const navigate = useNavigate()
    return (
        <div>
            <AnimatePresence >
                {selectedId && (
                    <motion.div layoutId={"profile-mentor"} className=" fixed inset-0 z-50 dark:bg-black/80 backdrop-blur-md bg-white/30  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
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
                                <AvatarImage src={avatarUrl} />
                                <AvatarFallback>{userName.toUpperCase()[0] + userName.toUpperCase()[1]}</AvatarFallback>
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
                        <DropdownMenuItem onClick={() => navigate(`/mentor/profile/${userName}`)} >
                            {/* <motion.div layoutId={"profile-1234"} onClick={() => dispatch(setPresence("profile-1234"))}> */}
                            Profile
                            {/* </motion.div> */}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {/* <DropdownMenuSeparator /> */}
                    {/* <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
                    {/* <DropdownMenuSeparator /> */}
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem className="text-red-600 focus:text-red-500 focus:outline-red-500 " onClick={() => setOpen(!isOpen)}>
                        Log out
                        {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


        </div >


    )



}