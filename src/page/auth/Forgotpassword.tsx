import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitHandler, useForm,FieldValues } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { useForgetPasswordQuery } from "@/reactQuery/student/signUp"


import animationData from "../../assets/Animation - 1711686196701.json"
import Lottie from 'lottie-react';
import { useEffect } from "react"
import { toast } from "sonner"
import DotLoader from "@/components/ui/dot-loardes"
const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}

export function DrawerForgetPassword({ open, setOpen }: { open: boolean,  setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Forgot Password</DialogTitle>
                        <DialogDescription>
                            Enter your email address below to reset your password.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>

            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Forgot Password</DrawerTitle>
                    <DrawerDescription>
                        Enter your email address below to reset your password.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

interface ForgotPasswordFormValues extends FieldValues {
    email: string;
  }
function ProfileForm({ className }: React.ComponentProps<"form">) {
    const { mutateAsync, isError, isLoading, isSuccess } = useForgetPasswordQuery()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const FromHandleSubmit: SubmitHandler<ForgotPasswordFormValues> = ({ email }) => {
        console.log("email-----", email);
        mutateAsync({ email });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Your password reset request has been processed successfully. Please check your email")
        }
        if(isError){
            toast.error("Something went wrong")
        }
    }, [isSuccess,isError])

    if (!isSuccess) {

        return (
            <AnimatePresence mode="wait" >
                <motion.form {...framer_error}  onSubmit={handleSubmit(FromHandleSubmit)} className={cn("grid items-start gap-4", className)}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email (for password reset)</Label>
                        <Input {...register("email", { required: "email is required" })} type="email" />

                        {errors.email && <motion.p
                            className="text-center gap-1 pt-2 font-semibold text-red-500"
                            {...framer_error}
                        >
                            email is required
                        </motion.p>
                        }
                    </div>
                    <Button type="submit">{isLoading ? <DotLoader/> : "Reset Password"}</Button>
                </motion.form>
            </AnimatePresence>

        )
    } else {
        return (
            <AnimatePresence mode="wait" >
                <motion.div {...framer_error}>
                    <div {...framer_error} className="flex justify-center ">
                        <div className="w-28 h-28">

                            <Lottie

                                animationData={animationData}
                                loop={false}
                                autoplay={true}
                            />

                        </div>
                    </div>
                    <p>Your password reset request has been processed successfully. Please check your email </p>
                </motion.div>
            </AnimatePresence>


        )

    }
}
