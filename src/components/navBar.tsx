import UseAvatar from "./userAvatar";

import { ModeToggle } from "./mode-toggle";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { StudentData } from "@/type";
import { TbCoinMoneroFilled } from "react-icons/tb";

export default function NaveBar(): JSX.Element {
  const data = useSelector((state: RootState) => state.author?.authorData) as unknown as StudentData
  return (
    <nav className=' h-20 w-full flex justify-between border-b-2 px-6 pt-6 dark:bg-stone-900 bg-white ' >
      <div>
        <img src="/SoloStack (2).png" className="hidden dark:block" alt="" />
        <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
      </div>
      <div className=" h-full w-full flex justify-center gap-6">
        <NavLink className={({ isActive }) =>
          isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
        } to={"/student"} end>
          <div className=" p-3 rounded-3xl" >Home</div>
        </NavLink>
        <NavLink className={({ isActive }) =>
          isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
        } to={"/student/mentor"}>
          <div className=" p-3 rounded-3xl" >Mentors</div>
        </NavLink>
        <NavLink className={({ isActive }) =>
          isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
        } to={"/student/chat"}>

          <div className=" p-3 rounded-3xl">Chat</div>
        </NavLink>
        <NavLink className={({ isActive }) =>
          isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
        } to={"/student/payment"}>
          <div className=" p-3 rounded-3xl" >Plan</div>
        </NavLink>
      </div>
      <div className="flex gap-3 bg-black h-16 -mt-1 rounded-full ps-2 dark:outline dark:outline-1 items-center ">
        <div className="bg-background border border-input hover:bg-accent rounded-3xl flex h-12  px-2 gap-1">
          <TbCoinMoneroFilled className="mt-2" size={35} />
          <div className=" flex justify-center  items-center">
            <p className="text-xl">
              {data.wallet}
            </p>

          </div>
        </div>
        <ModeToggle />
        <UseAvatar avatarUrl={data.personal_info.photo} userName={data.personal_info.name} />
      </div>
    </nav>
  )
}