import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
};

// MySQL Connection (Sequelize)
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'food_delivery_mysql',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || 'password',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Set to true to see SQL queries in console
  }
);

const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected with Sequelize');
    // await sequelize.sync({ force: false }); // Use force: true to drop existing tables
    // console.log('All models were synchronized successfully.');
  } catch (err) {
    console.error('MySQL connection error:', err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
};

const connectDB = async () => {
  await connectMongoDB();
  await connectMySQL();
};

export { sequelize };
export default connectDB;
