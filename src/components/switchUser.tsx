
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { PiChalkboardTeacherFill } from "react-icons/pi"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { useAuthor } from "./switchUser-provider";
import { useTheme } from "./theme-provider";
export function SwitchUser() {



    const { author, setAuthor } = useAuthor()


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="p-2" size="icon">
                    {author === "student" ? <PiStudentBold size={40} /> : author === "mentor" ? <GiTeacher size={40} /> : author === "tutor" ? <PiChalkboardTeacherFill size={40} /> : ""}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mr-2">
                <DropdownMenuRadioGroup value={author} onValueChange={setAuthor}>
                    <DropdownMenuRadioItem value="student" >
                        <div className=" flex justify-between items-center">
                            <PiStudentBold size={40} />
                            <p className="ml-2">Student</p>
                        </div>
                    </DropdownMenuRadioItem >
                    <DropdownMenuRadioItem value="mentor">
                        <div className=" flex justify-between items-center">
                            <GiTeacher size={40} />
                            <p className="ml-2">Mentor</p>
                        </div>
                    </DropdownMenuRadioItem >
                    <DropdownMenuRadioItem value="tutor" >
                        <div className=" flex justify-between items-center">
                            <PiChalkboardTeacherFill size={35} />
                            <p className="ml-2">Tutor</p>
                        </div>
                    </DropdownMenuRadioItem >
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}