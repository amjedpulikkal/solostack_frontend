

import { ModeToggle } from "../../components/mode-toggle";

import { SwitchUser } from "../../components/switchUser";

import StudentLogin from './authors/student';

import { useLocation, useNavigate } from 'react-router-dom';
import { Iauthor } from '@/type';
import { useEffect, useState } from "react";

export default function App(): JSX.Element {

  const location = useLocation()
  const navigate = useNavigate()

  console.log(location)
  const [author, setAuthor] = useState<Iauthor|null>(null)

  useEffect(() => {
    const arrLocation = location.pathname.split("/")[1] as Iauthor
    setAuthor(arrLocation)

  }, [location.pathname])


  const handleClick = (author: Iauthor) => {
    if (author === "mentor") {
      navigate("/mentor/signIn")
    } else  {
      navigate("/student/signIn")
    }
    setAuthor(author)

  }

  return (
    <>

      <div className='flex justify-end mt-6 mr-6'>
        <ModeToggle />
      </div>
      <StudentLogin author={author!}  />
      <div className='flex justify-end mr-6'>
        <SwitchUser author={author!} handleClick={handleClick} />
      </div>
    </>
  )
}