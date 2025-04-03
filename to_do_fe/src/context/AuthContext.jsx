// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { message } from "antd";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.register(userData);
      setIsAuthenticated(true);
      message.success("Registration successful!");
      return data;
    } catch (error) {
      message.error(error.msg || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.login(userData);
      setIsAuthenticated(true);
      message.success("Login successful!");
      return data;
    } catch (error) {
      message.error(error.msg || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    message.info("You have been logged out");
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
