import { useState, ChangeEvent, useRef, useEffect } from "react";
import Otp from "./otp";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { ModeToggle } from "../../components/mode-toggle";
import { SwitchUser } from "../../components/switchUser";
import { useSingUpQuery } from "../../reactQuery/student/signUp"
import { Authcomponents } from "@/components/oauth";
import { IFormData, Iauthor } from "../../type"
import { AnimatePresence, motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form"
import DotLoader from "@/components/ui/dot-loardes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserNameInput } from "@/components/student/auth/Userinput";

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}


export default function App(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>()

  const [passValidate, setPassValidate] = useState<string[]>([]);
  const [isOtp, setOtp] = useState("");
  const { mutateAsync, isLoading, } = useSingUpQuery()
  const formRef = useRef<HTMLFormElement>(null);

  const [author, setAuthor] = useState<Iauthor>("student")

  useEffect(() => {
    const arrLocation = location.pathname.split("/")[1] as Iauthor
    setAuthor(arrLocation)

  }, [location.pathname])

  const handleClick = (author: Iauthor) => {
    if (author === "mentor") {
      navigate("/mentor/signUp")
    } else  {
      navigate("/student/signUp")
    }
    setAuthor(author)

  }
  const handelFrom: SubmitHandler<IFormData> = async () => {


    const formData = new FormData(formRef.current!);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      userName: formData.get("userName"),
      otp: ""
    };
    console.log(data)
    await mutateAsync({ ...data, author })
    toast.success("OTP has been sent to email.");
    setOtp(data?.email?.toString())
  }





  const handelPasswordValidation = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const passValidate: string[] = [];
    console.log(e.target.value);
    const Input = e.target;

    passValidate.push('red');
    if (Input.value.length >= 8) {
      passValidate.push("green");
    } else {
      passValidate.push("red");
    }

    const numbers = /[0-9]/g;
    if (Input.value.match(numbers)) {
      passValidate.push("green");
    } else {
      passValidate.push("red");
    }

    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (Input.value.match(specialCharacters)) {
      passValidate.push("green");
    } else {
      passValidate.push("red");
    }

    setPassValidate(passValidate);
  };
  const password = watch("password", "");
  return (
    <div className=" w-screen h-screen " >
      {!isOtp && (
        <>
          <div className='flex justify-end mt-6 mr-6'>
            <ModeToggle />
          </div>
          <motion.div className=" flex items-center justify-center ">
            <div className="lg:w-1/2  w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
            
              <div className="w-full py-6 z-20">
                <div className="flex justify-center dark:hidden">
                  <img src="/SoloStack (1).png" alt="" />
                </div>
                <div className="flex justify-center ">
                  <img src="/SoloStack (2).png" className='hidden dark:block' alt="" />
                </div>
                <Authcomponents />
                <p className=" dark:text-gray-100  text-gray-700 ">
                  or use email your account
                </p>
                <form onSubmit={handleSubmit(handelFrom)} ref={formRef} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                  <div className="pb-2 pt-4">
                    <input type="email" {...register("email", {
                      required: "Email Address is required",
                      pattern: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "invalid email address"
                      }
                    })} placeholder="Email" className="block w-full p-4 text-lg rounded-sm dark:bg-black border-2" />
                    <AnimatePresence mode="wait" initial={false}>
                      {errors.email && <motion.p
                        className="flex items-center gap-1 pt-2 font-semibold text-red-500"
                        {...framer_error}
                      >
                        {errors.email.message}
                      </motion.p>
                      }
                    </AnimatePresence>
                  </div>
                  <div className="pb-2 pt-4">
                    <UserNameInput register={register} errors={errors} />

                  </div>
                  <div className="pb-2 pt-4">
                    <input  {...register("password", {
                      required: true,
                      pattern: {
                        value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                        message: "password is required"
                      },
                      onChange: handelPasswordValidation
                    })} className="block w-full p-4 text-lg rounded-sm border-2 bg-white dark:bg-black" type="password" placeholder="Password" />
                  </div>
                  {passValidate[0] &&
                    <div >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ x: 0, scale: 1 }}
                          className="text-start mt-1">
                          <p style={{ color: passValidate[1] }}>→ 8 characters</p>
                          <p style={{ color: passValidate[2] }}>→ 1 number</p>
                          <p style={{ color: passValidate[3] }}>→ 1 special character e.g., $, !, @, %, &</p>
                        </motion.div>
                        {errors.password && <motion.p
                          className="flex items-center gap-1 pt-2 font-semibold text-red-500"
                          {...framer_error}
                        >
                          {errors.password.message}
                        </motion.p>
                        }
                      </AnimatePresence>
                    </div>
                  }
                  <div className="pb-2 pt-4">
                    <input {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: value => value === password || "The passwords do not match"
                    })} className="block w-full p-4 text-lg rounded-sm border-2 bg-white dark:bg-black" type="password" placeholder="Confirm Password" />

                    <AnimatePresence mode="wait" initial={false}>
                      {errors.confirmPassword && <motion.p
                        className="flex items-center gap-1 pt-2 font-semibold text-red-500"
                        {...framer_error}
                      >
                        {errors.confirmPassword.message}
                      </motion.p>
                      }
                    </AnimatePresence>
                  </div>
                  <div className="px-4 pb-2 pt-4">
                    <Button className="uppercase h-16 w-full text-lg rounded-full " type="submit">{isLoading ? <DotLoader /> : "sign up"}</Button>
                  </div>
                  <p>
                    Already have an account?<Link to={`/${author}/signIn`} className="text-right text-gray-400 hover:underline hover:text-back-100"> Sign In</Link>
                  </p>
                </form>
              </div>
            </div >
          </motion.div >
          <div className='flex justify-end mb-6 mr-6'>
            <SwitchUser author={author} handleClick={handleClick} />
          </div>
        </>
      )}
      {isOtp && <Otp email={isOtp} author={author} />}
    </div>
  );
}
