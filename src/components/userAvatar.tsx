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
import { LoginDialog } from "./logoutdialog"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { IoMdClose } from "react-icons/io";
import { NavLink, } from "react-router-dom"
type Props = {
  avatarUrl: string
  userName: string
}




export default function UseAvatar({ avatarUrl, userName }: Props): JSX.Element {

  const [isOpen, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSelectedId("profile-1234");
  };
  

  return (
    <div>
      <AnimatePresence >
        {selectedId && (
          <motion.div layoutId={"profile-1234"} className=" fixed inset-0 z-50 dark:bg-black/80 backdrop-blur-md bg-white/30  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="w-full h-full flex justify-center items-center">
              <div className="h-96 w-96 bg-w rounded-full flex justify-end items-start" style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: `url(${avatarUrl})`
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

          <motion.div layoutId={"profile-1234"} onContextMenu={handleRightClick} onDoubleClick={() => {
            setSelectedId("profile-1234")

          }}>

            {avatarUrl ?
              <Avatar className="w-20 h-20 outline" >
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
            <NavLink
              className={({ isActive }) =>
                isActive ? "*:bg-background  transition-colors" : " *:hover:bg-primary-foreground transition-colors"
              } to={"/student/mentor"}>
              <DropdownMenuItem  >
                Mentors
              </DropdownMenuItem>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "*:bg-background  transition-colors" : " *:hover:bg-primary-foreground transition-colors"
              } to={`/student/${userName}`}>
              <DropdownMenuItem  >
                Profile
              </DropdownMenuItem>
            </NavLink>
            <DropdownMenuItem>
              Settings
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
            </DropdownMenuGroup>  */}
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