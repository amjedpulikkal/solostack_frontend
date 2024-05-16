
import React, { Suspense, lazy } from 'react';
import './App.css'
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/sonner"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Chat from './page/student/chat'
import CommunicationRoom from './page/student/communication-room'
import Home from './page/student/homePage'
import MentorHome from './page/mentor/home'
import Login from './page/auth/login'
import Sign from './page/auth/signin'
import SignBasicInformation from './page/auth/signUpbasicInformation'
import { SwitchUserProvider } from './components/switchUser-provider'
import Oauth2 from './page/auth/Outh2';
import { StudentParentRoute, CommonRoute } from './router/protectedRouter';
import Test from './components/test';
import { MentorProtectedRouter } from './router/protectedMentorsRouter';
import { Page404 } from './page/404';
import { StudentProfile } from './page/student/profile';
import { VerifyForgetPassword } from './page/auth/verifyForgetPassword';
import { AnimatePresence } from 'framer-motion';
import { Toaster as Toast } from "@/components/ui/toaster"
import { SelectAuthor } from "@/page/auth/selectLoginAuthor"
import { SelectSignUpAuthor } from "@/page/auth/selectSignUoAuthor"
import { AdminHome } from './page/admin/home';
import { AllStudent } from './page/admin/allStudent';
import { AllMentor } from "./page/admin/allMentor"
import StudentTabs from './components/student/tabs';
import { MentorProfile } from './page/mentor/profile';
import { ProfileProtectedRouter } from "@/router/profileProtectedRouter"
import LandingPage from './page/landingPage';
import { Socket } from './page/socket';
import {VideoCall} from './page/videoCall';

function App() {

  return (
    <>
      {/* <AnimatePresence mode="wait" > */}

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <NextUIProvider> */}
        <SwitchUserProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route element={<CommonRoute />}>
                <Route path='/login' element={<SelectAuthor />} />

                <Route path='/student/login' element={<Login />} />
                <Route path='/mentor/login' element={<Login />} />
                <Route path='/test' element={<Test />} />
                <Route path='/signUp' element={<SelectSignUpAuthor />} />
                <Route path='/student/signUp' element={<Sign />} />
                <Route path='/mentor/signUp' element={<Sign />} />
                <Route path='/verify-forget-password/:token' element={<VerifyForgetPassword />} />
                <Route path='/oauth/:provider/:token' element={<Oauth2 />} />
              </Route>
              {/* mentor - Router  */}
              <Route path='/VideoCall' element={<VideoCall />} />

              <Route path="/admin/*" element={<AdminHome />}>

                <Route path='' element={<></>} />
                <Route path='allStudent' element={<AllStudent />} />
                <Route path='allMentor' element={<AllMentor />} />
                <Route path='chat' element={<AllMentor />} />
                <Route path='*' element={<Page404 />} />

              </Route>
              <Route element={<MentorProtectedRouter />}>
                <Route path='/mentor' element={<MentorHome />} />
              </Route>

              <Route element={<ProfileProtectedRouter />}>
                <Route path='/mentor/:userName' element={<MentorProfile />} />
                <Route path='/student/:userName' element={<StudentProfile />} />
              </Route>

                <Route path='/chat' element={<Chat />} />
              <Route path="/student/*" element={<StudentParentRoute />}>
                <Route path='' element={<Home />} />
                <Route path='mentor' element={<StudentTabs />} />
                {/* <Route path='sing/basicInformation' element={<SignBasicInformation />} /> */}
                <Route path='communication-room' element={<CommunicationRoom />} />
                <Route path='*' element={<Page404 />} />
              </Route>
              {/* Student - Router  */}
              <Route path='/*' element={<Page404 />} />
            </Routes>
            <Toaster position="bottom-center" />
            <Toast />
          </BrowserRouter>
        </SwitchUserProvider>
        {/* </NextUIProvider > */}
      </ThemeProvider >
      {/* </AnimatePresence> */}

    </>
  )
}

export default App
