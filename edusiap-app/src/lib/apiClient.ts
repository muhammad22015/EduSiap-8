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

    // Check for token expiration specifically
    if (response.status === 401) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.error?.includes('Token Expired') || 
          errorData.error?.includes('Unauthorized')) {
        throw new Error('TokenExpired');
      }
    }

    return response;
  };

  try {
    // First attempt with current access token
    let response = await makeRequest(accessToken);

    // If token expired, try to refresh it
    if (response.status === 401 && refreshToken) {
      const refreshResponse = await refreshAccessToken(refreshToken);
      
      if (refreshResponse.status === "Access Token berhasil dibuat") {
        // Update tokens in storage
        setTokens(refreshResponse.response, refreshToken);
        
        // Retry the original request with new token
        response = await makeRequest(refreshResponse.response);
      } else {
        throw new Error('RefreshFailed');
      }
    }

    // Handle response
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new Error(text || 'Non-JSON response');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'TokenExpired' || error.message === 'RefreshFailed') {
        clearTokens();
        window.location.href = '/login';
      }
    }
    throw error;
  }
};