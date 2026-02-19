import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ override: true });

// Exporting the sequelize instance
export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'food_delivery',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || 'ppk40313',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

// Exporting the connection function
export const connectMySQL = async () => {
  try {
    console.log(`Attempting to connect to MySQL at ${process.env.MYSQL_HOST || 'localhost'}...`);
    console.log(`Database: ${process.env.MYSQL_DATABASE || 'food_delivery'}`);
    console.log(`User: ${process.env.MYSQL_USER || 'root'}`);
    await sequelize.authenticate();
    console.log('✅ MySQL Connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};