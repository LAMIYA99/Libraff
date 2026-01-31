"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { User } from "@/types/global";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: any) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("libraff_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        setUser(parsedUser.user || parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("libraff_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: any) => {
    localStorage.setItem("libraff_user", JSON.stringify(userData));
    setUser(userData.user || userData);
  };

  const logout = () => {
    localStorage.removeItem("libraff_user");
    setUser(null);
    router.push("/");
  };

  const isAdmin =
    user?.role === "ADMIN" ||
    user?.isAdmin === true ||
    user?.email === "mervanm@gmail.com";

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
