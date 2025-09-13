import mongoose from 'mongoose';

// Global variable to cache the database connection
let cachedConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log(`📁 MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

export const connectDatabase = async (): Promise<typeof mongoose> => {
    // If we already have a cached connection, return it
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('Using cached database connection');
        return cachedConnection;
    }

    try {
        console.log('Creating new database connection...');
        
        // Configure mongoose for serverless
        mongoose.set('bufferCommands', false);

        const connection = await mongoose.connect(process.env.MONGODB_URI!, {
            serverSelectionTimeoutMS: 5000, // Reduced timeout for Lambda
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            minPoolSize: 1,
            maxIdleTimeMS: 30000,
            bufferCommands: false
        });

        cachedConnection = connection;
        console.log('✅ Database connected successfully');
        return connection;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        throw error;
    }
};

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
    cachedConnection = null;
});

export default connectDB;
