import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    loading: true
  });

  useEffect(() => {
    // Check for existing session on app load
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        setAuthState({
          user: JSON.parse(user),
          token,
          loading: false
        });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ user: null, token: null, loading: false });
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthState({ user: userData, token, loading: false });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ user: null, token: null, loading: false });
  };

  const updateUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthState(prev => ({ ...prev, user: userData }));
  };

  // Don't render children until auth state is determined
  if (authState.loading) {
    return <div>Loading...</div>; // You can replace with a proper loading component
  }

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      login, 
      logout, 
      updateUser,
      currentUser: authState.user // For backward compatibility
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};