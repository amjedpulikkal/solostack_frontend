
import * as React from "react"

import { cn } from "@/lib/utils"
import { LuPenSquare } from 'react-icons/lu'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

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
import { useUpdateProfileIMage } from "@/reactQuery/mentor/profile/profileQuery"

export default function updatePhoto({ imageUrl }) {
    console.log(imageUrl)
    const [open,  setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <>
                <div className="bg-slate-500 w-48 h-48 shadow-2xl rounded-ss-3xl overflow-hidden  rounded-ee-3xl  " style={{ backgroundImage: `url(https://d3sd9xkxgxzd5z.cloudfront.net/${imageUrl}`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    <img src={`https://d3sd9xkxgxzd5z.cloudfront.net/${imageUrl}`} className="bg-cover w-full h-full" alt="" />
                    <Button onClick={() => setOpen(true)} style={{ marginTop: "-193px" }} className="shadow-2xl absolute " variant="outline" size="icon" ><LuPenSquare size={30} /></Button>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <ProfileForm setOpen={setOpen}/>
                    </DialogContent>
                </Dialog>
            </>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <div className="bg-slate-500 w-48 h-48 shadow-2xl rounded-ss-3xl overflow-hidden  rounded-ee-3xl  " style={{ backgroundImage: `url(https://d3sd9xkxgxzd5z.cloudfront.net/${imageUrl}`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <img src={`https://d3sd9xkxgxzd5z.cloudfront.net/${imageUrl}`} className="bg-cover w-full h-full" alt="" />

                <Button onClick={() => setOpen(true)} style={{ marginTop: "-193px" }} className="shadow-2xl absolute " variant="outline" size="icon" ><LuPenSquare size={30} /></Button>
            </div>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm setOpen={setOpen}/>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ setOpen }) {
    const [image, setImage] = React.useState("");
    const [error, setError] = React.useState("");
    const [imageFile, setImageFile] = React.useState<string | Blob>("");
    const { mutate, isLoading } = useUpdateProfileIMage(setOpen)
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length === 0) {
            setError("Please upload a valid image file.");
            return;
        }

        const file = acceptedFiles[0];
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file.");
            return;
        }
        setImageFile(file)
        let reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
            setError("");
        };
        reader.readAsDataURL(file);
    }, []);

    const handleClick = () => {
        mutate(imageFile)
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <div className="px-5">
                {!image && (
                    <div className="bg-zinc-900 outline-dotted  rounded-2xl p-14 " {...getRootProps()}>
                        <input className="" {...getInputProps()} />

                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag and drop some files here, or click to select files</p>
                        )}
                    </div>
                )}
                {image && (
                    <div className="bg-zinc-900 outline-dotted  rounded-2xl p-14 " {...getRootProps()}>
                        <img src={image} alt="" />
                    </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <Button onClick={handleClick} className="w-full mt-5">{isLoading ? "Loading" : "save"}</Button>
        </>

    );
}
