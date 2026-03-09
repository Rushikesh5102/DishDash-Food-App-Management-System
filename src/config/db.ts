import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ override: true });

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'food_delivery',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || 'root',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || 3306),
    dialect: 'mysql',
    logging: false,
  }
);

export const connectMySQL = async () => {
  try {
    const host = process.env.MYSQL_HOST || 'localhost';
    const database = process.env.MYSQL_DATABASE || 'food_delivery';
    const user = process.env.MYSQL_USER || 'root';

    console.log(`Attempting to connect to MySQL at ${host}:${process.env.MYSQL_PORT || '3306'}...`);
    console.log(`Database: ${database}`);
    console.log(`User: ${user}`);

    await sequelize.authenticate();
    console.log('MySQL connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
