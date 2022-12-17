import { createTheme, ThemeProvider } from "@mui/material"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BookAppBar from "./components/BookAppBar"
import Ballance from "./pages/Ballance"
import Budgets from "./pages/Budgets"
import Items from "./pages/Items"

const theme = createTheme({
  palette: {
    mode: 'dark'
    // mode: 'light'
  }
})

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BookAppBar />
        <Routes>
          <Route path="/" element={<Ballance />} />
          <Route path="/ballance" element={<Ballance />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
