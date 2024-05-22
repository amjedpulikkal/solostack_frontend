export const  studentApi={
    signIn:"/api/student/register",
    login:"/api/student/login",
    verifyOtp:'/api/student/verify',
    
}

export const mentorApi= {
    signIn:"/api/mentor/register",
    login:"/api/mentor/login",
    verifyOtp:"/api/mentor/verify",
    updateAvailableTime:"/api/mentor/update-available-time",
    getAvailableTime:"/api/mentor/get-available-time",
    getAllAvailableTime:"/api/mentor/get-all-available-time",
    getAllMentors:"/api/mentor/get-all-mentors",
    getMentorProfile:"/api/mentor",
    updateMentorProfileImage:"/api/mentor/update-image",
    sendRequest:"/api/mentor/student/storeRequest"


}

export const ChatGroupApi={
    createNewGroup:"/api/group-chat/",
    getAllGroupsWithID:"/api/group-chat/groups/",
    getChatHistory:"/api/group-chat/chat-history/"
}