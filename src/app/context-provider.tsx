"use client"

import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: number;
    email: string;
    name: string;
    createdAt: string;
}   

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUser() {
          try {
            const res = await fetch("/api/auth/me", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });
    
            if (res.ok) {
              const data = await res.json();
              setUser(data.user);
            }
          } catch (error) {
            console.error("Failed to fetch user", error);
          }
        }
    
        fetchUser();
      }, []);
    
    function logout() {
        fetch("/api/auth/logout", { method: "POST", credentials: "include" }).then(() => {
          setUser(null);
        });
      }

    return <AuthContext.Provider value={{ user, setUser, logout }}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
  }