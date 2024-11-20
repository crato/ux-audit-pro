import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('MongoDB URI is not defined in environment variables');
}

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongoose: {
    promise: Promise<typeof import('mongoose')> | null;
    conn: typeof import('mongoose') | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  try {
    if (cached.conn) {
      console.log('Using cached MongoDB connection');
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: true,
      };

      console.log('Creating new MongoDB connection...');
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('New MongoDB connection created successfully');
        return mongoose;
      });
    } else {
      console.log('Using existing MongoDB connection promise');
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    cached.promise = null;
    throw error;
  }
}

// Test the MongoDB URI format
console.log('MongoDB URI format check:', 
  MONGODB_URI.startsWith('mongodb+srv://') ? 'Valid prefix' : 'Invalid prefix');