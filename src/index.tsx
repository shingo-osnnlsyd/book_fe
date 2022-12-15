import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Pages from './pages';
import BookAppBar from './components/BookAppBar';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark'
    // mode: 'light'
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BookAppBar />
        <Pages />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
