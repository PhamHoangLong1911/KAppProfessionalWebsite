import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './src/config/database';
import authRoutes from './src/routes/auth';
import userRoutes from './src/routes/users';
import pageRoutes from './src/routes/pages';
import postRoutes from './src/routes/posts';
import caseStudyRoutes from './src/routes/caseStudies';
import teamRoutes from './src/routes/team';
import testimonialRoutes from './src/routes/testimonials';
import contactRoutes from './src/routes/contact';
import mediaRoutes from './src/routes/media';
import { errorHandler } from './src/middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();

// Connect to database on cold start
let isConnected = false;

const ensureDbConnection = async () => {
    if (!isConnected) {
        try {
            await connectDatabase();
            isConnected = true;
            console.log('✅ Database connected for Lambda');
        } catch (error) {
            console.error('❌ Database connection failed:', error);
            throw error;
        }
    }
};

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'KAppTech CMS API is running on AWS Lambda!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        version: '1.0.0'
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'KAppTech CMS API',
        database: isConnected ? 'connected' : 'disconnected'
    });
});

// Middleware to ensure database connection before handling requests
app.use(async (req, res, next) => {
    try {
        await ensureDbConnection();
        next();
    } catch (error) {
        console.error('Database connection middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Database connection failed'
        });
    }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/media', mediaRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        availableRoutes: [
            'GET /',
            'GET /health',
            'POST /api/auth/login',
            'POST /api/auth/register',
            'GET /api/users',
            'GET /api/pages',
            'GET /api/posts'
        ]
    });
});

// Export the serverless handler
export const handler = serverless(app);
