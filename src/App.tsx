import { createTheme, ThemeProvider } from "@mui/material"
import { createContext, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BookAppBar from "./components/BookAppBar"
import { User } from "./interfaces/User"
import { getCurrentUser } from "./lib/api/auth"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import Ballance from "./pages/Ballance"
import Budgets from "./pages/Budgets"
import Items from "./pages/Items"

const theme = createTheme({
  palette: {
    mode: 'dark'
    // mode: 'light'
  }
})

export const AuthContext = createContext({} as {
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
          <BookAppBar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
              {isSignedIn ? (
                <>
                  <Route path="/" element={<Ballance />} />
                  <Route path="/ballance" element={<Ballance />} />
                  <Route path="/budgets" element={<Budgets />} />
                  <Route path="/items" element={<Items />} />
                </>
              ) : (
                <Route path="/" element={<></>} />
              )}
          </Routes>
        </AuthContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
