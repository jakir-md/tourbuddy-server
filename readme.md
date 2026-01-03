# 🗄️ TourBuddy | Backend API

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![Node.js](https://img.shields.io/badge/Node.js-18.x-339933) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-4169E1) ![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748) ![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

> **The scalable, type-safe backbone of the TourBuddy platform.**
> A robust RESTful API built to handle complex travel logistics, secure identity verification, and role-based community interactions.

---

## 🚀 Architecture Overview

The **TourBuddy Backend** is engineered for reliability, data integrity, and security. It orchestrates the logic between Travelers, Hosts, and Moderators.

Key architectural highlights:
- **Modular Design:** Strict separation of concerns (Controllers, Services, Routes, Utils).
- **Type Safety:** Full TypeScript integration with **Prisma ORM** for database interactions.
- **Security First:** Robust **JWT** authentication and **Zod** schema validation for every request.
- **Scalable Database:** Normalized schema design hosted on **PostgreSQL** (via Neon DB).
- **Role-Based Access Control (RBAC):** Middleware ensuring granular permissions for `USER`, `MODERATOR`, and `ADMIN`.

---

## 🛠️ Tech Stack

### **Backend**

| Category                      | Technologies                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Runtime Environment** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)                                                                                                                                                                                                                                                                    |
| **Framework** | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) ![REST API](https://img.shields.io/badge/REST%20API-009688?style=flat&logo=fastapi&logoColor=white)                                                                                                                                                            |
| **Database & ORM** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)                                                                                                                                                                |
| **Validation** | ![Zod](https://img.shields.io/badge/Zod-3068B7?style=flat&logo=zod&logoColor=white)                                                                                                                                                                                                                                                                                  |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) ![Bcrypt](https://img.shields.io/badge/Bcrypt-00BFFF?style=flat)                                                                                                                                                                                                       |
| **Utilities** | ![Multer](https://img.shields.io/badge/Multer-F28D1A?style=flat) (Uploads) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) (Media Storage)                                                                                                                                                                  |
| **Version Control** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)                                                                                                                                                                                     |

---

## 🔌 API Endpoints

A comprehensive list of available routes, categorized by functionality.

### 🔐 **Authentication (`/auth`)**
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Authenticate user and issue access/refresh tokens. | Public |
| `POST` | `/refresh-token` | Generate a new access token using a valid refresh token. | Public |
| `GET` | `/me` | Retrieve current logged-in user's information. | Private |

### 👤 **User & Verification (`/user`)**
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user with profile image upload. | Public |
| `POST` | `/verify` | Submit **Live Selfie** & **NID** for KYC verification. | User |
| `GET` | `/verification-status` | Check if the current user is verified. | User/Mod |
| `GET` | `/verify-requests` | View all pending identity verification requests. | Mod/Admin |
| `PATCH` | `/verify-request` | Approve or reject a user's identity verification. | Mod/Admin |
| `GET` | `/:id` | Get public profile details of a specific user. | Public |

### ✈️ **Trip Management (`/trip`)**
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/all-trips` | Fetch paginated list of all published trips. | Public |
| `GET` | `/trending-trips` | Get top-performing or most viewed trips. | Public |
| `GET` | `/startPoints` | List available trip starting locations. | Public |
| `GET` | `/:id` | Get detailed information for a specific trip. | Public |
| `POST` | `/create` | Host creates a new trip itinerary. | Verified User |
| `POST` | `/upload-image` | Utility route to upload trip banners/images. | Public |
| `GET` | `/user-trips` | Get trips created by the logged-in user. | User/Admin |
| `GET` | `/pending-approvals` | View trips waiting for moderation approval. | Mod/Admin |
| `POST` | `/update-status` | Approve or Reject a trip listing. | Mod/Admin |
| `GET` | `/reviewable-trips/:adminId` | Get trips that a user can review. | User/Mod |
| `POST` | `/reviews` | Submit a review for a completed trip. | User/Admin |
| `GET` | `/reviews/:id` | Get all reviews for a specific trip. | User/Mod/Admin |
| `GET` | `/upcoming-trip` | Get the logged-in user's next scheduled trip. | User |
| `GET` | `/user-analytics/:id` | Fetch stats (hosting/traveling) for a user. | User/Mod/Admin |

### 🤝 **Join Requests (`/join-request`)**
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/request` | Traveler sends a request to join a specific trip. | User |
| `POST` | `/status` | Check the status of a specific join request. | User |
| `POST` | `/accept` | Host accepts a traveler's request. | Host |
| `POST` | `/reject` | Host rejects a traveler's request. | Host |
| `GET` | `/` | Get all join requests for the host's trips. | User |
| `GET` | `/joined-trips` | Get list of trips the user has successfully joined. | User |
| `GET` | `/joined-profiles/:slug` | View profiles of other travelers on a trip. | User/Mod/Admin |

### 💳 **Payments (`/payment`)**
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/success` | Webhook callback for successful payments. | Public |
| `POST` | `/fail` | Webhook callback for failed payments. | Public |

### 💎 **Subscriptions (`/subscription`)**
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/create` | Create a new subscription tier/plan. | Admin |
| `GET` | `/all-plans` | Retrieve all available subscription plans. | User/Admin |
| `POST` | `/upgrade-subscription` | User purchases a premium subscription plan. | User |

---

## ⚙️ Setup Instructions

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/jakir-md/tourbuddy-server
cd tourbuddy-backend
npm install