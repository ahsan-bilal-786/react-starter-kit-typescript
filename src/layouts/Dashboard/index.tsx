import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import ChevronRight from '@mui/icons-material/AdminPanelSettings';
import Dashboard from '@mui/icons-material/Dashboard';
import Person from '@mui/icons-material/Person';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from 'components/Header';
import SidebarLinkItem from "elements/Links/SidebarLinkItem";

export const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#141414',
      light: '#68737d',
      dark: '#1A1D21',
      contrastText: '#bac1ca',
    },
    secondary: {
      main: '#0277bd',
    },
    background: {
      paper: '#fff',
      default: '#fff',
    },
    text: {
      secondary: 'rgba(0,0,0,0.7)',
      primary: '#312e2e',
    },
  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    h2: {
      fontSize: 24,
      fontWeight: 400,
      fontFamily: '"sharp-grotesk-medium-20", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontSize: 18,
      fontFamily: '"sharp-grotesk-medium-20", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Metric", "Helvetica", "Arial", sans-serif',
      fontSize: 16,
    },
    button: {
      fontFamily: '"Sharp Grotesk", "Helvetica", "Arial", sans-serif',
      fontSize: 16,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
        },
      },
    },
  },
};

const darkTheme = createTheme(themeOptions);


const drawerWidth = 240;

const DashboardLayout: FC<any> = (props) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />

        <Drawer
          variant='permanent'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <SidebarLinkItem to='/' text='Dashboard' Icon={Dashboard} />
              <SidebarLinkItem to='/profile' text='Profile' Icon={Person} />
              <SidebarLinkItem to='/account' text='Account' Icon={ChevronRight} />
            </List>
          </Box>
        </Drawer>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet {...props} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardLayout;

