/**
 * API Configuration and Helper Functions
 * Centralized location for all API calls
 */

import { getErrorMessage, readResponseBody } from './http';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  '';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');

export const API_ENDPOINTS = {
  COMPARE_SEARCH: '/api/products/compare/search',
  GET_PRODUCTS: '/api/products',
  GET_PRODUCT: (id: number) => `/api/products/${id}`,
  GET_PLATFORMS: '/api/platforms',
  GET_RESTAURANTS: '/api/restaurants',
  GET_ORDERS: '/api/orders',
};

interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Fetch wrapper with timeout and error handling
 */
export async function apiFetch(
  endpoint: string,
  options: FetchOptions = {}
): Promise<any> {
  const { timeout = API_TIMEOUT, ...fetchOptions } = options;
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    const body = await readResponseBody(response);

    if (!response.ok) {
      // 🚀 MOCK MODE FALLBACK: If we get 404/405 (common on static hosts), return mock data
      if (typeof window !== 'undefined' && (response.status === 404 || response.status === 405)) {
        console.warn(`[MockMode] Falling back to mock data for: ${endpoint}`);
        return getMockResponse(endpoint);
      }
      throw new Error(getErrorMessage(body, response.status));
    }
    if (response.status === 204) {
      return null;
    }
    return body;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    // 🚀 MOCK MODE FALLBACK: If network fails entirely
    if (typeof window !== 'undefined') {
      console.warn(`[MockMode] Network error, falling back to mock data for: ${endpoint}`);
      return getMockResponse(endpoint);
    }
    throw error;
  }
}

/**
 * 🛠️ Mock Data for GitHub Pages Preview
 */
function getMockResponse(endpoint: string) {
  const path = endpoint.split('?')[0];

  const MOCK_DATA: Record<string, any> = {
    '/api/products/compare/search': {
      results: [
        {
          id: 1,
          name: 'Classic Burger',
          category: 'Burgers',
          image: '/burger.png',
          listings: [
            { platform: 'Swiggy', price: 120, eta: '20 mins', deliveryFee: 20, discount: 10 },
            { platform: 'Zomato', price: 130, eta: '25 mins', deliveryFee: 15, discount: 5 },
            { platform: 'Uber Eats', price: 140, eta: '15 mins', deliveryFee: 30, discount: 20 },
          ],
        },
        {
          id: 2,
          name: 'Margherita Pizza',
          category: 'Pizza',
          image: '/pizza.png',
          listings: [
            { platform: 'Swiggy', price: 250, eta: '35 mins', deliveryFee: 30, discount: 50 },
            { platform: 'Dominoes', price: 240, eta: '30 mins', deliveryFee: 0, discount: 0 },
          ],
        },
      ],
      fastest: { platform: 'Uber Eats', eta: '15 mins' },
      cheapest: { platform: 'Swiggy', netPrice: 130 },
    },
    '/api/orders': {
      orders: [
        { id: 'ORD001', date: '2024-03-10', status: 'Delivered', total: 350, items: 2 },
        { id: 'ORD002', date: '2024-03-09', status: 'Confirmed', total: 120, items: 1 },
      ],
    },
    '/api/platforms': [
      { id: 1, name: 'Swiggy', icon: '🚴' },
      { id: 2, name: 'Zomato', icon: '🛵' },
      { id: 3, name: 'Uber Eats', icon: '🚗' },
    ],
    '/api/analytics/user/stats': {
      totalOrders: 15,
      totalSpent: 4500,
      totalSavings: 850,
      favoritePlatform: 'Swiggy',
    },
  };

  return MOCK_DATA[path] || (path.startsWith('/api/products') ? MOCK_DATA['/api/products'] : null);
}

/**
 * Search for a product and compare prices across platforms
 */
export async function searchAndCompareProduct(product: string): Promise<any> {
  return apiFetch(`${API_ENDPOINTS.COMPARE_SEARCH}?product=${encodeURIComponent(product)}`);
}

/**
 * Get all products
 */
export async function getProducts(): Promise<any> {
  return apiFetch(API_ENDPOINTS.GET_PRODUCTS);
}

/**
 * Get a specific product by ID
 */
export async function getProduct(id: number): Promise<any> {
  return apiFetch(API_ENDPOINTS.GET_PRODUCT(id));
}

/**
 * Get all platforms
 */
export async function getPlatforms(): Promise<any> {
  return apiFetch(API_ENDPOINTS.GET_PLATFORMS);
}

/**
 * Get all restaurants
 */
export async function getRestaurants(): Promise<any> {
  return apiFetch(API_ENDPOINTS.GET_RESTAURANTS);
}

/**
 * Get all orders
 */
export async function getOrders(): Promise<any> {
  return apiFetch(API_ENDPOINTS.GET_ORDERS);
}
