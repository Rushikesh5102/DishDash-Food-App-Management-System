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

/* ==========================================================================
   🛠️ MOCK MODE INTERCEPTOR
   Intercepts client-side fetch requests to fallback to mock data on network
   errors or 404/405 statuses. Makes the preview site fully interactive.
   ========================================================================== */

function createMockResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function getMockResponse(url: string, init?: RequestInit): Promise<Response> {
  const path = url.split('?')[0];
  let urlObj;
  try {
    urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : undefined);
  } catch (e) {
    urlObj = { searchParams: new URLSearchParams() };
  }
  const queryParams = urlObj.searchParams;

  if (path.endsWith('/api/auth/me')) {
    const authHeader = init?.headers ? (init.headers as any)['Authorization'] : '';
    if (authHeader && authHeader.includes('mock-jwt-token-for-preview')) {
      return createMockResponse({
        user: {
          id: 999,
          email: 'user@example.com',
          firstName: 'Demo',
          lastName: 'User',
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      });
    }
    return createMockResponse({ message: 'Unauthorized' }, 401);
  }

  if (path.endsWith('/api/auth/login')) {
    let email = 'user@example.com';
    try {
      if (init?.body) {
        const bodyObj = JSON.parse(init.body as string);
        email = bodyObj.email || email;
      }
    } catch (e) {}

    return createMockResponse({
      token: 'mock-jwt-token-for-preview',
      user: {
        id: 999,
        email: email,
        firstName: 'Demo',
        lastName: 'User',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    });
  }

  if (path.endsWith('/api/auth/signup')) {
    return createMockResponse({
      token: 'mock-jwt-token-for-preview',
      user: {
        id: 999,
        email: 'user@example.com',
        firstName: 'Demo',
        lastName: 'User',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    });
  }

  if (path.endsWith('/api/auth/logout')) {
    return createMockResponse({ success: true });
  }

  if (path.endsWith('/api/products/compare/search')) {
    const product = queryParams.get('product') || 'Chicken Biryani';
    return createMockResponse({
      product: product,
      restaurant: {
        id: 1,
        name: 'Biryani House',
        cuisine: 'Indian',
        address: '123 Spice Street',
      },
      comparisons: [
        {
          platform: 'Swiggy',
          basePrice: 250,
          deliveryFee: 35,
          discount: 50,
          finalPrice: 235,
          etaMinutes: 25,
          rating: 4.2,
          redirectUrl: 'https://swiggy.com',
        },
        {
          platform: 'Zomato',
          basePrice: 260,
          deliveryFee: 20,
          discount: 40,
          finalPrice: 240,
          etaMinutes: 30,
          rating: 4.5,
          redirectUrl: 'https://zomato.com',
        },
        {
          platform: 'Eatsure',
          basePrice: 240,
          deliveryFee: 0,
          discount: 20,
          finalPrice: 220,
          etaMinutes: 35,
          rating: 4.0,
          redirectUrl: 'https://eatsure.com',
        },
      ],
    });
  }

  if (path.endsWith('/api/orders/user/stats')) {
    return createMockResponse({
      stats: {
        totalSpent: 3450,
        totalSaved: 680,
        totalOrders: 12,
        byStatus: {
          delivered: 10,
          pending: 1,
          confirmed: 1,
        },
      },
    });
  }

  if (path.endsWith('/api/orders/user/history')) {
    return createMockResponse({
      orders: [
        {
          id: 101,
          productId: 1,
          platformId: 1,
          restaurantId: 1,
          price: 250,
          deliveryFee: 30,
          totalPrice: 230,
          discount: 50,
          status: 'delivered',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 102,
          productId: 2,
          platformId: 2,
          restaurantId: 2,
          price: 180,
          deliveryFee: 20,
          totalPrice: 160,
          discount: 40,
          status: 'confirmed',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 103,
          productId: 3,
          platformId: 1,
          restaurantId: 3,
          price: 320,
          deliveryFee: 40,
          totalPrice: 310,
          discount: 50,
          status: 'pending',
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        },
      ],
    });
  }

  if (path.endsWith('/api/products')) {
    return createMockResponse([
      { id: 1, name: 'Chicken Biryani', category: 'Indian', imageUrl: '' },
      { id: 2, name: 'Veg Burger', category: 'Burgers', imageUrl: '' },
      { id: 3, name: 'Margherita Pizza', category: 'Pizza', imageUrl: '' },
    ]);
  }

  if (path.endsWith('/api/platforms')) {
    return createMockResponse([
      { id: 1, name: 'Swiggy', logoUrl: '' },
      { id: 2, name: 'Zomato', logoUrl: '' },
      { id: 3, name: 'Eatsure', logoUrl: '' },
    ]);
  }

  if (path.endsWith('/api/restaurants')) {
    return createMockResponse([
      { id: 1, name: 'Biryani House', cuisineType: 'Indian' },
      { id: 2, name: 'Burger Point', cuisineType: 'Burgers' },
      { id: 3, name: 'Pizza Palace', cuisineType: 'Pizza' },
    ]);
  }

  return createMockResponse({ message: 'Endpoint mock not found' }, 404);
}

if (typeof window !== 'undefined' && !(window as any).__fetchIntercepted__) {
  (window as any).__fetchIntercepted__ = true;
  const originalFetch = window.fetch;
  window.fetch = async function (input, init) {
    const urlString = typeof input === 'string' ? input : (input as Request).url || '';

    if (urlString.includes('/api/')) {
      try {
        const response = await originalFetch(input, init);
        if (!response.ok && (response.status === 404 || response.status === 405 || response.status === 500)) {
          console.warn(`[MockMode] Server error/404 on ${urlString}, falling back to mock.`);
          return getMockResponse(urlString, init);
        }
        return response;
      } catch (error) {
        console.warn(`[MockMode] Network connection failed on ${urlString}, falling back to mock.`);
        return getMockResponse(urlString, init);
      }
    }

    return originalFetch(input, init);
  };
}
