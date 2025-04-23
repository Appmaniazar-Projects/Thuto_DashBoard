import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Container, Alert, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'test',
    password: 'test1',
    role: 'TEACHER', // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Mock login for now - replace with actual API call
      const userData = {
        id: 1,
        name: getUserNameByRole(formData.role),
        email: formData.email,
        role: formData.role,
      };
      const token = 'mock-jwt-token';
      
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  // Helper function to get a realistic name based on role
  const getUserNameByRole = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'Principal Johnson';
      case 'TEACHER':
        return 'Ms. Rebecca Smith';
      case 'PARENT':
        return 'Mr. Thompson';
      case 'STUDENT':
        return 'Emma Thompson';
      default:
        return 'User';
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={3} 
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8
        }}
      >
        <Typography component="h1" variant="h5">
          Cyber Scholar Portal Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Sign in as</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              name="role"
              value={formData.role}
              label="Sign in as"
              onChange={handleChange}
            >
              <MenuItem value="ADMIN">Administrator</MenuItem>
              <MenuItem value="TEACHER">Teacher</MenuItem>
              <MenuItem value="PARENT">Parent</MenuItem>
              <MenuItem value="STUDENT">Student</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;