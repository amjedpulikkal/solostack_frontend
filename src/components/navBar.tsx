import UseAvatar from "./userAvatar";

import { ModeToggle } from "./mode-toggle";

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
            <div className="flex gap-3 bg-black h-16 -mt-1 rounded-full ps-2 dark:outline dark:outline-1 items-center ">
                <div className="bg-background border border-input hover:bg-accent rounded-3xl flex h-12  px-2 gap-1">
                    <TbCoinMoneroFilled className="mt-2" size={35} />
                    <div className=" flex justify-center  items-center">
                        <p className="text-xl">
                            600
                        </p>

                    </div>
                </div>
                <ModeToggle />
                <UseAvatar avatarUrl={data.personal_info.photo} userName={data.personal_info.name} />
            </div>
        </nav>
    )
}