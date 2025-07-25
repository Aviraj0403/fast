"use client";

import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utlis/axiosConfig/AxiosInstance";
import UserAuthContext from "./userAuthContext";
interface LoginData {
  email: string;
  id: string;

  roleType: string;
  userName: string;
}
import { ReactNode } from "react";

interface UserAuthContextProviderProps {
  children: ReactNode;
}

const UserAuthContextProvider: React.FC<UserAuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<LoginData | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function authCheck() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("auth/me");
      console.log(response, "res here----");
      setUser(response.data.data);
      setUserRole(response.data.data.roleType);
      if (response.data.data) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function loginUser(data: LoginData) {
    setUser(data);
    setUserRole(data.roleType);
    setIsAuthenticated(true);
  }
  async function logoutUser() {
    console.log("logout");
    await axiosInstance.post("/auth/logout");
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    window.location.href = "/signin";
  }

  useEffect(() => {
    authCheck();
  }, []);
  return (
    <UserAuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        authCheck,
        userRole,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
