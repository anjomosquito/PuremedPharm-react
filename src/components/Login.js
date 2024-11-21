import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: '64px',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: '24px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '12px',
  marginTop: '24px',
  marginBottom: '16px',
  backgroundColor: '#1976d2',
  '&:hover': {
    backgroundColor: '#115293',
  },
}));

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      await login(email, password, rememberMe);
      
      // Navigate based on email
      if (email === 'admin@example.com') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
          PuremedPharmacy
        </Typography>
        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </StyledButton>
        </StyledForm>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Demo Credentials:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Admin: admin@example.com / admin@example.com
          </Typography>
          <Typography variant="body2" color="textSecondary">
            User: user@example.com / user@example.com
          </Typography>
        </Box>
      </StyledPaper>
    </Container>
  );
}
