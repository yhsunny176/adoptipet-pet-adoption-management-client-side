# AdoptiPet - Pet Adoption Platform

---

## Purpose

AdoptiPet is a full-stack web application designed to simplify and modernize the pet adoption process. It connects people looking to adopt pets with animals in need of loving homes, while also supporting shelters and organizations. The platform provides a seamless experience for:

-   **Potential Adopters:** Browse available pets, filter by type or breed, and submit adoption requests easily.
-   **Donors:** Make secure donations to support animal welfare initiatives.
-   **Admins & Shelters:** Manage pet listings, review adoption requests, and oversee platform activity.

By combining a user-friendly interface with up-to-date backend technology, AdoptiPet aims to make pet adoption easy for everyone involved.

---

## See the Live Demo Below:

[**Visit AdoptiPet Live**](https://adoptipet.web.app)

---

## ✨ Key Features

-   **Pet Browsing & Filtering:** Discover pets by type, breed, and more.
-   **User Authentication:** Secure sign-up, login, and role-based access using Firebase Authentication and JWT.
-   **Adoption Requests:** Seamless process for requesting to adopt pets.
-   **Donation System:** Integrated Stripe payments for donations.
-   **Admin Dashboard:** Manage users, pets, and adoption requests.
-   **Rich UI/UX:** Built with React, Tailwind CSS, and Radix UI for a modern, responsive experience.
-   **Notifications & Alerts:** Real-time feedback using React Toastify and SweetAlert2.
-   **Profile Management:** Users can update their information and view adoption history.

---

## 🛠️ Technologies Used

### Frontend

-   **React** (with Vite)
-   **Tailwind CSS** & `@tailwindcss/vite`
-   **ShadCN UI** (`shadcn@latest init*`)
-   **Tiptap** (Rich text editor)
-   **Stripe** (`@stripe/react-stripe-js`)
-   **Firebase** (Authentication & Hosting)
-   **React Query** (Data fetching/caching)
-   **Swiper** (Carousels)
-   **Lottie** (Animations)
-   **React Router**
-   **Formik** & **Yup** (Forms & validation)
-   **Axios** (API requests)
-   **Lucide** & **HugeIcons** (Icon libraries)
-   **React Toastify**, **SweetAlert2** (Notifications)
-   **React Spinners**, **React Loading Skeleton** (Loading states)

### Backend

-   **Node.js** with **Express.js**
-   **MongoDB** (Database)
-   **JWT** (Authentication)
-   **Firebase Admin SDK** (Server-side Firebase operations)
-   **Stripe** (Payments)
-   **CORS**, **dotenv**, **cookie-parser** (Security & environment management)

---

## 🔒 Security Methods Implemented

-   **JWT Authentication:** Secure API endpoints and user sessions.
-   **Firebase Authentication:** Handles user sign-up, login, and role management.
-   **Role-Based Access Control:** Admin and user roles enforced on both client and server.
-   **CORS Policy:** Restricts API access to trusted origins.
-   **Secure Cookies:** HTTP-only and SameSite cookie settings for JWT tokens.
-   **Environment Variables:** Sensitive keys and secrets managed via `.env` files.

---

## 📦 NPM Packages Used

Below are some of the key npm packages that power AdoptiPet, with a brief explanation of their roles:

<summary><strong>Production</strong></summary>

-   **@cloudinary/react, @cloudinary/url-gen:** For optimized image uploads and delivery.
-   **@hugeicons/core-free-icons, @hugeicons/react, lucide-react:** Modern icon libraries for a visually appealing UI.
-   **shadcn@latest-\***: Advanced, accessible UI primitives (dialogs, tooltips, navigation, etc.).
-   **@stripe/react-stripe-js:** Secure payment processing for donations.
-   **@tailwindcss/vite, tailwindcss, tailwind-merge:** Utility-first CSS framework for rapid, responsive design.
-   **@tanstack/react-query, @tanstack/react-table:** Efficient data fetching, caching, and table management.
-   **@tiptap/\*, lowlight:** Rich text editor for user-generated content (e.g., pet descriptions).
-   **axios:** Promise-based HTTP client for API requests.
-   **clsx, class-variance-authority, tailwind-merge:** Utilities for managing dynamic class names and styles.
-   **date-fns:** Modern date utility library for formatting and calculations.
-   **firebase:** Authentication, hosting, and real-time database support.
-   **formik, yup:** Robust form management and validation.
-   **lottie-react:** Render high-quality animations for engaging UI.
-   **react-router, react-select:** Core React libraries for SPA routing, rendering, and advanced select inputs.
-   **react-circular-progressbar, react-day-picker:** UI components for progress and date picking.
-   **react-intersection-observer, react-loading-skeleton, react-spinners, react-toastify:** Enhance UX with lazy loading, skeleton screens, spinners, and notifications.
-   **sweetalert2, swiper:** Beautiful alerts and touch-friendly sliders.

---

## 🗄️ Backend Technology

-   **MongoDB:** A flexible, scalable NoSQL database used to store all application data, including users, pets, adoption requests, and donations.
-   **Express.js:** The core of the backend, providing a robust RESTful API with modular middleware for authentication, authorization, and request handling.
-   **JWT (JSON Web Tokens):** Used for secure authentication, session management, and protecting sensitive API endpoints.
-   **Firebase Admin SDK:** Enables server-side operations with Firebase, such as verifying user tokens and managing user roles.
-   **Stripe:** Integrates secure payment processing for donations, ensuring sensitive payment data is handled safely.

These technologies work together to provide a secure, scalable, and maintainable backend for the AdoptiPet platform.

---

## 📝 Getting Started

### Prerequisites

-   Node.js & npm
-   MongoDB Atlas account
-   Firebase project
-   Stripe account

### Installation

```bash
# Clone the repository
$ git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-yhsunny176.git

# Install dependencies
$ npm install

# Create a .env file and add your environment variables
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_jwt_secret
STRIPE_SK=your_stripe_secret_key
NODE_ENV=development

# Start the server
$ npm start
```

### Thanks for Visiting this Repo!
