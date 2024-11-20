import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  LocalPharmacy as MedicineIcon,
  ShoppingCart as PurchaseIcon,
  People as UsersIcon,
  Chat as ChatIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminNavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin-dashboard' },
    { text: 'Medicine', icon: <MedicineIcon />, path: '/admin-dashboard/medicine' },
    { text: 'Purchase', icon: <PurchaseIcon />, path: '/admin-dashboard/purchase' },
    { text: 'Users', icon: <UsersIcon />, path: '/admin-dashboard/users' },
    { text: 'Chat', icon: <ChatIcon />, path: '/admin-dashboard/chat' },
  ];

  const getCurrentTabValue = () => {
    const currentPath = location.pathname;
    const index = menuItems.findIndex(item => item.path === currentPath);
    return index === -1 ? 0 : index;
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ mr: 4 }}>
            PuremedPharmacy
          </Typography>
          {!isMobile && (
            <Tabs 
              value={getCurrentTabValue()} 
              textColor="inherit"
              indicatorColor="secondary"
            >
              {menuItems.map((item, index) => (
                <Tab
                  key={item.text}
                  icon={item.icon}
                  label={item.text}
                  onClick={() => navigate(item.path)}
                  sx={{
                    minWidth: 'auto',
                    px: 3,
                    '&:hover': {
                      opacity: 0.8,
                    }
                  }}
                />
              ))}
            </Tabs>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => {}}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Button 
            color="inherit" 
            onClick={handleLogout} 
            startIcon={<LogoutIcon />}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
