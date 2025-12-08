/**
 * API Client Configuration
 * 
 * This is the base API client that will be used for all API calls.
 * Currently configured to work with local JSON data, but ready for
 * backend integration.
 * 
 * To integrate with a real backend:
 * 1. Set EXPO_PUBLIC_API_URL in your .env file
 * 2. Uncomment the axios implementation
 * 3. Update service methods to use apiClient instead of importing JSON
 */

// Environment configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = 30000; // 30 seconds

/**
 * API Client Interface
 * This defines the contract for API calls
 */
export interface ApiClient {
    get<T>(endpoint: string, config?: RequestConfig): Promise<T>;
    post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T>;
    put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T>;
    delete<T>(endpoint: string, config?: RequestConfig): Promise<T>;
}

export interface RequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, any>;
    timeout?: number;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

/**
 * Mock API Client (Current Implementation)
 * This simulates API calls by returning promises with delays
 */
class MockApiClient implements ApiClient {
    private delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        await this.delay();
        throw new Error('Mock API: Use service methods that import JSON directly');
    }

    async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
        await this.delay();
        throw new Error('Mock API: POST not implemented in mock mode');
    }

    async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
        await this.delay();
        throw new Error('Mock API: PUT not implemented in mock mode');
    }

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        await this.delay();
        throw new Error('Mock API: DELETE not implemented in mock mode');
    }
}

/**
 * Real API Client (Ready for Backend Integration)
 * Uncomment and install axios when ready to integrate with backend
 */
/*
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class RealApiClient implements ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for adding auth tokens
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token from storage
        const token = ''; // Get from AsyncStorage or secure storage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - redirect to login
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(endpoint, config as AxiosRequestConfig);
    return response.data.data;
  }

  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(endpoint, data, config as AxiosRequestConfig);
    return response.data.data;
  }

  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(endpoint, data, config as AxiosRequestConfig);
    return response.data.data;
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(endpoint, config as AxiosRequestConfig);
    return response.data.data;
  }
}
*/

// Export the appropriate client based on environment
// Switch to RealApiClient when backend is ready
export const apiClient: ApiClient = new MockApiClient();

// Helper function to handle API errors
export const handleApiError = (error: any): ApiError => {
    if (error.response) {
        return {
            message: error.response.data?.message || 'An error occurred',
            status: error.response.status,
            code: error.response.data?.code,
        };
    } else if (error.request) {
        return {
            message: 'Network error. Please check your connection.',
        };
    } else {
        return {
            message: error.message || 'An unexpected error occurred',
        };
    }
};
