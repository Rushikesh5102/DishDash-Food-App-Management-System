# 🍽️ DishDash - Smart Food Delivery Comparison

**DishDash** is a modern, full-stack food delivery aggregator that allows users to compare real-time prices, delivery fees, and ETAs across multiple platforms like Swiggy and Zomato.

![DishDash Banner](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![DishDash Banner](https://img.shields.io/badge/Express.js-Backend-blue?style=for-the-badge&logo=express)
![DishDash Banner](https://img.shields.io/badge/MySQL-Database-orange?style=for-the-badge&logo=mysql)

---

## ✨ Key Features
- 🔍 **Smart Search**: Find any dish and instantly see price comparisons.
- 💰 **Savings Analytics**: Track your potential savings across different platforms.
- 📦 **Order Management**: View and track your order history in a beautiful UI.
- 🌓 **Dark Mode**: Fully responsive UI with native dark mode support.
- 🚀 **Fast Performance**: Built with Next.js 16 and Framer Motion for a premium feel.

For a detailed feature breakdown, see [FEATURES_SUMMARY.md](./FEATURES_SUMMARY.md).

---

## 🏗️ Tech Stack
| Category | Technology |
|---|---|
| **Frontend** | React 19, Next.js 16, TailwindCSS, Framer Motion |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MySQL, Sequelize ORM |
| **Deployment** | Vercel (Frontend), Railway/Render (Backend) |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MySQL (v8+)

### 2. Installation
Clone the repository and install dependencies for both frontend and backend:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install --force
```

### 3. Local Development
Start the frontend development server:

```bash
cd frontend
npm run dev
```

*Note: The backend requires a local MySQL instance running on port 3306.*

---

## 🌐 Deployment

### Frontend (Vercel)
Vercel is the recommended platform for hosting the DishDash frontend.
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Set the **Root Directory** to `frontend`.
3. Add the `NEXT_PUBLIC_API_BASE_URL` environment variable.

### Backend
The backend can be deployed to platforms like [Railway](https://railway.app), [Render](https://render.com), or [DigitalOcean](https://digitalocean.com).

---

## 📖 Documentation
- [Frontend UI Guide](./FRONTEND_UI_GUIDE.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Advanced Features](./ADVANCED_FEATURES_SUMMARY.md)

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
