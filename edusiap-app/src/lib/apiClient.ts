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

      return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });
    };

    try {
      let response = await makeRequest(accessToken);

      // If token expired, try to refresh it once
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
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'RefreshFailed' || 
            error.message.includes('Unauthorized') || 
            error.message.includes('Token Expired')) {
          clearTokens();
          window.location.href = '/login';
        }
      }
      throw error;
    }
  };