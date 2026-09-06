# 📊 IPO Investment & Profit Tracker
A full-stack MERN application for managing IPO investments, tracking profit/loss, analyzing investment performance, and generating downloadable reports. The application provides secure authentication, complete IPO management, automatic financial calculations, interactive analytics, advanced filtering, multiple themes, and responsive web/mobile support.

# 🚀 Live Demo
🌐 Frontend: https://ipo-tracker-frontend.onrender.com
⚙️ Backend API: https://ipo-tracker-api-pj4b.onrender.com
❤️ API Health: https://ipo-tracker-api-pj4b.onrender.com/api/health

# ✨ Features
🔐 User Authentication — Register and login using JWT authentication.
📈 IPO Management — Create, view, update, and delete IPO records.
🧮 Automatic Calculations — Automatically calculate total investment, profit/loss, half-profit, and profit percentage.
📊 Interactive Analytics — Visualize investment and profit data using Recharts.
🔎 Search & Filtering — Search IPOs, filter by status, and sort records.
📑 Excel Export — Export IPO records into formatted Excel files.
📄 PDF Export — Generate professional PDF investment reports.
🎨 Multiple Themes — Dark Red, Dark Blue, Dark Purple, Dark Green, Dark Gold, and Light themes.
📱 Responsive Design — Optimized for desktop, tablet, and mobile devices.
📲 React Native App — Mobile application with offline storage and notification support.
🔔 Toast Notifications — User-friendly success and error notifications.
✨ Animations — Smooth UI animations using Framer Motion.

# 🛠️ Tech Stack
# Frontend

React 18
Vite
Tailwind CSS
Framer Motion
React Router DOM
Axios
Recharts
React Hot Toast

# Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT
bcryptjs
ExcelJS
PDFKit
Moment.js

# 🏗️ Project Structure

IPO-VAULT/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── ipoController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── IPO.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── ipoRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── mobile/
│   ├── src/
│   ├── App.js
│   ├── app.json
│   └── package.json
│
├── .gitignore
├── README.md

# 🧮 Investment Calculations
1. Total Investment
   Total Investment = Number of Shares × Issue Price
2. Profit / Loss
   Profit/Loss = (Current Price − Issue Price) × Number of Shares
3. Profit Percentage
   Profit % = (Profit / Total Investment) × 100
4. Half Profit
   Half Profit = Profit / 2

# 🔐 Authentication & Security
The application uses:

JWT-based authentication
bcryptjs password hashing
Protected API routes
Environment variables for sensitive information
User-specific IPO records
.gitignore protection for .env

Never upload your real MongoDB URI or JWT secret to GitHub.

# ⚙️ Installation
1. Clone the repository
   <img width="495" height="83" alt="Screenshot 2026-09-06 at 9 51 25 PM" src="https://github.com/user-attachments/assets/15227708-961a-45a8-9d9b-4b9f5aaaeba0" />

# 📊 Application Workflow
User
 ↓
React Frontend
 ↓
Axios API Request
 ↓
Express.js Backend
 ↓
JWT Authentication
 ↓
Controllers
 ↓
MongoDB Atlas
 ↓
IPO Data
 ↓
Dashboard / Charts / Reports

# ☁️ Deployment
The project is deployed using Render.
                 GitHub
                   │
          ┌────────┴────────┐
          ↓                 ↓
      Frontend           Backend
       Render             Render
                            │
                            ↓
                       MongoDB Atlas

# 📱 Responsive Design
The application is designed to work across:

💻 Desktop
🖥️ Laptop
📱 Mobile
📟 Tablet

The mobile version is built using React Native and supports local/offline storage.

# 🗺️ Future Improvements
 Real-time IPO market data
 Advanced portfolio analytics
 Automated IPO notifications
 Price tracking
 More investment insights
 Automated testing
 Production monitoring

 # ⭐ Support
 If you find this project useful, consider giving the repository a ⭐ on GitHub.
