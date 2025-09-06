# KAppTech CMS Development Guide

## Getting Started

### Prerequisites
- Node.js v16 or higher
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone and Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Or install all at once
   npm run install-all
   ```

2. **Set Up Environment Variables**
   
   **Backend (.env)**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```
   
   **Frontend (.env)**
   ```bash
   cd frontend
   # Create .env file with:
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in backend/.env
   ```

4. **Run the Application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend && npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - API Health Check: http://localhost:5000/api/health

## Development Workflow

### Backend Development

**File Structure:**
```
backend/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth, validation, etc.
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   └── server.js       # Express server
├── .env               # Environment variables
└── package.json       # Dependencies
```

**Key Models:**
- User (authentication & roles)
- Page (static pages)
- Post (blog posts)
- CaseStudy (portfolio items)
- TeamMember
- Testimonial

**API Endpoints:**
- `/api/auth/*` - Authentication
- `/api/users/*` - User management
- `/api/pages/*` - Page management
- `/api/posts/*` - Blog posts
- `/api/case-studies/*` - Portfolio
- `/api/contact` - Contact form
- `/api/media/*` - File uploads

### Frontend Development

**File Structure:**
```
frontend/src/
├── components/
│   ├── common/         # Reusable components
│   └── layout/         # Layout components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript types
├── utils/              # Helper functions
└── App.tsx             # Main app component
```

**Key Features:**
- React Router for navigation
- TailwindCSS for styling
- Framer Motion for animations
- React Query for data fetching
- Context API for state management

## User Roles & Permissions

- **Admin**: Full access to all features
- **Editor**: Manage content (pages, posts, case studies)
- **Author**: Create and edit own posts
- **Viewer**: Read-only access

## Content Management

### Pages
Static pages like Home, About, Services, etc.
- Rich text editor
- SEO meta fields
- Featured images
- Publishing workflow

### Blog Posts
Dynamic blog content
- Categories and tags
- Featured posts
- Reading time calculation
- SEO optimization

### Case Studies
Portfolio showcases
- Client information
- Project details
- Technologies used
- Images and screenshots
- Testimonials

## API Documentation

### Authentication
```javascript
// Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}

// Get current user
GET /api/auth/me
Authorization: Bearer <token>
```

### Content Management
```javascript
// Get published pages
GET /api/pages

// Create new page (auth required)
POST /api/pages
Authorization: Bearer <token>
{
  "title": "Page Title",
  "content": "Page content...",
  "status": "published"
}
```

## Deployment

### Backend Deployment
1. Set production environment variables
2. Build application: `npm run build`
3. Deploy to platform (Heroku, Railway, etc.)
4. Ensure MongoDB connection

### Frontend Deployment
1. Build production assets: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Set environment variables for API URL

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string in .env
- Verify database permissions

**CORS Errors:**
- Verify FRONTEND_URL in backend .env
- Check API_URL in frontend .env

**Authentication Issues:**
- Verify JWT_SECRET is set
- Check token expiration
- Ensure proper Authorization header

**Build Errors:**
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify all dependencies are installed

## Support

For questions and support:
- Create an issue on GitHub
- Contact: admin@kapptech.com
