import { useMutation, useQueryClient } from "react-query";

import axios from 'axios';
import { toast } from "sonner"
import { useDispatch } from "react-redux";
import { setStudentData } from "@/redux/slices/studentSlice";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "@/components/switchUser-provider";
import { studentApi,mentorApi } from "@/api";
import {FormData} from "../../type"
import { useCookies } from "react-cookie";

// function errorToast(error) {
//     toast.error(error)

// }


export const useSingUpQuery = () => {
    const queryClient = useQueryClient();

    const postLogin = async (formData: FormData) => {
        if(formData.author === "student"){
            const response = await axios.post(studentApi.signIn, formData);
            return response.data;
        }
        if(formData.author === "mentor"){
            const response = await axios.post(mentorApi.signIn, formData);
            return response.data;
        }

    };

    return useMutation(postLogin, {
        onSuccess() {

        },
        onError(error) {
            console.log(error);
            toast.error("Email already used.");
        }
    })
}


export const useOtpVerifyQuery = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const [cookies, setCookie] = useCookies(['jwtToken']);

    const otpVerify = async (formData: any) => {
        const response = await axios.post('/api/student/verify', formData);
        return response.data;
    };

    return useMutation(otpVerify, {
        onSuccess(data) {

            console.log("data", data);
            dispatch(setStudentData(data))
            navigate(`/oauth/provider/${cookies.jwtToken}`)
        },
        onError() {
            toast.error("otp not valid");

        },

    })
}

export const useLoginQuery = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {setAuthor} = useAuthor()


    const otpVerify = async (formData: any) => {
        const response = await axios.post('/api/student/login', formData);
        return response.data;
    };

    return useMutation(otpVerify, {
        onSuccess(data) {
            console.log("data", data);
            dispatch(setStudentData(data))
            setAuthor("student")
            navigate('/student/')
        },
        onError() {


        },

    })
}

export const useForgetPasswordQuery = () => {
    const queryClient = useQueryClient();
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const {setAuthor} = useAuthor()


    const otpVerify = async (formData: {email:string}) => {
        const response = await axios.post('/api/student/forgetPassword', formData);
        return response.data;
    };

    return useMutation(otpVerify, {
        onSuccess(data) {
            console.log("data", data);
            
        },
        onError() {


        },

    })
}