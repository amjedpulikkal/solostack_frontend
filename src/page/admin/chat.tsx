import { Button } from '@/components/ui/button';
import { useCreateNewGroups, useGetAllGroups } from '@/reactQuery/admin/chatApi';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';


import { IoMdClose } from "react-icons/io";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDropzone } from 'react-dropzone';
import { Input } from '@/components/ui/input';


export default function AdminChat() {
    const [data, setData] = useState([{
        _id: "",
        groupName: "",
        startedDate: "",
        isFreezed: false,
        subscripts: [],
    }]);
    const { isLoading } = useGetAllGroups(setData)
    const [selectedId, setSelectedId] = useState()



    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [imageFile, setImageFile] = useState<string | Blob>("");
    // const { mutate, isLoading } = useUpdateProfileIMage(setOpen)
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
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
            setError("");
        };
        reader.readAsDataURL(file);
    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const { mutate} = useCreateNewGroups()
    const handelCreateGroups=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
     
        // console.log(   "=========",)
        mutate({imageFile,groupName:e.target.groupName.value})
    }
    return (
        <>
            <div className='flex justify-end w-full'>

                <Dialog>
                    <DialogTrigger>
                        <Button>add new group</Button>

                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='flex justify-center'>
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
                            </DialogTitle>
                            <DialogDescription>
                                <div className='pt-4 px-3'>
                                    <form onSubmit={handelCreateGroups} className='flex flex-col gap-3'>
                                        <label htmlFor=""> Group name </label>
                                        <Input placeholder='type new group name' name='groupName' type="text" />
                                        <Button>Create new</Button>
                                    </form>
                                </div>


                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div >
            <AnimatePresence>
                {data && (
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='flex flex-wrap gap-4 justify-around w-full pt-10'
                    >
                        {data.map((i, index) => (
                            <motion.div layoutId={i._id} onClick={() => setSelectedId(i)}
                                key={i._id}
                                layout
                                whileHover={{ scale: 0.95 }}
                                className='h-36 outline outline-1  rounded-3xl outline-primary flex gap-2'
                            >
                                <img
                                    src={`https://d3sd9xkxgxzd5z.cloudfront.net/${i.image}`}
                                    className='max-w-1/2 h-full outline outline-1 rounded-ss-3xl rounded-es-3xl round outline-primary'
                                />
                                <div className='mt-2 w-full'>
                                    <p className='capitalize text-center text-2xl'>{i.groupName}</p>
                                    {/* <p className='text-sm mt-2'>Total students :{i}</p> */}
                                    <p className='text-sm'>Total mentor :{i.subscripts.length}</p>

                                    <p className='text-[12px] text-end mt-4 mr-3 text-white/40'>
                                        created at
                                    </p>
                                </div>

                            </motion.div>
                        ))}
                    </motion.div>
                )}
                <AnimatePresence>
                    {selectedId && (
                        <motion.div className=' left-0 dark:bg-black/80 backdrop-blur-md bg-white/30 absolute top-0 w-screen h-screen flex justify-center items-center' layoutId={selectedId._id}>
                            <div>


                                <div layoutId={selectedId._id}
                                    key={selectedId._id}
                                    layout
                                    whileHover={{ scale: 0.95 }}
                                    className='h-52   outline outline-1  rounded-3xl outline-primary flex gap-2'
                                >
                                    <img
                                    
                                        src={`https://d3sd9xkxgxzd5z.cloudfront.net/${selectedId.image}`}
                                        className='max-w-1/2 h-full outline outline-1 rounded-ss-3xl rounded-es-3xl round outline-primary'
                                    />
                                    <div className='mt-2 w-full '>
                                        <div className='flex justify-end mr-2'>

                                            <button className='bg-background p-2 rounded-full' onClick={() => setSelectedId("")}><IoMdClose size={20} /></button>
                                        </div>
                                        {/* <p className='capitalize text-center text-2xl'>{i.groupName}</p> */}
                                        {/* <p className='text-sm mt-2'>Total students :{i}</p> */}
                                        {/* <p className='text-sm'>Total mentor :{i.subscripts.length}</p> */}

                                        {/* <p className='text-[12px] text-end mt-4 mr-3 text-white/40'> */}
                                        {/* created at {i.startedDate} */}
                                        {/* </p> */}
                                    </div>

                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </AnimatePresence>
        </>
    );
}
