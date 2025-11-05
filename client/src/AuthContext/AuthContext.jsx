import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  // Load user data from localStorage AND fetch streak on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 1. Load user data from localStorage
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }

        // 2. Fetch streak if token exists
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}review/updatestreak`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setStreak(response.data.Streak.currentStreak);
          } catch (error) {
            console.error("Error fetching streak:", error);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        // Clear corrupted data
        localStorage.removeItem("userData");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []); // Run once on mount

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  // Logout function to clear user data
  const logout = () => {
    setUserData(null);
    setStreak(0);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading, logout, streak, setStreak }}>
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