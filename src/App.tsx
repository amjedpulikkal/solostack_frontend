import React, { Suspense, lazy, startTransition } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import CommunicationRoom from "./page/student/communication-room";




import { SwitchUserProvider } from "./components/switchUser-provider";
// import Oauth2 from "./page/auth/Outh2";
import { StudentParentRoute, CommonRoute } from "./router/protectedRouter";
// import Test from "./components/test";
import { MentorProtectedRouter } from "./router/protectedMentorsRouter";
import { Page404 } from "./page/404";
import { StudentProfile } from "./page/student/profile";
import { VerifyForgetPassword } from "./page/auth/verifyForgetPassword";
// import { AnimatePresence } from "framer-motion";
import { Toaster as Toast } from "@/components/ui/toaster";

// import { SelectSignUpAuthor } from "@/page/auth/selectSignUoAuthor";
// import { AdminHome } from "./page/admin/home";
// import { AllStudent } from "./page/admin/allStudent";
// import { AllMentor } from "./page/admin/allMentor";
import StudentTabs from "./components/student/tabs";
// import { MentorProfile } from "./page/mentor/profile";
import { ProfileProtectedRouter } from "@/router/profileProtectedRouter";
// import LandingPage from "./page/landingPage";
// import { Socket } from "./page/socket";
// import { VideoCall } from "./page/videoCall";


const Chat = lazy(() => import("./page/student/chat"));
const Home = lazy(() => import("./page/student/homePage"));

import MentorHome from "./page/mentor/home"
const AdminChat = lazy(()=>import("./page/admin/chat"))
const Sign = lazy(() => import("./page/auth/signin"));
const SignBasicInformation = lazy(() => import("./page/auth/signUpbasicInformation"));
const Oauth2 = lazy(() => import("./page/auth/Outh2"));
const Test = lazy(() => import("./components/test"));
const Login = lazy(() => import("./page/auth/login"));
const SelectAuthor = lazy(() => import("@/page/auth/selectLoginAuthor"));
const SelectSignUpAuthor = lazy(() => import("@/page/auth/selectSignUoAuthor"));
const AdminHome = lazy(() => import("./page/admin/home"));
const AllStudent = lazy(() => import("./page/admin/allStudent"));
const AllMentor = lazy(() => import("./page/admin/allMentor"));
const MentorProfile = lazy(() => import("./page/mentor/profile"));
const LandingPage = lazy(() => import("./page/landingPage"));
const Socket = lazy(() => import("./page/socket"));
const VideoCall = lazy(() => import("./page/videoCall"));
const CommunicationRoom = lazy(() => import("./page/student/communication-room"));

function SuspenseFn({ Element }) {
  const [element, setElement] = React.useState(null);

  React.useEffect(() => {
    startTransition(() => {
      setElement(Element);
    });
  }, [Element]);

  return (
    <Suspense fallback={<Test />}>
      {element}
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
              <Route element={<CommonRoute />}>
                <Route path="/login" element={<SuspenseFn Element={<SelectAuthor />} />} />
                <Route path="/student/login" element={<SuspenseFn Element={<Login />} />} />
                <Route path="/mentor/login" element={<SuspenseFn Element={<Login />} />} />
                <Route path="/test" element={<SuspenseFn Element={<Test />} />} />
                <Route path="/signUp" element={<SuspenseFn Element={<SelectSignUpAuthor />} />} />
                <Route path="/student/signUp" element={<SuspenseFn Element={<Sign />} />} />
                <Route path="/mentor/signUp" element={<SuspenseFn Element={<Sign />} />} />
                <Route
                  path="/verify-forget-password/:token"
                  element={<VerifyForgetPassword />}
                />
                 <Route path="/oauth/:provider/:token" element={<SuspenseFn Element={<Oauth2 />} />} />
              </Route>
              {/* mentor - Router  */}
              <Route path="/VideoCall" element={<SuspenseFn Element={<VideoCall />} />} />

              <Route path="/admin/*" element={<SuspenseFn Element={<AdminHome />} />}>
                <Route path="" element={<></>} />

                <Route path="allStudent" element={<SuspenseFn Element={<AllStudent />} />} />
                <Route path="allMentor" element={<SuspenseFn Element={<AllMentor />} />} />
                <Route path="chat"element={<SuspenseFn Element={<AdminChat />} />} />
                <Route path="*" element={<Page404 />} />
              </Route>
              <Route element={<MentorProtectedRouter />}>
              <Route path="/mentor" element={<SuspenseFn Element={<MentorHome />} />} />
              </Route>
              <Route element={<ProfileProtectedRouter />}>
              <Route path="/mentor/:userName" element={<SuspenseFn Element={<MentorProfile />} />} />
                <Route path="/student/:userName" element={<StudentProfile />} />
              </Route>

              <Route path="/student/*" element={<StudentParentRoute />}>
                <Route path="" element={<SuspenseFn Element={<Home />} />} />
                <Route path="chat" element={<SuspenseFn Element={<Chat />} />} /> 
                <Route path="mentor" element={<StudentTabs />} />
                {/* <Route path='sing/basicInformation' element={<SignBasicInformation />} /> */}
                <Route
                  path="communication-room"
                  element={<SuspenseFn Element={<CommunicationRoom />} />}
                />
                <Route path="*" element={<Page404 />} />
              </Route>
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
