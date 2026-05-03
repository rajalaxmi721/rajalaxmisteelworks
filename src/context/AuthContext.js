import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('raj_users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: '1', name: 'Admin', identifier: 'admin', password: 'admin', role: 'admin', joinedAt: new Date().toISOString() }
    ];
  });

  useEffect(() => {
    localStorage.setItem('raj_users', JSON.stringify(users));
  }, [users]);

  const register = async (userData) => {
    // Check if user exists
    if (users.find(u => u.identifier === userData.identifier)) {
      return { success: false, error: 'User already exists' };
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      role: 'customer',
      joinedAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    
    // Redirect to WhatsApp on interest
    const message = `Hi Rajlaxmi Metal Works, I am interested in your services. My name is ${userData.name}.`;
    window.open(`https://wa.me/917349760721?text=${encodeURIComponent(message)}`, '_blank');
    
    return { success: true };
  };

  const login = async (identifier, password, role = null) => {
    const foundUser = users.find(u => 
      u.identifier === identifier && 
      u.password === password && 
      (!role || u.role === role)
    );

    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const fetchUsers = () => {
    // In mock mode, we just use the local state
    return users;
  };

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, fetchUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
