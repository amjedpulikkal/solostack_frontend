
import { ModeToggle } from "../../components/mode-toggle";
// import { GoogleLoginButton } from "../../components/GoogleOAuth"
import { SwitchUser } from "../../components/switchUser";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp"
// import React from "react";
// import { JSX } from "react/jsx-runtime";

// export default function Otp(): JSX.Element {


//   return (
//     <>
//       <div className='flex justify-end mt-6 mr-6'>
//         <ModeToggle />
//       </div>
//       <div className="w-screen flex justify-center items-center h-[80vh]">
//         <InputOTP
//           maxLength={6}
//           render={({ slots }) => (
//             <InputOTPGroup className="gap-2 ">
//               {slots.map((slot: JSX.IntrinsicAttributes & Omit<any, "ref"> & React.RefAttributes<HTMLDivElement>, index: React.Key | null | undefined) => (
//                 <React.Fragment key={index}>
//                   <InputOTPSlot className="rounded-md border h-24 w-24 text-4xl" {...slot} />
//                   {index !== slots.length - 1 && <InputOTPSeparator />}
//                 </React.Fragment>
//               ))}{" "}
//             </InputOTPGroup>
//           )}
//         />
//       </div>

//       <div className='flex justify-end mb-6 mr-6'>
//         <SwitchUser />
//       </div>
//     </>
//   )
// }


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "sonner"

import { useOtpVerifyQuery } from "../../reactQuery/student/signUp"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function InputOTPForm({ email }) {
  const OtpQuery = useOtpVerifyQuery()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    OtpQuery.mutateAsync({ otp: data.pin, email })

    if (OtpQuery.isSuccess) {
      console.log(OtpQuery.data)
    }
  }
  return (
    <>
      <div className='flex justify-end mt-6 mr-6'>
        <ModeToggle />
      </div>
      <div className="w-screen flex justify-center items-center h-[80vh]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-2 ">
                          {slots.map((slot: JSX.IntrinsicAttributes & Omit<any, "ref"> & React.RefAttributes<HTMLDivElement>, index: React.Key | null | undefined) => (

                            <InputOTPSlot className="rounded-md border h-24 w-24 text-4xl" {...slot} />


                          ))}{" "}
                        </InputOTPGroup>
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">{OtpQuery.isLoading ? "loading" : "submit"}</Button>
          </form>
        </Form>
      </div >

      <div className='flex justify-end mb-6 mr-6'>
        <SwitchUser />
      </div>
    </>
  )
}
