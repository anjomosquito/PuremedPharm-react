import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  LocalPharmacy as MedicineIcon,
  ShoppingCart as PurchaseIcon,
  People as UsersIcon,
  Chat as ChatIcon,
  Logout as LogoutIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminNavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const navigationItems = [
    { label: 'Dashboard', value: '/admin-dashboard', icon: <DashboardIcon /> },
    { label: 'Medicine', value: '/admin/medicine', icon: <MedicineIcon /> },
    { label: 'Category', value: '/admin/category', icon: <CategoryIcon /> },
    { label: 'Purchase', value: '/admin/purchase', icon: <PurchaseIcon /> },
    { label: 'Users', value: '/admin/users', icon: <UsersIcon /> },
    { label: 'Chat', value: '/admin/chat', icon: <ChatIcon /> },
  ];

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 2 }}>
          PureMed
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {!isMobile && (
            <Tabs
              value={location.pathname}
              textColor="inherit"
              indicatorColor="secondary"
              sx={{
                '& .MuiTab-root': {
                  minHeight: 64,
                  color: 'inherit',
                }
              }}
            >
              {navigationItems.map((item) => (
                <Tab
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                  component={Link}
                  to={item.value}
                  sx={{
                    '&.Mui-selected': {
                      color: 'inherit',
                      opacity: 1,
                    },
                    '&:not(.Mui-selected)': {
                      opacity: 0.8,
                    }
                  }}
                />
              ))}
            </Tabs>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.value}
                    onClick={() => {
                      navigate(item.value);
                      handleClose();
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                      <Typography sx={{ ml: 1 }}>{item.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LogoutIcon />
                    <Typography sx={{ ml: 1 }}>Logout</Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
