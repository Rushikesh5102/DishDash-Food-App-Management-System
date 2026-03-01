import dotenv from "dotenv";
dotenv.config();
import app from './app';
import { connectMySQL, sequelize } from './config/db';


const start = async () => {
  try {
    // 1. Connect to Database
    await connectMySQL();
    
    // 2. Setup Associations
    

    // 3. Sync Tables
    await sequelize.sync({ alter: true });
    
    // 4. Start Express
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start:', err);
  }
};

start();