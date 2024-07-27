import { studentApi } from "@/api";
import axios from "axios";
import { useQuery } from "react-query";

export const useStripeAPi = (body,setClientSecret) => {
  const apiCall = async () => {
    const response = await axios.post(studentApi.stripeAPI,body);

    return response.data;
  };
  return useQuery("stripe", apiCall, {
    onSuccess(data){
        setClientSecret(data.data.client_secret)
    },
    refetchOnWindowFocus: false,
  });
};



export const useStripeIsSucceeded = (setIsSucceeed,stripePaymentIntentId) => {
  const apiCall = async () => {
    const response = await axios.post(studentApi.stripeAPIIsSucceeded,{stripePaymentIntentId});

    return response.data;
  };
  return useQuery("stripe", apiCall, {
    onSuccess(data){
      setIsSucceeed(data.data)
    },
    refetchOnWindowFocus: false,
  });
};
