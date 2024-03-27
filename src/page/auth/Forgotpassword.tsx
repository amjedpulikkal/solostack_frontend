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
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitHandler, useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}

export function DrawerForgetPassword({ open, setOpen }: { open: boolean, setOpen: any }) {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
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

function ProfileForm({ className }: React.ComponentProps<"form">) {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const FromHandleSubmit: SubmitHandler<{ email: string }> = (data) => {
        console.log("email-----", data);


    }
    return (
        <form onSubmit={handleSubmit(FromHandleSubmit)} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="email">Email (for password reset)</Label>
                <input {...register("email", { required: "email is required" })} type="email" />

                <AnimatePresence mode="wait" initial={false}>
                    {errors.email && <motion.p
                        className="text-center gap-1 pt-2 font-semibold text-red-500"
                        {...framer_error}

                    >
                        {errors.email}
                    </motion.p>
                    }
                </AnimatePresence>
            </div>
            <Button type="submit">Reset Password</Button>
        </form>

    )
}
