
// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// export const  studentApi={
//     signIn:"/api/student/register",
//     login:"/api/student/login",
//     verifyOtp:'/api/student/verify',
//     searchStudent:"/api/student/searchStudent",
//     getTodyReview:"/api/student/getTodyReview",
//     stripeAPI:"/api/stripe/create-payment-intent",
//     stripeAPIIsSucceeded:"/api/stripe/isSucceeded"
    
    
// }

// export const mentorApi= {
//     signIn:"/api/mentor/register",
//     login:"/api/mentor/login",
//     verifyOtp:"/api/mentor/verify",
//     updateAvailableTime:"/api/mentor/update-available-time",
//     getAvailableTime:"/api/mentor/get-available-time",
//     getAllAvailableTime:"/api/mentor/get-all-available-time",
//     getAllMentors:"/api/mentor/get-all-mentors",
//     getMentorProfile:"/api/mentor",
//     updateMentorProfileImage:"/api/mentor/update-image",
//     sendRequest:"/api/mentor/student/storeRequest",
//     searchMentor:"/api/mentor/searchMentor",
//     acceptRequest:"/api/mentor/student/acceptRequest"


// }

// export const ChatGroupApi={
//     createNewGroup:"/api/group-chat/",
//     joinNewGroup:"/api/group-chat/join",
//     getAllGroupsWithID:"/api/group-chat/groups/",
//     getChatHistory:"/api/group-chat/chat-history/",
    
// }

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

const createEndpoint = (path) => `${apiBaseUrl}${path}`;

export const studentApi = {
    signIn: createEndpoint("/student/register"),
    login: createEndpoint("/student/login"),
    verifyOtp: createEndpoint('/student/verify'),
    searchStudent: createEndpoint("/student/searchStudent"),
    getTodyReview: createEndpoint("/student/getTodyReview"),
    stripeAPI: createEndpoint("/stripe/create-payment-intent"),
    stripeAPIIsSucceeded: createEndpoint("/stripe/isSucceeded")
};

export const mentorApi = {
    signIn: createEndpoint("/mentor/register"),
    login: createEndpoint("/mentor/login"),
    verifyOtp: createEndpoint("/mentor/verify"),
    updateAvailableTime: createEndpoint("/mentor/update-available-time"),
    getAvailableTime: createEndpoint("/mentor/get-available-time"),
    getAllAvailableTime: createEndpoint("/mentor/get-all-available-time"),
    getAllMentors: createEndpoint("/mentor/get-all-mentors"),
    getMentorProfile: createEndpoint("/mentor"),
    updateMentorProfileImage: createEndpoint("/mentor/update-image"),
    sendRequest: createEndpoint("/mentor/student/storeRequest"),
    searchMentor: createEndpoint("/mentor/searchMentor"),
    acceptRequest: createEndpoint("/mentor/student/acceptRequest")
};

export const ChatGroupApi = {
    createNewGroup: createEndpoint("/group-chat/"),
    joinNewGroup: createEndpoint("/group-chat/join"),
    getAllGroupsWithID: createEndpoint("/group-chat/groups/"),
    getChatHistory: createEndpoint("/group-chat/chat-history/"),
};