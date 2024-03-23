

import { useMutation, useQueryClient } from "react-query";

import axios from 'axios';


export const useSignOutQuery = () => {
    const queryClient = useQueryClient();

    const signOutVerify = async () => {
        const response = await axios.post('/api/student/signOut');
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