
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { ModeToggle } from "../../components/mode-toggle";
import { GrGoogle } from "react-icons/gr";
import { ImFacebook2 } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { GoogleLoginButton } from "../../components/GoogleOAuth"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SwitchUser } from "../../components/switchUser";
import { useAuthor } from '@/components/switchUser-provider';
import StudentLogin from './authors/student';
import TutorLogin from './authors/tutor';
import Mentor from './authors/mentor';
export default function App(): JSX.Element {
  
  const {author}=useAuthor()
  
  return (
    <>
      <div className='flex justify-end mt-6 mr-6'>
        <ModeToggle />
      </div>
      {author==="student"?<StudentLogin/>:author==="tutor"?<TutorLogin/>:<Mentor/>}
      <div className='flex justify-end mt-10 mr-6'>
        <SwitchUser />
      </div>
    </>
  )
}