import { promises } from "dns";
import mongoose, { Mongoose } from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined !!");
    }

    cached.promise = cached.promise || mongoose.connect(MONGO_URI, { dbName: "genpixel", bufferCommands: false })

    cached.conn = await cached.promise;
    return cached.conn;
}