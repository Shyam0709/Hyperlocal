## **Hyperlocal - Services hiring platform**

A full-stack services booking application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a customer frontend, admin dashboard, and robust backend API.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)

## **Features**

### **Customer Frontend**
-  Services browsing and search
-  Services management
-  user registration with otp verification
-  User authentication (login with jwt authentication)
-  Responsive design for all devices
-  Advanced services filtering
-  Email notifications

### **Admin Dashboard**
- Services Management (Add/Edit/Delete)
- Booking Management and tracking
- User Management

### **Backend API**
-  JWT-based authentication
-  Secure password hashing with bcrypt
-  Cloud image storage (Cloudinary)
-  MongoDB database integration
-  RESTful API endpoints
-  Cart management
-  Payment integration (Stripe)

## Tech Stack

### Frontend 
- **React.js** 18.3.1 - UI Library
- **Vite** 5.4.1 - Build Tool
- **Tailwind CSS** 3.4+ - Styling
- **React Router DOM** 6.26+ - Navigation
- **Axios** 1.7+ - HTTP Client
- **React Toastify** 10.0+ - Notifications

### Backend
- **Node.js** - Runtime Environment
- **Express.js** 4.21+ - Web Framework
- **MongoDB** - Database
- **Mongoose** 8.6+ - ODM
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Multer** - File Upload
- **Cloudinary** - Image Storage
- **Stripe** - Payment Gateway

##  Project Structure

```
Hyperlocal/
├── frontend/          
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Pages section
│   │   ├── utils/         # api linking                 
│   │   ├── context/       # React Context
│   │   └── assets/        # Images & static files
│   └── package.json
├── backend/           
│   ├── controllers/       # Route handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
|   ├── server.js          # Backend server file
│   └── package.json
└── README.md
```

##  Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Cloudinary account
- Stripe account (for payments)

### 1. Clone Repository
```bash
git clone https://github.com/Shyam0709/Hyperlocal.git
cd Hyperlocal
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
touch .env
```

Add environment variables to `.env`:
```
MONGODB_URI= your_mongo_uri_here
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL= your_email 
ADMIN_PASSWORD= your_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
PORT= your_port_number
```
```bash
# Start backend server
node server.js
# or for production
npm start
```
### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
touch .env
```

Add to frontend `.env`:
```env
VITE_BACKEND_URL=http://localhost(portno)
```

```bash
# Start frontend development server
npm run dev
```

##  Running the Application

### Development Mode
Open 2 terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend && node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend && npm run dev
```
##  API Documentation

### Authentication Endpoints
```
POST /api/user/register - User registration
POST /api/user/login - User login
POST /api/user/admin - Admin login
```
##  Authentication Flow

1. User registers/logs in via frontend
2. Backend validates credentials
3. JWT token generated and sent to client
4. Token stored in localStorage
5. Token included in API request headers
6. Backend middleware validates token
7. Access granted to protected routes

##  Services and User Management Logic
- data stored in React Context
- Persistent storage in localStorage
- Backend synchronization for logged-in users
- Real-time services and user count updates
- Size and quantity management

##  Payment Integration

- stripe payment gateway integration
- Secure payment processing
- Booking confirmation system
- Payment status tracking

##  UI/UX Features

- Responsive design (mobile-first)
- Modern Tailwind CSS styling
- Loading states and error handling
- Toast notifications
- Smooth animations and transitions
- Intuitive navigation

##  Deployment

### Vercel Deployment
The project includes `vercel.json` files for easy deployment:

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Manual Deployment
1. Build frontend and admin dashboards
2. Deploy backend to hosting service
3. Update environment variables
4. Configure domain and SSL

##  Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request


##  Developers

**Shyam Sundar**

- Github : [@Shyam0709](https://github.com/Shyam0709)
- LinkedIn : [Shyam Sundar](https://www.linkedin.com/in/shyamsundar0709/)
  
##  Acknowledgments

- React team for the amazing library
- Vite for the fast build tool
- Tailwind CSS for utility-first styling
- MongoDB for the flexible database
- Cloudinary for image management
- Razorpay for payment processing
  







