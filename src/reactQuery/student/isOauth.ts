
import { useMutation, useQueryClient } from "react-query";

import axios from 'axios';
import { toast } from "sonner"
import { studentApi } from "@/api";

axios.defaults.withCredentials = true;
export const isOauth = () => {
    const queryClient = useQueryClient();

    const tokenVerify = async (formData: any) => {
        const response = await axios.post(studentApi.isOauth, formData);
        return response.data;
    };

    return useMutation(tokenVerify, {
        onSuccess() {
            queryClient.invalidateQueries('useTokenVerifyQuery')
        },
        onError() {
            toast.error("otp not valid");
            
        },

    })
}