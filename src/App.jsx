import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import MainPage from 'pages/MainPage'


const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffffbf'
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#ffffffbf'
        },
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#ffffffbf'
        },
      }
    }
  },
});


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>   
          <Route path='/' element={<MainPage />} />
        </Routes> 
      </BrowserRouter>    
    </ThemeProvider>
  );
}
