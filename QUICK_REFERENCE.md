# 🚀 DishDash - Quick Reference Card

## Start Here
```powershell
# Windows - Start Everything
.\start-all.ps1

# Or manually start both:
# Terminal 1:
.\start-backend.ps1

# Terminal 2:  
.\start-frontend.ps1
```

---

## Access Points
| URL | What | Port |
|-----|------|------|
| http://localhost:3000 | Frontend | 3000 |
| http://localhost:5000 | Backend | 5000 |
| http://localhost:5000/health | API Health | 5000 |

---

## API Quick Reference

### Search Products & Compare
```bash
GET http://localhost:5000/api/products/compare/search?product=Chicken%20Biryani
```

### Get All Products
```bash
GET http://localhost:5000/api/products
```

### Get Single Product
```bash
GET http://localhost:5000/api/products/1
```

### Get All Platforms
```bash
GET http://localhost:5000/api/platforms
```

### Get All Restaurants
```bash
GET http://localhost:5000/api/restaurants
```

---

## Frontend API Usage
```typescript
import { searchAndCompareProduct, getProducts } from '@/lib/api';

// Search and compare
const results = await searchAndCompareProduct('Chicken Biryani');

// Get all products
const products = await getProducts();
```

---

## Database Info
**Database:** food_delivery
**Host:** localhost
**User:** root
**Password:** root

**Tables:**
- platforms (5) - Delivery apps
- restaurants (4) - Food vendors
- products (4) - Menu items
- platform_listings (20) - Price listings on each platform
- users (ready) - User accounts
- orders (ready) - Orders

---

## File Locations

### Backend
- Entry: `src/server.ts`
- Config: `src/app.ts`
- Models: `src/models/`
- Routes: `src/routes/`
- Controllers: `src/controllers/`

### Frontend
- Home: `frontend/app/page.tsx`
- Search: `frontend/app/orders/page.tsx`
- API: `frontend/lib/api.ts`
- Config: `frontend/.env.local`

### Database
- All SQL: `database/` folder
- Setup: `setup-database.js`

---

## Common Tasks

### Reset Database
```powershell
node setup-database.js
```

### Check Database Connection
```powershell
node test_db_conn.js
```

### Check Environment
```powershell
node check_env.js
```

### Build Backend
```powershell
npm run build
```

### Dev Mode
```powershell
npm run dev
```

---

## Project Structure
```
src/
├── server.ts          ← Start here (backend)
├── app.ts             ← Express config
├── config/db.ts       ← Database connection
├── models/            ← Data structures
├── controllers/       ← Business logic
├── routes/            ← API endpoints
└── middleware/        ← Auth, errors, validation

frontend/
├── app/               ← Pages
├── components/        ← React components
├── lib/api.ts         ← API helpers
├── .env.local         ← Environment config
└── next.config.ts     ← Next.js config

database/
├── complete_setup.sql ← Full DB schema
├── schema.sql         ← Table definitions
└── sample_data.sql    ← Initial data
```

---

## Available Data

**Platforms:** Swiggy, Zomato, Eatsure, Maginpin, Dunzo

**Restaurants:** 
- Biryani House
- Burger Point
- Pizza Palace
- Sushi Bar

**Products:**
- Chicken Biryani
- Veg Burger
- Margherita Pizza
- Salmon Sushi Roll

---

## Port Usage
| Service | Port | Status |
|---------|------|--------|
| Frontend | 3000 | ✅ |
| Backend | 5000 | ✅ |
| MySQL | 3306 | ✅ |

---

## Environment Variables

### Backend (.env)
```
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=food_delivery
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_API_TIMEOUT=10000
```

---

## Documentation Files
- `INTEGRATION_GUIDE.md` - Complete setup guide
- `INTEGRATION_CHECKLIST.md` - Status & features
- `INTEGRATION_SUMMARY.md` - Detailed overview
- `QUICK_REFERENCE.md` - This file!

---

## Troubleshooting

**Backend won't start?**
```powershell
node test_db_conn.js
```

**Frontend won't start?**
```powershell
rm frontend/.next -r
cd frontend && npm install
npm run dev
```

**API not responding?**
- Check backend running: `http://localhost:5000/health`
- Check CORS settings in `src/app.ts`
- Check frontend API url in `frontend/.env.local`

---

## Test the Integration

1. Open http://localhost:3000
2. Click "Compare" button
3. Search "Chicken Biryani"
4. See prices from all 5 platforms ✅

---

## Next Steps

1. ✅ System is integrated
2. 🔐 Add authentication
3. 🛒 Build order management
4. 📊 Create admin dashboard
5. 🚀 Deploy to production

---

**Happy coding! 🚀**
