import { ChatGroupApi } from "@/api";
import axios from "axios";
import { useQuery } from "react-query";

export const useGetGroup = (userID: string) => {
  const apiCall = async () => {
    console.log(userID, "---if");
    const response = await axios.post(ChatGroupApi.getAllGroupsWithID, {
      userID,
    });
    console.log(response);
    return response.data;
  };
  return useQuery("groups", apiCall, { refetchOnWindowFocus: false });
};

export const useChatHistory = (groupID, setChatData) => {
  const apiCall = async () => {
    if(groupID){
        
        const response = await axios.post(ChatGroupApi.getChatHistory,{groupId:groupID});
        console.log(response);
        return response.data;
    }
  };
  return useQuery([`groups${groupID}`, groupID], apiCall, {
    onSuccess: ({data}) => {
        console.log(data)
        if(data.length){

              setChatData(data);
        }
    },
    refetchOnWindowFocus: false 
  });
};
