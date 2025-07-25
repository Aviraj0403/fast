"use client";

import React from "react";
interface LoginData {
  email: string;
  id: string;

  roleType: string;
  userName: string;
}
interface UserAuthContextType {
  loginUser: (data: LoginData) => Promise<void>;
  logoutUser: () => Promise<void>;
  user: LoginData | null;
  setUser: React.Dispatch<React.SetStateAction<LoginData | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  authCheck: () => void;
  userRole: string | null;
}
const UserAuthContext = React.createContext<UserAuthContextType | null>(null);
export default UserAuthContext;
