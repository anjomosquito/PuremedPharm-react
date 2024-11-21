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
  const [rememberMe, setRememberMe] = useState(() => {
    const remembered = localStorage.getItem('rememberMe');
    return remembered ? JSON.parse(remembered) : false;
  });
  const navigate = useNavigate();
  let inactivityTimeout;

  const resetInactivityTimer = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }
    // Only set inactivity timeout if remember me is not enabled
    if (!rememberMe) {
      inactivityTimeout = setTimeout(() => {
        logout();
        toast.info('Session expired due to inactivity');
      }, 10 * 60 * 1000); // 10 minutes
    }
  };

  useEffect(() => {
    // Add event listeners for user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => {
      if (user && !rememberMe) {
        resetInactivityTimer();
      }
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Initialize timer if user is logged in and remember me is not enabled
    if (user && !rememberMe) {
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
  }, [user, rememberMe]);

  const login = async (email, password, remember) => {
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
        setRememberMe(remember);
        
        // Store user data and remember me preference
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('rememberMe', JSON.stringify(remember));
        
        // Only set inactivity timer if remember me is not enabled
        if (!remember) {
          resetInactivityTimer();
        }
        
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
      setRememberMe(false);
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
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
    loading,
    rememberMe
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
