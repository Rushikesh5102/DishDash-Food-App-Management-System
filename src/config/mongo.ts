import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;

export const connectMongo = async (): Promise<void> => {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set');
  }

  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME || undefined,
  });

  isConnected = true;
  console.log('MongoDB connected');
};

