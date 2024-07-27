import { mentorApi,studentApi } from "@/api";
import axios from "axios";
import {  useQuery } from "react-query";
import {Iauthor} from "@/type"

export function useSearchAuthors(author:Iauthor) {
  let apiCall;
  if (author === "mentor") {
    apiCall = async () => {
      const response = await axios.get(mentorApi.searchMentor);

      return response.data;
    };
  } else {
    apiCall = async () => {
      const response = await axios.get(studentApi.searchStudent);

      return response.data;
    };
  }

  return useQuery("AllMentor", apiCall, { refetchOnWindowFocus: false });
}
