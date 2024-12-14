import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { RootState } from "@/redux/store"
import { toast } from 'sonner';

// export const useAuthorData = ():string => {
//     return useSelector((state: RootState) => state.author?.authorData)._id
// };
const server = import.meta.env.servar||'http://localhost:3000'
export const socket = io(server);
// export const socket = io("https://api.solostack.online");
// export const socket = io('http://localhost:3000');



export default function Socket  () {
    const authorData = useSelector((state: RootState) => state.author?.authorData)
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
            if (authorData?._id) {
                socket.emit("userID", {userID:authorData?._id})
            }
        });
        socket.on("notification",(data)=>{
            toast.success(data)
        })
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        return () => {

            socket.disconnect();
        };
    }, []);

    

    return (
        <div>

        </div>
    );
}


