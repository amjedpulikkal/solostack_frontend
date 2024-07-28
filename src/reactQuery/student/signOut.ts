

import { useMutation, useQueryClient } from "react-query";

import axios from 'axios';
import { studentApi } from "@/api";


export const useSignOutQuery = () => {
    const queryClient = useQueryClient();

    const signOutVerify = async () => {
        const response = await axios.post(studentApi.signOut);
        return response.data;
    };

    return useMutation(signOutVerify, {
        onSuccess() {
            queryClient.invalidateQueries('usesignOutQuery')
        },
        onError() {
           
            
        },

    })
}