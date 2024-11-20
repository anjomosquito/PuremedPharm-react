import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MedicineProvider } from '../../contexts/MedicineContext';
import MedicineManagement from '../medicine/MedicineManagement';
import AdminNavBar from '../navigation/AdminNavBar';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalPharmacy as MedicineIcon,
  ShoppingCart as PurchaseIcon,
  People as UsersIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

// Placeholder components for other sections
const DashboardContent = () => {
  const stats = [
    { title: 'Total Medicines', value: '150', icon: <MedicineIcon />, color: '#1976d2' },
    { title: 'Total Purchases', value: '45', icon: <PurchaseIcon />, color: '#2e7d32' },
    { title: 'Active Users', value: '28', icon: <UsersIcon />, color: '#ed6c02' },
    { title: 'New Messages', value: '5', icon: <ChatIcon />, color: '#9c27b0' },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100%',
        width: '100%',
         // Remove padding
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, px: 3, pt: 3 }}>
        Welcome to Admin Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ px: 3, pb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                height: '100%',
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: `${stat.color}15`,
                  mb: 2,
                }}
              >
                <Box sx={{ color: stat.color }}>{stat.icon}</Box>
              </Box>
              <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


const PurchaseManagement = () => (
  <Box
    sx={{
      flexGrow: 1,
      height: '100%',
      width: '100%',
      m: 0,
      p: 0,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Typography variant="h4" sx={{ mb: 2, px: 3, pt: 3 }}>
      Purchase Management
    </Typography>
    <Box sx={{ p: 3, flexGrow: 1 }}>
      {/* Purchase management content will go here */}
      <Typography variant="h6" color="text.secondary">Coming Soon</Typography>
    </Box>
  </Box>
);

const UserManagement = () => (
  <Box
    sx={{
      flexGrow: 1,
      height: '100%',
      width: '100%',
      m: 0,
      p: 0,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Typography variant="h4" sx={{ mb: 2, px: 3, pt: 3 }}>
      User Management
    </Typography>
    <Box sx={{ p: 3, flexGrow: 1 }}>
      {/* User management content will go here */}
      <Typography variant="h6" color="text.secondary">Coming Soon</Typography>
    </Box>
  </Box>
);

const ChatSystem = () => (
  <Box
    sx={{
      flexGrow: 1,
      height: '100%',
      width: '100%',
      m: 0,
      p: 0,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Typography variant="h4" sx={{ mb: 2, px: 3, pt: 3 }}>
      Chat System
    </Typography>
    <Box sx={{ p: 3, flexGrow: 1 }}>
      {/* Chat system content will go here */}
      <Typography variant="h6" color="text.secondary">Coming Soon</Typography>
    </Box>
  </Box>
);

export default function AdminDashboard() {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AdminNavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          mt: '64px', // Height of AppBar
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
        }}
      >
        <MedicineProvider>
          <Routes>
            <Route index element={<DashboardContent />} />
            <Route path="medicine" element={<MedicineManagement />} />
            <Route path="purchase" element={<PurchaseManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="chat" element={<ChatSystem />} />
          </Routes>
        </MedicineProvider>
      </Box>
    </Box>
  );
}
