# 🚀 DishDash Advanced Features - Complete API Documentation

## Overview
Complete implementation of user authentication, order history, favorites, ratings, and notifications systems with enhanced price comparison organized by restaurant and platform.

---

## 🔐 Authentication APIs

### 1. User Signup
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210",
  "address": "123 Main St",
  "city": "Pune",
  "pincode": "411001"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "city": "Pune",
    "isActive": true,
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

---

### 2. User Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastLogin": "2024-01-01T12:00:00Z"
  }
}
```

---

### 3. Get Current User
**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "profileImage": "https://..."
  }
}
```

---

### 4. Update User Profile
**Endpoint:** `PUT /api/auth/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "firstName": "Jonathan",
  "phone": "9876543210",
  "address": "456 New St",
  "profileImage": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

### 5. Logout
**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## ❤️ Favorites APIs

### 1. Add to Favorites
**Endpoint:** `POST /api/favorites`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productId": 1,
  "platformId": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Added to favorites",
  "favorite": {
    "id": 5,
    "userId": 1,
    "productId": 1,
    "platformId": 2,
    "savedPrice": 250,
    "savedDeliveryFee": 40,
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

---

### 2. Get User's Favorites
**Endpoint:** `GET /api/favorites`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "favorites": [
    {
      "id": 1,
      "userId": 1,
      "productId": 1,
      "platformId": 2,
      "savedPrice": 250,
      "savedDeliveryFee": 40,
      "Product": {
        "id": 1,
        "name": "Chicken Biryani",
        "imageUrl": "https://..."
      },
      "Platform": {
        "id": 2,
        "name": "Zomato",
        "logoUrl": "https://..."
      },
      "createdAt": "2024-01-01T10:00:00Z"
    }
  ]
}
```

---

### 3. Check if Favorited
**Endpoint:** `GET /api/favorites/check?productId=1&platformId=2`

**Response:**
```json
{
  "success": true,
  "isFavorited": true,
  "favorite": { ... }
}
```

---

### 4. Remove from Favorites
**Endpoint:** `DELETE /api/favorites/{favoriteId}`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Removed from favorites"
}
```

---

## 📦 Order History APIs

### 1. Create Order
**Endpoint:** `POST /api/orders`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productId": 1,
  "platformId": 2,
  "restaurantId": 1,
  "platformName": "Zomato",
  "restaurantName": "Biryani House",
  "productName": "Chicken Biryani",
  "price": 250,
  "deliveryFee": 40,
  "totalPrice": 290,
  "discount": 30,
  "notes": "Extra spicy"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "id": 10,
    "userId": 1,
    "productId": 1,
    "platformId": 2,
    "status": "confirmed",
    "totalPrice": 290,
    "orderDate": "2024-01-01T10:00:00Z"
  }
}
```

---

### 2. Get User's Order History
**Endpoint:** `GET /api/orders/user/history?status=delivered&limit=10&offset=0`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "orders": [
    {
      "id": 10,
      "userId": 1,
      "productId": 1,
      "platformId": 2,
      "status": "delivered",
      "totalPrice": 290,
      "orderDate": "2024-01-01T10:00:00Z",
      "deliveryDate": "2024-01-01T12:30:00Z",
      "Product": {
        "name": "Chicken Biryani",
        "imageUrl": "https://..."
      },
      "Platform": {
        "name": "Zomato",
        "logoUrl": "https://..."
      }
    }
  ]
}
```

---

### 3. Get Order Statistics
**Endpoint:** `GET /api/orders/user/stats`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalOrders": 15,
    "totalSpent": 4350,
    "totalSaved": 450,
    "byStatus": [
      {
        "status": "delivered",
        "count": 14,
        "totalSpent": 4200,
        "avgDiscount": 30
      },
      {
        "status": "pending",
        "count": 1,
        "totalSpent": 150,
        "avgDiscount": 10
      }
    ]
  }
}
```

---

## ⭐ Rating APIs

### 1. Create Rating
**Endpoint:** `POST /api/ratings`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "orderId": 10,
  "productId": 1,
  "platformId": 2,
  "restaurantId": 1,
  "ratingType": "product",
  "rating": 4,
  "review": "Great biryani! Arrived hot and fresh."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Rating created successfully",
  "rating": {
    "id": 5,
    "userId": 1,
    "rating": 4,
    "review": "Great biryani! Arrived hot and fresh.",
    "createdAt": "2024-01-01T13:00:00Z",
    "helpful": 0
  }
}
```

---

### 2. Get Ratings for Entity
**Endpoint:** `GET /api/ratings?type=product&id=1`

**Query Parameters:**
- `type`: 'product', 'platform', 'restaurant', 'delivery'
- `id`: Entity ID

**Response:**
```json
{
  "success": true,
  "count": 12,
  "averageRating": 4.3,
  "ratings": [
    {
      "id": 5,
      "userId": 1,
      "rating": 4,
      "review": "Great biryani! Arrived hot and fresh.",
      "helpful": 3,
      "createdAt": "2024-01-01T13:00:00Z"
    }
  ]
}
```

---

### 3. Get User's Ratings
**Endpoint:** `GET /api/ratings/user/my-ratings`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "ratings": [ ... ]
}
```

---

### 4. Mark Rating as Helpful
**Endpoint:** `POST /api/ratings/{ratingId}/helpful`

**Response:**
```json
{
  "success": true,
  "message": "Marked as helpful",
  "rating": {
    "helpful": 4
  }
}
```

---

### 5. Delete Rating
**Endpoint:** `DELETE /api/ratings/{ratingId}`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Rating deleted successfully"
}
```

---

## 🔔 Notification APIs

### 1. Get Notifications
**Endpoint:** `GET /api/notifications?unreadOnly=false&limit=20&offset=0`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `unreadOnly`: boolean (optional, default: false)
- `limit`: number (optional, default: 20)
- `offset`: number (optional, default: 0)

**Response:**
```json
{
  "success": true,
  "count": 15,
  "unreadCount": 3,
  "notifications": [
    {
      "id": 1,
      "userId": 1,
      "title": "Order Delivered",
      "message": "Your order has been successfully delivered!",
      "notificationType": "order",
      "isRead": false,
      "icon": "✓",
      "actionUrl": "/orders",
      "createdAt": "2024-01-01T12:30:00Z"
    }
  ]
}
```

---

### 2. Mark as Read
**Endpoint:** `PUT /api/notifications/{notificationId}/read`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read",
  "notification": {
    "id": 1,
    "isRead": true,
    "readAt": "2024-01-01T14:00:00Z"
  }
}
```

---

### 3. Mark All as Read
**Endpoint:** `PUT /api/notifications/read/all`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

### 4. Get Unread Count
**Endpoint:** `GET /api/notifications/unread/count`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "unreadCount": 3
}
```

---

### 5. Delete Notification
**Endpoint:** `DELETE /api/notifications/{notificationId}`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## 🔍 Enhanced Price Comparison APIs

### 1. Compare Product by Name (with Restaurant Info)
**Endpoint:** `GET /api/products/compare/search?product=Biryani`

**Response:**
```json
{
  "product": "Chicken Biryani",
  "restaurant": {
    "id": 1,
    "name": "Biryani House",
    "cuisineType": "Indian",
    "location": "Downtown Pune"
  },
  "comparisons": [
    {
      "productName": "Chicken Biryani",
      "restaurantName": "Biryani House",
      "restaurantCuisine": "Indian",
      "platform": "Zomato",
      "platformLogo": "https://...",
      "basePrice": 250,
      "deliveryFee": 40,
      "discount": 30,
      "finalPrice": 260,
      "etaMinutes": 30,
      "rating": 4.5
    },
    {
      "platform": "Swiggy",
      "basePrice": 260,
      "deliveryFee": 35,
      "discount": 25,
      "finalPrice": 270,
      "etaMinutes": 25
    }
  ],
  "cheapest": {
    "platform": "Zomato",
    "finalPrice": 260
  },
  "fastestDelivery": {
    "platform": "Swiggy",
    "etaMinutes": 25
  }
}
```

---

### 2. Compare All Products by Restaurant
**Endpoint:** `GET /api/products/restaurant/{restaurantId}/compare`

**Response:**
```json
{
  "restaurant": {
    "id": 1,
    "name": "Biryani House",
    "cuisineType": "Indian",
    "location": "Downtown Pune"
  },
  "productCount": 4,
  "comparisonCount": 20,
  "comparisons": [
    {
      "productId": 1,
      "productName": "Chicken Biryani",
      "productImage": "https://...",
      "platform": "Zomato",
      "basePrice": 250,
      "finalPrice": 260,
      "etaMinutes": 30,
      "rating": 4.5
    },
    {
      "productId": 1,
      "productName": "Chicken Biryani",
      "platform": "Swiggy",
      "basePrice": 260,
      "finalPrice": 270,
      "etaMinutes": 25,
      "rating": 4.3
    }
  ]
}
```

---

## 📊 Database Schema

### Users Table
```sql
- id (INT, PK)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- firstName, lastName
- phone, address, city, pincode
- profileImage
- isActive
- lastLogin
- timestamps
```

### Orders Table
```sql
- id (INT, PK)
- userId (INT, FK)
- productId, platformId, restaurantId
- platformName, restaurantName, productName
- price, deliveryFee, totalPrice, discount
- status (pending, confirmed, delivered, cancelled)
- orderDate, deliveryDate
- timestamps
```

### Favorites Table
```sql
- id (INT, PK)
- userId, productId, platformId (all FK)
- savedPrice, savedDeliveryFee
- timestamps
```

### Ratings Table
```sql
- id (INT, PK)
- userId, orderId, productId, platformId, restaurantId (FK)
- ratingType (product, platform, restaurant, delivery)
- rating (1-5)
- review (TEXT)
- helpful (INT)
- timestamps
```

### Notifications Table
```sql
- id (INT, PK)
- userId, orderId (FK)
- title, message
- notificationType
- isRead
- actionUrl, icon
- createdAt, readAt
```

---

## 🔒 Authentication

All protected endpoints require JWT token in the `Authorization` header:

```
Authorization: Bearer {your_token_here}
```

Tokens expire in **7 days**.

---

## 📝 Features Summary

✅ **User Authentication**
- Signup with profile information
- Login with email/password
- Password hashing with bcryptjs
- JWT token-based authentication
- Profile updates
- Logout

✅ **Order History**
- Create and track orders
- View order history with filters
- Order statistics (total spent, saved, etc.)
- Update order status
- Order details with related products/platforms

✅ **Favorites/Wishlist**
- Save favorite products on specific platforms
- View all favorites
- Quick access to saved prices
- Remove from favorites
- Check if product is favorited

✅ **Rating System**
- Rate products, platforms, restaurants, and delivery
- Leave reviews with ratings
- View ratings for any entity
- Mark ratings as helpful
- View user's own ratings

✅ **Notifications**
- Order notifications
- Promotional notifications
- Review reminders
- Mark as read/unread
- Delete notifications
- Get unread count

✅ **Enhanced Price Comparison**
- Compare by product name with restaurant info
- Compare all products of a restaurant
- Shows cheapest option
- Shows fastest delivery option
- Organized by platform
- Complete pricing breakdown

---

## 🚀 Testing the APIs

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Favorites (with token):**
```bash
curl http://localhost:5000/api/favorites \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## ✨ Next Steps

1. **Test All APIs** - Verify each endpoint works correctly
2. **Create Frontend Pages** - Build UI for login, order history, favorites, etc.
3. **UI Integration** - Connect frontend forms to backend APIs
4. **Real-time Notifications** - Implement WebSocket for live notifications
5. **Payment Integration** - Add payment processing for orders
6. **Email Notifications** - Send emails for order updates
7. **Admin Dashboard** - Create admin panel for managing users and orders

---

**Last Updated:** March 6, 2026  
**Version:** 2.0.0 (With Advanced Features)
