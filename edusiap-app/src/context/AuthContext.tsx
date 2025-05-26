// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/lib/auth';
import { refreshAccessToken } from '@/lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null); // Initialize with null

  const scheduleTokenRefresh = () => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const expiresAt = payload.exp * 1000;
      const now = Date.now();
      const expiresIn = expiresAt - now;

      // Refresh token 1 minute before expiration
      const refreshTime = Math.max(0, expiresIn - 60000);

      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
      refreshTimerRef.current = setTimeout(() => {
        refreshToken();
      }, refreshTime);
    } catch (error) {
      console.error('Error scheduling token refresh:', error);
    }
  };

  const refreshToken = async () => {
    const refreshTokenValue = getRefreshToken();
    if (!refreshTokenValue) {
      logout();
      return;
    }

    try {
      const response = await refreshAccessToken(refreshTokenValue);
      if (response.status === "Access Token berhasil dibuat") {
        setTokens(response.response, refreshTokenValue);
        scheduleTokenRefresh();
      } else {
        logout();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const login = (accessToken: string, refreshToken: string) => {
    setTokens(accessToken, refreshToken);
    setIsAuthenticated(true);
    scheduleTokenRefresh();
  };

  const logout = () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    clearTokens();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = getAccessToken();
    setIsAuthenticated(!!token);
    if (token) {
      scheduleTokenRefresh();
    }

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};