import { ChatGroupApi } from "@/api";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const useGetAllGroups = (setData) => {
    const apiCall = async () => {
        
        const response = await axios.get(ChatGroupApi.getAllGroupsWithID);

        return response.data;

    };

    return useQuery("groups", apiCall, {
        onSuccess({data}) {
            setData(data)
        },
        refetchOnWindowFocus: false
    })
}

export const useCreateNewGroups=(callBack)=>{

    const apiCall = async ({imageFile,groupName}) => {
        
        const formData = new FormData()
        console.log(imageFile,groupName)
        formData.append("image",imageFile)
        formData.append("groupName",groupName)
        const response = await axios.post(ChatGroupApi.createNewGroup,formData);

        return response.data;

    };

    return useMutation(apiCall,{onSuccess:(data)=>{
        console.log(data)
        callBack()
    }})
}