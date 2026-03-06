# 🍽️ DishDash - Complete Integration Guide

## System Overview

The DishDash Food App Management System is now fully integrated with:
- **Backend**: Express.js + TypeScript (Port 5000)
- **Frontend**: Next.js + React (Port 3000)
- **Database**: MySQL with complete dataset

---

## 📋 Prerequisites

Before running the application, ensure you have:

1. **Node.js & npm** - [Download](https://nodejs.org/)
2. **MySQL Server** - Running and accessible
3. **Database Setup** - `food_delivery` database created with complete data

### Quick Database Setup

If you haven't set up the database yet, run:

```powershell
node setup-database.js
```

This will:
- Create the `food_delivery` database
- Set up all tables (platforms, restaurants, products, platform_listings)
- Populate with sample data

---

## 🚀 Quick Start (Windows)

### Option 1: Start All Services at Once

```powershell
.\start-all.ps1
```

This will automatically open two new PowerShell windows:
- One for the backend server (port 5000)
- One for the frontend server (port 3000)

### Option 2: Start Individually

**Terminal 1 - Start Backend:**
```powershell
.\start-backend.ps1
```

**Terminal 2 - Start Frontend:**
```powershell
.\start-frontend.ps1
```

### Option 3: Manual Startup

**Terminal 1 - Backend:**
```powershell
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

---

## 🚀 Quick Start (macOS/Linux)

### Option 1: Start All Services

```bash
chmod +x start-all.sh
./start-all.sh
```

### Option 2: Start Individually

**Terminal 1 - Backend:**
```bash
chmod +x start-backend.sh
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
chmod +x start-frontend.sh
./start-frontend.sh
```

---

## 🌐 Access the Application

Once both servers are running:

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | User Interface |
| **Backend** | http://localhost:5000 | API Server |
| **API Health** | http://localhost:5000/health | Check backend status |
| **API Base** | http://localhost:5000/api | API endpoints |

---

## 📚 Available API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product
- `GET /api/products/compare/search?product=<name>` - Compare prices

### Platforms
- `GET /api/platforms` - Get all platforms
- `POST /api/platforms/listing` - Add platform listing

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `POST /api/restaurants` - Create restaurant

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user

---

## 📊 Database Structure

The database includes:

### Platforms (5 total)
- Swiggy
- Zomato
- Eatsure
- Maginpin
- Dunzo

### Restaurants (4 total)
- Biryani House
- Burger Point
- Pizza Palace
- Sushi Bar

### Products (4 total)
- Chicken Biryani
- Veg Burger
- Margherita Pizza
- Salmon Sushi Roll

### Platform Listings (20 total)
Price comparisons with discounts, delivery fees, and ratings across all platforms

---

## ⚙️ Configuration Files

### Backend Configuration (.env)

```env
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=food_delivery
JWT_SECRET=your_jwt_secret
FASTAPI_BASE_URL=http://localhost:8000
```

### Frontend Configuration (frontend/.env.local)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_API_TIMEOUT=10000
```

---

## 🔍 Troubleshooting

### Backend won't start
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Check database connection
node test_db_conn.js

# Check environment variables
node check_env.js
```

### Frontend won't start
```powershell
# Clear Next.js cache
rm -r frontend/.next

# Reinstall dependencies
cd frontend
npm install

# Try again
npm run dev
```

### API calls returning 404
- Ensure backend is running on port 5000
- Check frontend `lib/api.ts` for correct endpoints
- Verify CORS configuration in `src/app.ts`

### Database connection issues
```powershell
# Test MySQL connection
node test_db_conn.js

# Rebuild database
node setup-database.js
```

---

## 📝 Key Integration Points

### 1. **Backend → Database**
- Models configured in `src/models/`
- Associations set up in `src/server.ts`
- Database synced automatically on startup

### 2. **Frontend → Backend**
- API configuration in `frontend/lib/api.ts`
- Environment variables in `frontend/.env.local`
- CORS enabled in `src/app.ts`

### 3. **Environment Variables**
- Backend: `.env` file in root
- Frontend: `frontend/.env.local`

---

## 🧪 Testing the Integration

### Test Search Functionality
1. Open http://localhost:3000
2. Click "Compare" button
3. Search for "Chicken Biryani"
4. Should display prices from all 5 platforms

### Test API Directly

```bash
# Using curl (PowerShell)
$uri = "http://localhost:5000/api/products/compare/search?product=Chicken%20Biryani"
Invoke-RestMethod -Uri $uri

# Or using PowerShell Invoke-WebRequest
Invoke-WebRequest -Uri $uri -Method GET
```

---

## 📦 Built With

- **Frontend**: Next.js 15, React 19, TailwindCSS, Framer Motion
- **Backend**: Express.js, TypeScript, Sequelize ORM
- **Database**: MySQL
- **Authentication**: JWT (configured, ready to implement)

---

## 🎯 Next Steps

1. **Build Features**:
   - User authentication
   - Order management
   - Admin dashboard
   - Payment integration

2. **Deploy**:
   - Frontend: Vercel, Netlify
   - Backend: Render, Railway, AWS
   - Database: AWS RDS, DigitalOcean

3. **Monitor**:
   - Set up logging
   - Monitor API performance
   - Track errors

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review logs in the terminal
3. Check API health: http://localhost:5000/health

---

**Happy coding! 🚀**
