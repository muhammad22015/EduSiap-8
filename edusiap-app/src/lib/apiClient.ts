// lib/apiClient.ts
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './auth';
import { refreshAccessToken } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  let accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  const makeRequest = async (token: string | null) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || 'Request failed');
    }

    return response.json();
  };

  try {
    let response = await makeRequest(accessToken);
    return response;
  } catch (error: any) {
    if (error.message.includes('Unauthorized') && refreshToken) {
      try {
        const refreshResponse = await refreshAccessToken(refreshToken);
        
        if (refreshResponse.status === "Access Token berhasil dibuat") {
          setTokens(refreshResponse.response, refreshToken);
          return await makeRequest(refreshResponse.response);
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        throw new Error('Session expired. Please login again.');
      }
    }
    throw error;
  }
};