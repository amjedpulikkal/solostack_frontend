import { useMutation, useQueryClient } from "react-query";

import axios from 'axios';
import { toast } from "sonner"
import { useDispatch } from "react-redux";
import { setAuthorData, setAuthor } from "@/redux/slices/authorSlice";
import { useNavigate } from "react-router-dom";

import { studentApi, mentorApi } from "@/api";
import { IFormData } from "../../type"
import { useCookies } from "react-cookie";
import { Iauthor } from "../../type";
// function errorToast(error) {
//     toast.error(error)

// }

axios.defaults.withCredentials = true;
export const useSingUpQuery = () => {
 
    const postLogin = async (formData: IFormData) => {
        if (formData.author === "student") {
            const response = await axios.post(studentApi.signIn, formData);
            return response.data;
        }
        if (formData.author === "mentor") {
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

    const otpVerify = async (formData: IFormData) => {
        if (formData.author === "student") {
            const response = await axios.post(studentApi.verifyOtp, formData);
            return response.data;
        } else if (formData.author === "mentor") {
            const response = await axios.post(mentorApi.verifyOtp, formData);
            return response.data;

        }

    };

    return useMutation(otpVerify, {
        onSuccess(data) {

            console.log("data", data);
            dispatch(setAuthorData(data))
            navigate(`/oauth/provider/${cookies.jwtToken}`)
        },
        onError() {
            toast.error("otp not valid");

        },

    })
}

interface IFormInput {
    email: string;
    password: string;
    author: Iauthor
    token:string

}

export const useLoginQuery = (author: Iauthor) => {


    console.log(author, "-----------author------------")
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const otpVerify = async (formData: IFormInput) => {
        if (formData.author === "student") {

            const response = await axios.post(studentApi.login, formData);
            return response.data;

        } else if (formData.author === "mentor") {

            const response = await axios.post(mentorApi.login, formData);
            return response.data;

        } else if (formData.author === "tutor") {

            // const response = await axios.post(mentorApi.login, formData);
            // return response.data;

        }
    };

    return useMutation(otpVerify, {
        onSuccess(data) {

            if (author === "student") {
                dispatch(setAuthorData(data))

                dispatch(setAuthor("student"))
                navigate('/student/')
            } else if (author === "mentor") {
                dispatch(setAuthorData(data))
                dispatch(setAuthor("mentor"))

                navigate('/mentor/')

            }
        },
        onError() {


        },

    })
}

export const useForgetPasswordQuery = () => {
    // const queryClient = useQueryClient();
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const {setAuthor} = useAuthor()


    const otpVerify = async (formData: { email: string }) => {
        const response = await axios.post(studentApi.forgetPassword, formData);
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
export const useVerifyForgetPasswordQuery = () => {

    const otpVerify = async (formData: { password?: string, token?: string }) => {
        const response = await axios.post('/api/student/verifyForgetPassword', formData);
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
export const useUserNameCheck = () => {

    const otpVerify = async (userName: string) => {
        try {

            const response = await axios.post('/api/student/userName-validate', { userName });
            return response.data;
        } catch (err) {
            
            return err.response.data;
        }
    };

    return useMutation(otpVerify, {
        onSuccess(data) {
            console.log("data", data);

        },
        onError() {


        },

    })
}