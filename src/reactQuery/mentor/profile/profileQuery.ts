

import { setAuthorData } from "@/redux/slices/authorSlice";
import { useDispatch } from "react-redux";

import { mentorApi } from "@/api";
import axios from "axios";
import { useMutation } from "react-query";

export const useUpdateProfileIMage = (setOpen:React.Dispatch<React.SetStateAction<boolean>>) => {
    const dispatch = useDispatch()
    const apiCall = async (image: Blob|string) => {

        const formData = new FormData()
        formData.append("image", image)
        const response = await axios.put(mentorApi.updateMentorProfileImage, formData);
        return response.data;
    };

    return useMutation(apiCall, {
        onSuccess(data) {
            console.log(data,"dddddddd")
            dispatch(setAuthorData(data))
            setOpen(false)
        },
        onError() {

        }
    })
}