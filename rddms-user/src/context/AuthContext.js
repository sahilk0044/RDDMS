import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 LOAD TOKEN ON APP START
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        console.log("🔄 Loaded Token:", token); // ✅ DEBUG

        if (token) {
          setUserToken(token);
        }
      } catch (err) {
        console.log("❌ Token load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const res = await API.post("/users/login", { email, password });

      console.log("✅ Login Response:", res.data); // ✅ DEBUG

      const token = res.data?.token;

      // ❌ SAFETY CHECK
      if (!token) {
        console.log("❌ No token received from backend");
        return {
          success: false,
          message: "No token received",
        };
      }

      // ✅ Save token
      await AsyncStorage.setItem("token", token);

      console.log("💾 Token Saved:", token); // ✅ DEBUG

      setUserToken(token);

      return { success: true };

    } catch (err) {
      console.log("❌ Login Error:", err.response?.data || err.message);

      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // 📝 REGISTER
  const register = async (name, email, password) => {
    try {
      const res = await API.post("/users/register", {
        name,
        email,
        password,
      });

      console.log("✅ Register Success:", res.data);

      return { success: true };

    } catch (err) {
      console.log("❌ Register Error:", err.response?.data || err.message);

      return {
        success: false,
        message:
          err.response?.data?.message || "Registration failed",
      };
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");

      console.log("🚪 Logged out, token removed");

      setUserToken(null);
    } catch (err) {
      console.log("❌ Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, register, logout, userToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};