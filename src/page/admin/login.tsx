import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Iauthor } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { Button } from "@/components/ui/button";
import { useAdminLogin } from "@/reactQuery/admin/login";
import DotLoader from "@/components/ui/dot-loardes";

interface IFormInput {
  email: string;
  password: string;
  token: string;
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};


function AdminLogin() {
 
  const [widget, setWidget] = useState("");
  const { mutateAsync, isError, isLoading, } = useAdminLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutateAsync({ ...data, token: widget });
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-3xl font-extrabold">Admin</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-80">
        <div className="pb-2 pt-4">
          <input
            type="email"
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "invalid email address",
              },
            })}
            placeholder="Email"
            className="block w-full p-4 text-lg rounded-sm dark:bg-black border-2"
          />

          <AnimatePresence mode="wait" initial={false}>
            {errors.email && (
              <motion.p
                className="flex items-center gap-1 pt-2 font-semibold text-red-500"
                {...framer_error}
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="pb-2 pt-4">
          <input
            className="block w-full p-4 text-lg rounded-sm border-2 bg-white dark:bg-black"
            type="password"
            {...register("password", { required: "Password  is required" })}
            placeholder="Password"
          />
          <AnimatePresence mode="wait" initial={false}>
            {errors.password && (
              <motion.p
                className="flex items-center gap-1 pt-2 font-semibold text-red-500"
                {...framer_error}
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
       
        <div className="pb-2 flex justify-center pt-4">
          <TurnstileWidget setWidget={setWidget} />
        </div>
        <div className="px-4 pb-2 pt-4">
          <Button
            disabled={!!Object.keys(errors).length||!widget}
            type="submit"
            className="uppercase  w-full h-14 text-lg rounded-full "
            style={{ backgroundColor: "#28CB8B" }}
          >
        
            login
            {isLoading ? <DotLoader /> : "sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
