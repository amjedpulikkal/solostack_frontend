import { ModeToggle } from "@/components/mode-toggle";
import { Iauthor } from "@/type";

import { Link, useNavigate } from "react-router-dom";

import SelectAuthorCo from "@/components/selectAuthorCo";
export default function SelectSignUpAuthor(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = (author: Iauthor) => {
    if (author === "mentor") {
      navigate("/mentor/signUp");
    } else if (author === "tutor") {
      navigate("/tutor/signUp");
    } else if (author === "student") {
      navigate("/student/signUp");
    }
  };

  return (
    <>
      <div className="w-screen h-screen  ">
        <div className="flex justify-end mt-6 mr-6">
          <ModeToggle />
        </div>
        <div className=" flex flex-col items-center  mt-10 mb-10  md:-mb-10 w-full">
          <div className="flex">
            <p className="font-semibold text-4xl mr-3">SignUp to </p>
            <div className="mt-2">
              <img
                src="/SoloStack (2).png"
                className="hidden dark:block   "
                alt=""
              />
              <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
            </div>
          </div>
          <div className="flex mt-3 -mb-10">
            <p>Or <Link to="/signIn" className="text-right text-gray-400 hover:underline hover:text-back-100">logIn</Link> to </p>
            <div className="flex items-center ml-1">
              <img 
                src="/SoloStack (2).png"
                className="hidden dark:block w-16   "
                alt=""
              />
              <img src="/SoloStack (1).png" className="dark:hidden w-16" alt="" />
            </div>
          </div>
        </div>

        <SelectAuthorCo handleClick={handleClick} />
      </div>
    </>
  );
}
