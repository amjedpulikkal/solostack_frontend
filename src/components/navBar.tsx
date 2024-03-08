import UseAvatar from "./userAvatar";

import { ModeToggle } from "./mode-toggle";


export default function NaveBar(): JSX.Element {
    return (
        <nav className=' h-20 w-full flex justify-between px-6 pt-6 dark:bg-slate-800 bg-slate-500 ' >
            <div>
                <img src="/SoloStack (2).png" className="hidden dark:block" alt="" />
                <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
            </div>
            <div className="">
                <ModeToggle />
             
            </div>
        </nav>
    )
}