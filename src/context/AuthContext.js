import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  // Funcție pentru parsarea sigură a JSON-ului
  const parseUser = (user) => {
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      localStorage.removeItem('user'); // Elimină datele corupte
      return null;
    }
  };

  const [auth, setAuth] = useState({
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    user: parseUser(storedUser),
  });

  // Salvăm token-ul și user-ul în localStorage atunci când auth se modifică
  useEffect(() => {
    if (auth.token && auth.user) {
      localStorage.setItem('token', auth.token);
      localStorage.setItem('user', JSON.stringify(auth.user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    if (auth.user) {
      console.log('Current User:', auth.user.name);
    } else {
      console.log('No user logged in.');
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
