import { ReactNode, Suspense, lazy, } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";




import { SwitchUserProvider } from "./components/switchUser-provider";

import { StudentParentRoute, CommonRoute } from "./router/protectedRouter";

import { MentorProtectedRouter } from "./router/protectedMentorsRouter";
import { Page404 } from "./page/404";
import { StudentProfile } from "./page/student/profile";
import { VerifyForgetPassword } from "./page/auth/verifyForgetPassword";

import { Toaster as Toast } from "@/components/ui/toaster";

import StudentTabs from "./components/student/tabs";

import { ProfileProtectedRouter } from "@/router/profileProtectedRouter";


const Chat = lazy(() => import("./page/student/chat"));
const Home = lazy(() => import("./page/student/homePage"));

import Test from "./components/test"
import MentorTime from "./page/mentor/TimeUpdate"
import MentorHome from "./page/mentor/home";
import PaymentPage from "./page/payment";
import PaymentSuccess from "./page/paymentSuccess";
import AdminLogin from "./page/admin/login";
const AdminChat = lazy(() => import("./page/admin/chat"))
const Sign = lazy(() => import("./page/auth/signup"));

const Oauth2 = lazy(() => import("./page/auth/Outh2"));
const SignIn = lazy(() => import("./page/auth/signIn"));
const SelectAuthor = lazy(() => import("@/page/auth/selectLoginAuthor"));
const SelectSignUpAuthor = lazy(() => import("@/page/auth/selectSignUoAuthor"));
const AdminHome = lazy(() => import("./page/admin/home"));
const AllStudent = lazy(() => import("./page/admin/allStudent"));
const AllMentor = lazy(() => import("./page/admin/allMentor"));
const MentorProfile = lazy(() => import("./page/mentor/profile"));
const LandingPage = lazy(() => import("./page/landingPage"));
// const Socket = lazy(() => import("./page/socket"));
const VideoCall = lazy(() => import("./page/videoCall"));
const CommunicationRoom = lazy(() => import("./page/student/communication-room"));

function SuspenseFn({ Element }: {
  Element: ReactNode;
}) {

  return (
    <Suspense fallback={<Test />}>
      {Element}
    </Suspense>
  );
}

function App() {
  return (
    <>
      {/* <AnimatePresence mode="wait" > */}

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <NextUIProvider> */}
        <SwitchUserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SuspenseFn Element={<LandingPage />} />} />
              <Route path="/test" element={<SuspenseFn Element={<Test />} />} />
              <Route element={<CommonRoute />}>
                <Route path="/signIn" element={<SuspenseFn Element={<SelectAuthor />} />} />
                <Route path="/student/signIn" element={<SuspenseFn Element={<SignIn />} />} />
                <Route path="/mentor/signIn" element={<SuspenseFn Element={<SignIn />} />} />
                <Route path="/signUp" element={<SuspenseFn Element={<SelectSignUpAuthor />} />} />
                <Route path="/student/signUp" element={<SuspenseFn Element={<Sign />} />} />
                <Route path="/mentor/signUp" element={<SuspenseFn Element={<Sign />} />} />
                <Route
                  path="/verify-forget-password/:token"
                  element={<VerifyForgetPassword />}
                />
                <Route path="/oauth/:provider/:token" element={<SuspenseFn Element={<Oauth2 />} />} />
                <Route path="/admin/login" element={<SuspenseFn Element={<AdminLogin />} />} />
              </Route>
              {/* mentor - Router  */}
              <Route path="/VideoCall/:id" element={<SuspenseFn Element={<VideoCall />} />} />

              <Route path="/admin/*" element={<SuspenseFn Element={<AdminHome />} />}>
                <Route index element={<></>} />

                <Route path="allStudent" element={<SuspenseFn Element={<AllStudent />} />} />
                <Route path="allMentor" element={<SuspenseFn Element={<AllMentor />} />} />
                <Route path="chat" element={<SuspenseFn Element={<AdminChat />} />} />

                <Route path="*" element={<Page404 />} />
              </Route>
              <Route path="/mentor/*" element={<MentorProtectedRouter />}>
                <Route index element={<SuspenseFn Element={<MentorHome />} />} />

                <Route path="update-Time" element={<MentorTime />} />
              </Route>
              <Route element={<ProfileProtectedRouter />}>
                <Route path="/mentor/:userName" element={<SuspenseFn Element={<MentorProfile />} />} />
                <Route path="/student/:userName" element={<StudentProfile />} />
              </Route>

              <Route path="/student/*" element={<StudentParentRoute />}>
                <Route index element={<SuspenseFn Element={<Home />} />} />
                <Route path="chat" element={<Suspense fallback={<Test />}><Chat /></Suspense>} />
                <Route path="mentor" element={<StudentTabs />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="paymentSuccess" element={<PaymentSuccess />} />



                <Route
                  path="communication-room"
                  element={<SuspenseFn Element={<CommunicationRoom />} />}
                />
                <Route path="*" element={<Page404 />} />

              </Route>
              {/* <Route path="/stripe" element={<StripeTest />} /> */}
              {/* Student - Router  */}
              <Route path="/*" element={<Page404 />} />
            </Routes>
            <Toaster position="bottom-center" />
            <Toast />
          </BrowserRouter>
        </SwitchUserProvider>
        {/* </NextUIProvider > */}
      </ThemeProvider>
      {/* </AnimatePresence> */}
    </>
  );
}

export default App;
