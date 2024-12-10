/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from 'mongoose';
const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');
  console.log(MONGODB_URL)

  try {
    cached.promise = 
      cached.promise || 
      mongoose.connect(MONGODB_URL, { 
        dbName: 'genpixel', bufferCommands: false 
      });
    console.log('Connection Promise:', cached.promise);
  
    cached.conn = await cached.promise;
    console.log('Database Connection:', cached.conn);
  } catch (error) {
    console.error('Database Connection Error:', error);
  }
  
  

  return cached.conn;
}