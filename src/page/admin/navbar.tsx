import { ModeToggle } from "@/components/mode-toggle";

import { IoLogInOutline } from "react-icons/io5";
import { AdminLoginDialog } from "./logoutdialog";
import { SetStateAction, useState } from "react";

export default function NaveBar(): JSX.Element {
    const [isOpen,setIsOpen] = useState(false)
  // const data = useSelector((state: RootState) => state.author?.authorData)
  return (
    <nav className=" fixed z-30 h-20 w-full flex justify-between border-b-2 px-6 pt-6 dark:bg-slate-800 bg-white ">
      <div>
        <img src="/SoloStack (2).png" className="hidden dark:block" alt="" />
        <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
      </div>
      <div className=" flex gap-6">
        {/* <div className="flex items-center"> */}
        {/* </div> */}

        <ModeToggle  />
        <IoLogInOutline onClick={()=>setIsOpen(true)} size={38} className="hover:text-slate-400 transition-colors" />
        {/* <UseAvatar avatarUrl={undefined} userName={undefined} /> */}
        <AdminLoginDialog isOpen={isOpen} setOpen={setIsOpen}/>
      </div>
    </nav>
  );
}
