import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize users from localStorage
  const [mockUsers, setMockUsers] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('mock_users');
      return storedUsers ? JSON.parse(storedUsers) : [
        // Default user for testing
        {
          email: 'user@example.com',
          password: 'password123',
          fullName: 'John Doe',
          phone: '+1234567890',
          company: 'Tech Corp',
          isAgency: false,
          avatar: null
        }
      ];
    }
    return [];
  });

  // Persist user to localStorage on change
  useEffect(() => {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }, [user]);

  // Persist mockUsers to localStorage on change
  useEffect(() => {
    localStorage.setItem('mock_users', JSON.stringify(mockUsers));
  }, [mockUsers]);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(
        u => u.email === credentials.email && 
             u.password === credentials.password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Create session without password
      const { password, ...userSession } = foundUser;
      
      setUser(userSession);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

const signup = async (userData) => {
  setIsLoading(true);
  setError(null);
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('Email already in use');
    }

    setMockUsers(prev => [...prev, userData]);
    const { password, ...userSession } = userData;
    setUser(userSession); // THIS MUST WORK for the redirect to happen
    return { success: true };
  } catch (err) {
    setError(err.message);
    return { success: false, error: err.message };
  } finally {
    setIsLoading(false);
  }
};

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isLoading,
      error,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};