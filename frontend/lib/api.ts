/**
 * API Configuration and Helper Functions
 * Centralized location for all API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
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
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
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
