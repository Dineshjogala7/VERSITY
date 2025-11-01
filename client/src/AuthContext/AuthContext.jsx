import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        // Clear corrupted data
        localStorage.removeItem("userData");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  // Logout function to clear user data
  const logout = () => {
    setUserData(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};