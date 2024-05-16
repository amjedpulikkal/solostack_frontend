
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import react from "react"
import { FaGithub } from "react-icons/fa"
import { GrGoogle } from "react-icons/gr"
import { FaLinkedin } from "react-icons/fa6";



// const server = process.env.server || "localhost:3000/api/"

export function Authcomponents() {

    const server = "http://localhost:3000/api/v1"

    const handelGoogle = (oauth: string) => {
      window.location.href = `${server}/student/auth/${oauth}`
    }


    return (
        <div className="py-6 space-x-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <button  onClick={()=>handelGoogle("google")}  className="w-28 h-12 items-center justify-center inline-flex rounded-full font-bold text-lg border-2"><GrGoogle /></button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>google</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <button onClick={()=>handelGoogle("linkedin")} className="w-28 h-12 items-center justify-center inline-flex rounded-full font-bold text-lg border-2"><FaLinkedin /></button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>linkedin</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <button  onClick={()=>handelGoogle("github")}  className="w-28 h-12 items-center justify-center inline-flex rounded-full font-bold text-lg border-2"><FaGithub /></button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Github</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )

}