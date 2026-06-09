# DineFlow 🍽️

A modern full-stack restaurant management and food delivery platform built using the MERN stack. DineFlow connects customers, restaurant owners, and delivery agents through a seamless food ordering and delivery experience.

> 🚧 **Project Status:** Under Active Development

---

## Overview

DineFlow is a comprehensive restaurant management and food delivery platform designed to simplify the entire ordering workflow—from restaurant onboarding and menu management to order fulfillment and real-time delivery tracking.

The platform supports multiple user roles, secure authentication, location-based restaurant discovery, online payments, and live order status updates.

---

## Highlights

* Multi-Role Authentication System
* Restaurant Owner Dashboard
* Delivery Agent Dashboard
* Location-Based Restaurant Discovery
* Real-Time Order Tracking
* Live Delivery Tracking on Maps
* Razorpay Payment Integration
* JWT Authentication & Authorization
* Google & GitHub Social Login
* Cloudinary Media Storage
* Lazy Loading & Code Splitting
* Redux Toolkit State Management
* Secure OTP Verification
* Role-Based Access Control (RBAC)
* Custom Error Handling Architecture

---

## Features

### 👤 Customer Features

* User Registration & Login
* Email OTP Verification
* Secure JWT Authentication
* Google Authentication
* GitHub Authentication
* Browse Nearby Restaurants Based on Current Location
* Explore Restaurant Menus & Dishes
* Add Items to Cart
* Place Food Orders
* Razorpay Payment Integration
* Real-Time Order Status Updates
* Live Delivery Tracking
* View Order History
* Manage User Profile
* Responsive User Experience

---

### 🏪 Restaurant Owner Features

* Dedicated Restaurant Dashboard
* Restaurant Registration & Listing
* Manage Restaurant Information
* Upload Restaurant Images
* Create, Update & Delete Dishes
* Manage Menu Items
* Receive New Order Notifications
* Accept or Reject Orders
* Update Order Status

Order workflow:

```text
Order Received
      ↓
Order Accepted
      ↓
Preparing Food
      ↓
Ready For Pickup
      ↓
Out For Delivery
      ↓
Delivered
```

* View Restaurant Orders
* Monitor Restaurant Activity

---

### 🚴 Delivery Agent Features

* Dedicated Delivery Dashboard
* Receive Delivery Requests
* Accept or Reject Deliveries
* View Assigned Deliveries
* Real-Time Delivery Tracking
* Update Delivery Status
* Manage Active Deliveries
* Track Delivery Locations

---

## Authentication & Security

* JWT Authentication
* Role-Based Access Control (RBAC)
* Protected Routes
* Secure Cookie-Based Authentication
* Password Hashing with bcrypt
* OTP Hashing & Verification
* Authentication Middleware
* Authorization Middleware
* Secure Session Management
* Custom Error Handling System

---

## Performance Optimizations

* React Lazy Loading
* Code Splitting
* Optimized API Calls
* Efficient Redux Toolkit State Management
* Reusable Components
* Modular Architecture
* Optimized Asset Loading

---

## Technology Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* Axios
* Tailwind CSS
* Shadcn UI

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt
* Firebase Authentication
* Google OAuth
* GitHub OAuth

### Payments

* Razorpay

### Media Storage

* Cloudinary

### Maps & Location Services

* Geolocation API
* Real-Time Location Tracking
* Interactive Maps

---

## Application Roles

### Customer

Customers can:

* Browse restaurants
* Explore dishes
* Place orders
* Track deliveries
* Manage profiles
* View order history

### Restaurant Owner

Restaurant owners can:

* Manage restaurants
* Manage menus
* Manage dishes
* Receive customer orders
* Update order statuses

### Delivery Agent

Delivery agents can:

* Receive delivery requests
* Accept or reject deliveries
* Manage active deliveries
* Share live delivery location
* Update delivery statuses

---

## Project Architecture

The application follows a scalable and modular architecture based on industry best practices.

### Backend Architecture

* RESTful API Design
* MVC Architecture
* Centralized Error Handling
* Authentication Middleware
* Authorization Middleware
* Role-Based Access Control
* Secure Data Validation

### Frontend Architecture

* Component-Based Design
* Redux Toolkit Global State Management
* Route Protection
* Lazy Loading
* Reusable UI Components
* Feature-Based Folder Structure

---

## Folder Structure

```text
DineFlow
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── redux
│   │   ├── routes
│   │   ├── layouts
│   │   └── utils
│   │
│   └── public
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   ├── config
│   
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/dineflow.git
```

```bash
cd dineflow
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
PORT=
NODE_ENV=

DB_URI=

USER_APP_USER=
USER_APP_PASSWORD=

JWT_TOKEN=

CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_URL=

RAZORPAY_KEY_ID=
RAZORPAY_SECRET=
```

### Frontend (.env)

```env
VITE_BACKEND_AUTH_API_URL=
VITE_BACKEND_USER_API_URL=

VITE_LOCATION_API_KEY=
```

---

## API Features

### Authentication APIs

* Register User
* Login User
* Logout User
* Verify OTP
* Forgot Password
* Reset Password
* Google Login
* GitHub Login

### Restaurant APIs

* Create Restaurant
* Update Restaurant
* Delete Restaurant
* Get Restaurants
* Get Nearby Restaurants

### Menu APIs

* Create Dish
* Update Dish
* Delete Dish
* Fetch Menu

### Order APIs

* Place Order
* Update Order Status
* Get Order History
* Track Order

---

## Future Enhancements

* Real-Time Notifications using WebSockets
* Restaurant Analytics Dashboard
* Ratings & Reviews
* Coupons & Discounts
* Advanced Search & Filters
* Scheduled Orders
* Push Notifications
* Multi-Language Support
* Admin Dashboard
* Restaurant Insights & Reporting

---

## Screenshots

Project screenshots and demo videos will be added soon.

---

---

## Contributing

Contributions, suggestions, and feedback are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

### Rakesh Kumar Parida


**Technologies**

* React.js
* Node.js
* Express.js
* MongoDB
* TailwindCss
* ShadcnUI
* Redux Toolkit


GitHub: https://github.com/your-github-username

LinkedIn: https://linkedin.com/in/your-linkedin-profile

---

⭐ If you found this project useful, consider giving it a star on GitHub.