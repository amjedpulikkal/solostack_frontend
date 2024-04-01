

import {  mentorApi } from "@/api";
export const useUpdateAvailableTime(){
    const apiCall = async (formData: IFormData) => {
         if (formData.author === "mentor") {
            const response = await axios.post(mentorApi., formData);
            return response.data;
        }
    };
    
    return useMutation(apiCall, {
        onSuccess() {

        },
        onError(error) {
           
        }
    })
}