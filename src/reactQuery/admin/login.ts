import { adminApi, ChatGroupApi } from "@/api";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import {setLoggedIn} from "@/redux/slices/adminSlice"
import { useNavigate } from "react-router-dom";


export const useAdminLogin=()=>{


    const navigate = useNavigate()

  const dispatch = useDispatch()
    const apiCall = async (data) => {
        
        
        const response = await axios.post(adminApi.login,data);

        return response.data;

    };

    return useMutation(apiCall,{onSuccess:(data)=>{
        
        console.log(data)
        dispatch(setLoggedIn(data))
        navigate("/admin")
        // callBack()
    }})
}