import { mentorApi } from "@/api";
import axios from "axios";
import { useQuery } from "react-query";
axios.defaults.withCredentials = true;
export const useGetTodyReview = () => {
  const apiCall = async () => {
    const response = await axios.get(mentorApi.getTodyReview);

    return response.data;
  };
  return useQuery("todyReview", apiCall, {
    refetchOnWindowFocus: false,
  });
};
