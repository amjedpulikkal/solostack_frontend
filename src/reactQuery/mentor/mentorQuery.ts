import { mentorApi } from "@/api";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

const getTimeWithIndex = {
  0: 9,
  1: 10,
  2: 11,
  3: 12,
  4: 13,
  5: 14,
  6: 15,
  7: 16,
  8: 17,
  9: 18,
  10: 19,
  11: 20,
  12: 21,
};
const getIndexWithTime = {
  9: 0,
  10: 1,
  11: 2,
  12: 3,
  13: 4,
  14: 5,
  15: 6,
  16: 7,
  17: 8,
  18: 9,
  19: 10,
  20: 11,
  21: 12,
};

export const useUpdateAvailableTime = (refetch) => {
  const apiCall = async (formData: { date: Date | string; time: number[] }) => {
    if (Array.isArray(formData.time)) {
      formData.time = formData.time.map((i) => getTimeWithIndex[i]);
    }

    formData.date = new Date(formData.date).toDateString();
    const response = await axios.post(mentorApi.updateAvailableTime, formData);
    return response.data;
  };

  return useMutation(apiCall, {
    onSuccess() {
      refetch();
    },
    onError() {},
  });
};
export const useAvailableTime = () => {
  const apiCall = async (formData: { date: Date | string; time: number }) => {
    formData.date = new Date(formData.date).toDateString();
    console.log(formData.date);
    console.log(formData.time);

    formData.time = getTimeWithIndex[formData.time];

    const response = await axios.post(mentorApi.getAllAvailableTime, formData);
    return response.data;
  };

  return useMutation(apiCall, {
    onSuccess() {},
    onError() {
     
    },
  });
};

export const useGetAvailableTime = (setSelectedDate, date: Date) => {
  const apiCall = async () => {
    date = new Date(date).toDateString();

    const response = await axios.post(mentorApi.getAvailableTime, { date });
    return response.data;
  };

  return useQuery(["AvailableTime", date], apiCall, {
    onSuccess(data) {
      const time = data.map((i) => getIndexWithTime[i.time]);

      setSelectedDate(time || []);
     
    },
    onError() {},
  });
};

export const usGetAllMentor = (date: Date | string, timeIndex: number) => {
  const apiCall = async () => {
    date = new Date(date).toDateString();
    const response = await axios.post(mentorApi.getAllMentors, {
      date,
      time: getTimeWithIndex[timeIndex],
    });

    return response.data;
  };

  return useQuery("mentors", apiCall, {
    onSuccess() {},
    onError() {},
    refetchOnWindowFocus: false,
  });
};

export const useMentorProfile = (setMentor) => {
  const apiCall = async (userName: string) => {
    const response = await axios.post(mentorApi.getMentorProfile, { userName });

    return response.data;
  };

  return useMutation(apiCall, {
    onSuccess(data) {
      setMentor(data);
    },
    onError() {},
  });
};
export const useSendRequest = () => {
  const apiCall = async (body: { data: string; mentorRVId: string }) => {
    const response = await axios.put(mentorApi.sendRequest, body);

    return response.data;
  };

  return useMutation(apiCall, {
    onSuccess(data) {},
    onError() {},
  });
};

export const useAcceptRequest = (getAvailableTime) => {
  const apiCall = async ({requests, user }) => {

    console.log(user,"-------")

    const body = {
        reviewTime:requests,
        studentID:user?.studentId?._id        ||null
    };
    const response = await axios.post(mentorApi.acceptRequest, body);

    return response.data;
  };

  return useMutation(apiCall, {
    onSuccess(data) {
      getAvailableTime.re
    },
    onError() {},
  });
};
