import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import { MedicineProvider } from './contexts/MedicineContext';
import { CategoryProvider } from './contexts/CategoryContext';
import theme from './theme';
import Login from './components/Login';
import AdminDashboard from './components/dashboards/AdminDashboard';
import UserDashboard from './components/dashboards/UserDashboard';
import MedicineManagement from './components/medicine/MedicineManagement';
import CategoryManagement from './components/category/CategoryManagement';
import PurchaseManagement from './components/purchase/PurchaseManagement';
import ChatManagement from './components/chat/ChatManagement';
import UserManagement from './components/users/UserManagement';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './components/layout/AdminLayout';

// Wrap component with AdminLayout
const AdminRoute = ({ children }) => {
  return (
    <PrivateRoute allowedRoles={['admin']}>
      <AdminLayout>{children}</AdminLayout>
    </PrivateRoute>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <CategoryProvider>
            <MedicineProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                
                {/* Admin Routes with AdminLayout */}
                <Route
                  path="/admin-dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/medicine"
                  element={
                    <AdminRoute>
                      <MedicineManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/category"
                  element={
                    <AdminRoute>
                      <CategoryManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/purchase"
                  element={
                    <AdminRoute>
                      <PurchaseManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/chat"
                  element={
                    <AdminRoute>
                      <ChatManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <UserManagement />
                    </AdminRoute>
                  }
                />

                {/* User Route without layout */}
                <Route
                  path="/user-dashboard"
                  element={
                    <PrivateRoute allowedRoles={['user']}>
                      <UserDashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </MedicineProvider>
          </CategoryProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
