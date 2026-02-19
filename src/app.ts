import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/error.middleware';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import platformRoutes from './routes/platform.routes';
import orderRoutes from './routes/order.routes';
import restaurantRoutes from './routes/restaurant.routes';
import redirectionRoutes from './routes/redirection.routes';
import priceComparisonRoutes from './routes/priceComparison.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/redirections', redirectionRoutes);
app.use('/api/price-comparisons', priceComparisonRoutes);

app.use(errorHandler);

export default app; // This allows server.ts to use it