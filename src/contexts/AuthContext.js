import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let inactivityTimeout;

  const resetInactivityTimer = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }
    inactivityTimeout = setTimeout(() => {
      logout();
      toast.info('Session expired due to inactivity');
    }, 10 * 60 * 1000); // 10 minutes
  };

  useEffect(() => {
    // Add event listeners for user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => {
      if (user) {
        resetInactivityTimer();
      }
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Initialize timer if user is logged in
    if (user) {
      resetInactivityTimer();
    }

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
    };
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Hardcoded credentials check
      let userData = null;
      if (email === 'admin@example.com' && password === 'admin@example.com') {
        userData = { email, role: 'admin' };
      } else if (email === 'user@example.com' && password === 'user@example.com') {
        userData = { email, role: 'user' };
      }

      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        resetInactivityTimer();
        toast.success('Successfully logged in!');
        navigate(userData.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to log in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
