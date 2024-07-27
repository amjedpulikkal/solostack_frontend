import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerDialogDetails() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>

          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Details</DrawerTitle>

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

  const [isOpen, setOpen] = React.useState(false)

  if (!isOpen) {

    return (
      <div className={cn("grid grid-cols-2 items-start gap-4", className)}>

        <div className="bg-slate-700 w-40 rounded-2xl h-52 col-span-1">


        </div>
        <div className="col-span-1">
          <p className="text-2xl py-2">1/3/5003</p>
          <p>name: sfdsdfdsf</p>
          <p>Status: sfdsdfdsf</p>
          <p>week: sfsdfdf</p>
          <p>user Bookend @ 9:00 pm</p>
          <Button onClick={() => setOpen(true)} variant="destructive" className="mt-5 bg">Postponed or cancel</Button>
        </div>
      </div>
    )
  } else {
    return (
      <div className={cn("grid grid-cols-2 items-start gap-4", className)}>


        <Button variant="destructive" className="mt-5 bg">Postponed or cancel</Button>

      </div>
    )

  }
}
