<div align="center">

# 🍽️ DineFlow

**A full-stack restaurant management and food delivery platform built with the MERN stack.**

Connecting customers, restaurant owners, and delivery agents through one seamless ordering and delivery experience.

![Status](https://img.shields.io/badge/status-under%20active%20development-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Highlights](#-highlights)
- [Screenshots](#-screenshots)
- [Features by Role](#-features-by-role)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Security](#-security)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 📖 Overview

DineFlow covers the full lifecycle of a food order, from restaurant onboarding and menu management to order fulfillment and live delivery tracking.

The platform supports three user roles: **Customer**, **Restaurant Owner**, and **Delivery Agent**. It offers secure authentication, location-based restaurant discovery, online payments, and real-time order status updates.

> 🚧 **Project status:** under active development. More screenshots and demo videos will be added soon.

---

## ✨ Highlights

- 👥 Multi-role authentication with Role-Based Access Control (RBAC)
- 🏪 Dedicated dashboards for restaurant owners and delivery agents
- 📍 Location-based restaurant discovery
- 🛵 Real-time order tracking and live delivery tracking on maps
- 💳 Razorpay payment integration
- 🔐 JWT authentication with Google, GitHub, and email/password login
- ✉️ OTP verification for signup and password reset
- ☁️ Cloudinary for media storage
- ⚡ Route-level lazy loading and code splitting
- 🧰 Redux Toolkit for state management and centralized custom error handling

---

## 📸 Screenshots

### Authentication

<table>
  <tr>
    <td align="center"><b>Sign Up</b></td>
    <td align="center"><b>Login</b></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/auth/signup.png" alt="Signup" /></td>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/auth/login.png" alt="Login" /></td>
  </tr>
</table>

### Customer

<table>
  <tr>
    <td align="center"><b>Home: restaurants found in city</b></td>
    <td align="center"><b>Home: no restaurants in city</b></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/user/cityBasedRestaurant.png" alt="Home page with nearby restaurants" /></td>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/user/restaurantNotFound.png" alt="Home page when no restaurant is found" /></td>
  </tr>
  <tr>
    <td align="center"><b>Profile (Light)</b></td>
    <td align="center"><b>Profile Details (Light)</b></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/user/profile/profile1_light.png" alt="User profile, light theme" /></td>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/user/profile/profile2_light.png" alt="User profile details, light theme" /></td>
  </tr>
  <tr>
    <td align="center"><b>Profile (Dark)</b></td>
    <td align="center"><b>Profile Details (Dark)</b></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/user/profile/profile1_dark.png" alt="User profile, dark theme" /></td>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/user/profile/profile2_dark.png" alt="User profile details, dark theme" /></td>
  </tr>
</table>

### Restaurant Owner Dashboard

<table>
  <tr>
    <td align="center"><b>Restaurant Listing</b></td>
    <td align="center"><b>Create / Update Restaurant</b></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/restaurntOwner/restaurant_listing.png" alt="Restaurant listing" /></td>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/restaurntOwner/createOrEdit_restaurant.png" alt="Create or edit restaurant" /></td>
  </tr>
  <tr>
    <td align="center"><b>Restaurant Details (Dark)</b></td>
    <td align="center"><b>Restaurant Details (Light)</b></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/restaurntOwner/restaurant_details.png" alt="Restaurant details, dark theme" /></td>
    <td><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/restaurntOwner/restaurantDetails_light.png" alt="Restaurant details, light theme" /></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><b>Menu Management</b></td>
  </tr>
  <tr>
    <td colspan="2"><img src="https://raw.githubusercontent.com/Rakesh-99/dineflow/main/client/src/assets/restaurntOwner/createOrUpdateMneu.png" alt="Create or update menu" /></td>
  </tr>
</table>

---

## 🧑‍🤝‍🧑 Features by Role

### 🙋 Customer

- Register and log in (email/password, Google, GitHub) with email OTP verification
- Browse nearby restaurants based on current location
- Explore restaurant menus and dishes
- Add items to cart and place orders
- Pay online with Razorpay
- Receive order status updates and track delivery live
- View order history and manage profile
- Responsive experience across devices

### 🏪 Restaurant Owner

- Dedicated restaurant dashboard
- Register and list restaurants, manage details, upload images
- Create, update, and delete dishes and menu items
- Receive new order notifications, then accept or reject orders
- Update order status and monitor restaurant activity

**Order workflow**

```text
Order Received → Order Accepted → Preparing Food → Ready For Pickup → Out For Delivery → Delivered
```

### 🛵 Delivery Agent

- Dedicated delivery dashboard
- Receive delivery requests, then accept or reject them
- View assigned deliveries and manage active ones
- Update delivery status and track delivery locations

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React.js, Redux Toolkit, React Router, Tailwind CSS, Shadcn UI |
| **Backend** | Node.js, Express.js, MongoDB |
| **Authentication** | JWT, bcrypt, Firebase Authentication, Google OAuth, GitHub OAuth |
| **Payments** | Razorpay |
| **Media Storage** | Cloudinary |
| **Maps & Location** | Geolocation API |

---

## 🏗️ Architecture

**Backend**

- RESTful API design with MVC architecture
- Centralized error handling
- Authentication and authorization middleware
- Role-Based Access Control
- Secure data validation

**Frontend**

- Component-based design with reusable UI components
- Feature-based folder structure
- Redux Toolkit for global state
- Protected routes
- Lazy loading and code splitting

---

## 🔐 Security

- JWT authentication with secure, cookie-based sessions
- Role-Based Access Control and protected routes
- Authentication and authorization middleware
- Password hashing with bcrypt
- OTP hashing and verification
- Custom error handling system

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A MongoDB database (local or Atlas)
- Accounts and keys for Cloudinary, Razorpay, and Firebase

### 1. Clone the repository

```bash
git clone https://github.com/Rakesh-99/dineflow.git
cd dineflow
```

### 2. Set up the backend

```bash
cd server
npm install
npm run dev
```

### 3. Set up the frontend

```bash
cd client
npm install
npm run dev
```

> Create the `.env` files described below before starting each app.

---

## 🔑 Environment Variables

<details>
<summary><b>Backend</b> — <code>server/.env</code></summary>

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

</details>

<details>
<summary><b>Frontend</b> — <code>client/.env</code></summary>

```env
VITE_BACKEND_AUTH_API_URL=
VITE_BACKEND_USER_API_URL=
VITE_FIREBASE_API_KEY=
VITE_LOCATION_API_KEY=
```

</details>

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Rakesh Kumar Parida**
[GitHub](https://github.com/Rakesh-99)

---

<div align="center">

⭐ If you found this project useful, consider giving it a star on GitHub.

</div>
