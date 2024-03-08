
import './App.css'
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/sonner"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Chat from './page/student/chat'
import CommunicationRoom from './page/student/communication-room'
import Home from './page/student/homePage'
import Login from './page/auth/login'
import Sign from './page/auth/sing'
import { SwitchUserProvider } from './components/switchUser-provider'


function App() {

  return (
    <>

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SwitchUserProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/sing' element={<Sign />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/communication-room' element={<CommunicationRoom />} />
            </Routes>
            <Toaster position="bottom-center" />
          </BrowserRouter>
        </SwitchUserProvider>
      </ThemeProvider>
    </>
  )
}

export default App
