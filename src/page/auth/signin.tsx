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
import { useLocation, useNavigate } from "react-router-dom";
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
  const { mutateAsync, isLoading,  } = useSingUpQuery()
  const formRef = useRef<HTMLFormElement>(null);

  const [author, setAuthor] = useState<Iauthor>("student")

  useEffect(() => {
    const arrLocation = location.pathname.split("/")[1] as Iauthor
    setAuthor(arrLocation)

  }, [location.pathname])

  const handleClick = (author: Iauthor) => {
    if (author === "mentor") {
      navigate("/mentor/signUp")
    } else if (author === "tutor") {
      navigate("/tutor/signUp")
    } else if (author === "student") {
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
      otp:""
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
              <div className="absolute  lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)" }}>
                <div className="absolute bg-black   opacity-60 inset-0 z-0"></div>
              </div>
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
                    <Button className="uppercase h-16 w-full text-lg rounded-full " type="submit">{isLoading ? <DotLoader /> : "sign in"}</Button>
                  </div>
                  <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
                    <a href="#">
                      <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                    </a>
                    <a href="#">
                      <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                    </a>
                    <a href="#">
                      <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    </a>
                  </div>
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
