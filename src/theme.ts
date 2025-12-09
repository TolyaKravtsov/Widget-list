import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
      light: '#5effff',
      dark: '#00b2cc',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#0a0e27',
      paper: '#151932',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
    success: {
      main: '#00ff88',
    },
    warning: {
      main: '#ffb300',
    },
    error: {
      main: '#ff1744',
    },
    info: {
      main: '#00e5ff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#151932',
          borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0f1320',
          borderRight: '1px solid rgba(0, 229, 255, 0.2)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 229, 255, 0.1)',
          },
        },
      },
    },
  },
})

export default theme

