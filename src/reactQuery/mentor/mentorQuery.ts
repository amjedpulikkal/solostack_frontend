

import { mentorApi } from "@/api";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
export const useUpdateAvailableTime = () => {
    const apiCall = async (formData: { date: Date, time: number[] }) => {

        const response = await axios.post(mentorApi.updateAvailableTime, formData);
        return response.data;

    };

    return useMutation(apiCall, {
        onSuccess() {

        },
        onError() {

        }
    })
}
export const usGetAvailableTime = () => {
    const apiCall = async (formData: { date: Date|string }) => {
       formData.date = new Date(formData.date).toDateString()
       console.log(   formData.date );
       
        const response = await axios.post(mentorApi.getAvailableTime, formData);
        return response.data;

    };

    return useMutation(apiCall, {
        onSuccess() {

        },
        onError() {

        }
    })
}
export const usGetAllMentor = () => {
    const apiCall = async () => {
      
        const response = await axios.post(mentorApi.getAllMentors);
        
        return response.data;

    };

    return useQuery("mentors",apiCall, {
        onSuccess() {

        },
        onError() {

        }
    })
}