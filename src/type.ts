export type Iauthor = "student" | "mentor" | "tutor";

export interface StudentData {
  personal_info: {
    userName: string;
    name: string;
    bio: string;
    photo: string;
  };
  account_info: {
    completedSessions: string[];
    reviews: string[];
  };
  _id: string;
  email: string;
  password: string;
  wallet: number;
  isBlocked: false;
  joinedAt: string;
  __v: number;
}
export type IFormData = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  userName: FormDataEntryValue | null;
  author: Iauthor;
  confirmPassword?: FormDataEntryValue | null;
  otp: string;
};

export type MentorDB = {
  account_info: {
    learningGoals: string;
    completedSessions: any[];
    reviews: any[];
  };
  email: string;
  isBlocked: boolean;
  joinedAt: string;
  password: string;
  personal_info: {
    userName: string;
    name: string;
    bio: string;
    photo: string;
  };
  social_links: {
    linkedin: string;
  };
  wallet: number;
  __v: number;
  _id: string;
};

export type ReviewDbObj = {
  date: string;
  isBooked: boolean;
  mentorId: MentorDB;
  requests: any[];
  time: number;
  __v: number;
  _id: string;
};

export type groupsObj = {
  _id: string;
  groupName: string;
  startedDate: string;
  isFreezed: boolean;
  subscripts: never[];
  image: string;
};
