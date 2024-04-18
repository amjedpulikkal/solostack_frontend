import UseAvatar from "./userAvatar";

import { ModeToggle } from "./mode-toggle";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { StudentData } from "@/type";


export default function NaveBar(): JSX.Element {
    const data = useSelector((state: RootState) => state.author?.authorData) as unknown as StudentData
    return (
        <nav className=' h-20 w-full flex justify-between border-b-2 px-6 pt-6 dark:bg-slate-800 bg-white ' >
            <div>
                    <img src="/SoloStack (2).png" className="hidden dark:block" alt="" />
                    <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
            </div>
            <div className=" flex gap-8">
                <ModeToggle />
                <UseAvatar avatarUrl={data.personal_info.photo} userName={data.personal_info.name} />
            </div>
        </nav>
    )
}