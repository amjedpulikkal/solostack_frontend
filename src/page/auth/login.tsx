
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
import { motion } from 'framer-motion';
import { useLoginQuery } from '@/reactQuery/student/signUp';
import { useState } from 'react';
export default function App(): JSX.Element {

  const [author, setAuthor] = useState("student")


  return (
    <>

      <div className='flex justify-end mt-6 mr-6'>
        <ModeToggle />
      </div>
      <StudentLogin author={author} setAuthor={setAuthor}  />
      <div className='flex justify-end mr-6'>
        <SwitchUser author={author} setAuthor={setAuthor} />
      </div>
    </>
  )
}