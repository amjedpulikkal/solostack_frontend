
export type Iauthor = "student" | "mentor" | "tutor"

export interface StudentData {
  personal_info: {
    name: string,
    bio: string,
    photo: string
  }
  account_info: {
    completedSessions: string[],
    reviews: string[]
  },
  _id: string,
  email: string,
  password: string,
  wallet: number,
  isBlocked: false,
  joinedAt: string,
  __v: number

}
export type IFormData={
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  author:Iauthor
  confirmPassword?:FormDataEntryValue | null;

}