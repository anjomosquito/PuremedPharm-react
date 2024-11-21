import React from 'react';
import { Box } from '@mui/material';
import AdminNavBar from '../navigation/AdminNavBar';

export default function UserLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminNavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: '64px', // Height of AppBar
          minHeight: '100vh',
          backgroundColor: '#f5f5f5'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
