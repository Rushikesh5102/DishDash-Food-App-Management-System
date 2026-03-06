import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/error.middleware';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import platformRoutes from './routes/platform.routes';
import orderRoutes from './routes/order.routes';
import restaurantRoutes from './routes/restaurant.routes';
import authRoutes from './routes/auth.routes';
import favoriteRoutes from './routes/favorite.routes';
import ratingRoutes from './routes/rating.routes';
import notificationRoutes from './routes/notification.routes';

const app = express();

// ✅ CORS Configuration - Allow frontend to communicate with backend
const corsOptions = {
  origin: [
    'http://localhost:3000',      // Next.js frontend default
    'http://localhost:3001',      // Alternative frontend port
    'http://127.0.0.1:3000',      // Localhost variant
    'http://127.0.0.1:3001',      // Localhost variant
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ✅ Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/notifications', notificationRoutes);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Error handling middleware
app.use(errorHandler);

export default app;