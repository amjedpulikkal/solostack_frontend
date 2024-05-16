import { ModeToggle } from "@/components/mode-toggle"
import UseAvatar from "@/components/mentor/userAvatar"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"




export default function NaveBar(): JSX.Element {
    const data = useSelector((state: RootState) => state.author?.authorData) 
    return (
        <nav className=' fixed z-30 h-20 w-full flex justify-between border-b-2 px-6 pt-6 dark:bg-slate-800 bg-white ' >
            <div>
                <img src="/SoloStack (2).png" className="hidden dark:block" alt="" />
                <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
            </div>
            <div className=" flex gap-8">
                <ModeToggle />
                <UseAvatar avatarUrl={undefined} userName={undefined} />
            </div>
        </nav>
    )
}