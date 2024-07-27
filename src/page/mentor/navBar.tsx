import { ModeToggle } from "@/components/mode-toggle"
import UseAvatar from "@/components/mentor/userAvatar"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { StudentData } from "@/type"




export default function NaveBar(): JSX.Element {
    const data = useSelector((state: RootState) => state.author?.authorData)  as StudentData
    return (
        <nav className='  h-20 w-full flex justify-between border-b-2 px-6 pt-6 dark:bg-stone-900 bg-white' >
            <div>
                <img src="/SoloStack (2).png" className="hidden dark:block" alt="" />
                <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
            </div>
            <div className=" h-full w-full flex justify-center gap-6">
            <NavLink className={({ isActive }) =>
              isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
            } to={"/mentor"} end>
              <div className=" p-3 rounded-3xl" >Home</div>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
            } to={"/mentor/update-time"}>
              <div className=" p-3 rounded-3xl" >Update time</div>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
            } to={"/mentor/chat"}>

              <div className=" p-3 rounded-3xl">Chat</div>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
            } to={"/mentor/plan"}>
              <div className=" p-3 rounded-3xl" >Plan</div>
            </NavLink>
            </div>
            <div className=" flex gap-8">
                <ModeToggle />
                <UseAvatar avatarUrl={data.personal_info.photo!} userName={data.personal_info.userName!} />
            </div>
        </nav>
    )
}