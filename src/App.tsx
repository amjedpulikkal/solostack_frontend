
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

function App() {

  return (
    <>
      {/* <AnimatePresence mode="wait" > */}

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SwitchUserProvider>
          <BrowserRouter>
            <Routes>
              {/* <Route element={<CommonRoute />}> */}
              <Route path='/login' element={<Login />} />
              <Route path='/test' element={<Test />} />
              <Route path='/signUp' element={<Sign />} />
              <Route path='/oauth/:provider/:token' element={<Oauth2 />} />
              <Route path='/verify-forget-password/:token' element={<VerifyForgetPassword />} />

              {/* mentor - Router  */}

              <Route element={<MentorProtectedRouter />}>
                <Route path='/mentor' element={<MentorHome />} />

              </Route>
              {/* mentor - Router  */}
              {/* Student - Router  */}
              <Route element={<StudentParentRoute />}>
                <Route path='/student' element={<Home />} />
                <Route path='/student/profile/:userName' element={<StudentProfile />} />
                <Route path='/student/sing/basicInformation' element={<SignBasicInformation />} />
                <Route path='/student/chat' element={<Chat />} />
                <Route path='/student/communication-room' element={<CommunicationRoom />} />
              </Route>
              {/* Student - Router  */}

              <Route element={<MentorProtectedRouter />}>

              </Route>

              <Route path='/*' element={<Page404 />} />
            </Routes>
            <Toaster position="bottom-center" />
          </BrowserRouter>
        </SwitchUserProvider>
      </ThemeProvider>
      {/* </AnimatePresence> */}

    </>
  )
}

export default App
