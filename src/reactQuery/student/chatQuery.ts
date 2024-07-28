import { ChatGroupApi } from "@/api";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;
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
    if (groupID) {
      const response = await axios.post(ChatGroupApi.getChatHistory, {
        groupId: groupID,
      });
      console.log(response);
      return response.data
    }
  };
  return useQuery([`groups${groupID}`, groupID], apiCall, {
    onSuccess: ({ data }) => {
   
     
        setChatData(data);
      
    },
    refetchOnWindowFocus: false,
  });
};

export const useGetAllGroup = () => {

  const apiCall = async () => {
    const response = await axios.get(ChatGroupApi.createNewGroup);
    console.log(response);
    return response.data.data
  };

  return useQuery("AllGroups", apiCall,{refetchOnWindowFocus:false});
};

export const useJoinGroup=()=>{

  const user = useSelector((state:RootState)=>state.author?.authorData)
  const apiCall = async (groupID:string) => {
    const response = await axios.post(ChatGroupApi.joinNewGroup,{groupID,id:user?._id});
    console.log(response);
    return response.data.data
  };
  return  useMutation(apiCall);

}
