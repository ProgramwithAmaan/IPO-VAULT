# IPO-VAULT

::: {align="center"}

📊 IPO Investment & Profit Tracker

A full-stack MERN application for tracking IPO investments, calculating profits, analyzing performance, and exporting reports.

<p>

<a href="https://ipo-tracker-frontend.onrender.com">{=html}<strong>{=html}🚀
Live Demo</strong>{=html}</a>{=html}   •  
<a href="https://ipo-tracker-api-pj4b.onrender.com/api/health">{=html}<strong>{=html}🟢
API Health</strong>{=html}</a>{=html}

</p>

<p>

<img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React">{=html}
<img src="https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite&logoColor=white" alt="Vite">{=html}
<img src="https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">{=html}
<img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js">{=html}
<img src="https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white" alt="Express.js">{=html}
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB">{=html}
<img src="https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white" alt="JWT">{=html}

</p>

:::

✨ Overview

IPO Investment & Profit Tracker is a responsive full-stack web
application designed to make IPO investment tracking simple and
measurable.

Instead of maintaining investment data manually in spreadsheets, users
can securely store IPO records, automatically calculate profit and
percentage returns, filter and sort investments, visualize performance
through interactive charts, and export their data as Excel or PDF
reports.

🎯 What problem does it solve?

IPO investors often need to track:

How much they invested

Number of shares allotted

Issue price vs. current/listing price

Total profit or loss

Half-profit targets

Return percentage

Investment status

Historical IPO records

This application brings those calculations and records into one
dashboard.

🚀 Live Application

Service          Link

🌐 Frontend      https://ipo-tracker-frontend.onrender.com
⚙️ Backend API   https://ipo-tracker-api-pj4b.onrender.com
❤️ API Health    https://ipo-tracker-api-pj4b.onrender.com/api/health

Note: The live application is hosted on Render. The backend
exposes a health endpoint for quickly verifying API availability.

🧩 Features

<details>

<summary>

<strong>{=html}🔐 Authentication</strong>{=html}

</summary>

User registration

User login

JWT-based authentication

Protected API routes

Password hashing with bcrypt

User-specific IPO data

</details>

<details>

<summary>

<strong>{=html}📈 IPO Management</strong>{=html}

</summary>

Create IPO records

View IPO records

Update IPO records

Delete IPO records

Store investment-related information

Track IPO status

</details>

<details>

<summary>

<strong>{=html}🧮 Automatic Calculations</strong>{=html}

</summary>

The application automatically calculates important investment metrics
such as:

Total investment

Profit / loss

Half-profit target

Profit percentage

Other derived IPO metrics

This reduces manual calculation errors and keeps the dashboard updated
from the stored data.

</details>

<details>

<summary>

<strong>{=html}📊 Interactive Analytics</strong>{=html}

</summary>

Interactive charts using Recharts

Investment performance visualization

Profit/loss analysis

Status-based analysis

Dashboard statistics

</details>

<details>

<summary>

<strong>{=html}🔎 Search, Filter & Sort</strong>{=html}

</summary>

Search IPO records

Filter by status

Sort records by different fields

Quickly find relevant investments

Collapsible records section for a cleaner dashboard

</details>

<details>

<summary>

<strong>{=html}📤 Export Reports</strong>{=html}

</summary>

Export records to formatted Excel files

Generate professional PDF reports

Useful for maintaining offline investment records

Backend libraries used for exporting include ExcelJS and PDFKit.

</details>

<details>

<summary>

<strong>{=html}🎨 Multiple Themes</strong>{=html}

</summary>

The application supports multiple visual themes:

Theme            Primary Color   Background

🔴 Dark Red      #dc2626       #0a0a0a
🔵 Dark Blue     #3b82f6       #0a0e1a
🟣 Dark Purple   #8b5cf6       #0a0a1a
🟢 Dark Green    #22c55e       #0a1a0a
🟡 Dark Gold     #f59e0b       #1a140a
⚪ Light         #dc2626       #f0f0f0

</details>

<details>

<summary>

<strong>{=html}📱 Responsive & Mobile Support</strong>{=html}

</summary>

Responsive desktop interface

Tablet-friendly layout

Mobile-friendly interface

React Native mobile application

AsyncStorage-based offline support

Native UI interactions

Push-notification support

</details>

🏗️ System Architecture

flowchart LR
    U[👤 User] --> W[🌐 React Web App]
    U --> M[📱 React Native App]

    W --> A[⚡ Axios]
    M --> A

    A --> B[🟢 Express.js API]
    B --> AUTH[🔐 JWT + bcrypt]
    B --> C[🧠 Controllers]
    C --> DB[(🍃 MongoDB Atlas)]

    C --> X[📊 ExcelJS]
    C --> P[📄 PDFKit]
    W --> R[📈 Recharts]

🛠️ Tech Stack

Frontend

Technology             Purpose

React 18           UI framework
Vite               Development/build tool
Tailwind CSS       Styling
Framer Motion      Animations
Recharts           Charts & analytics
React Router DOM   Client-side navigation
Axios              API communication
React Hot Toast    Notifications

Backend

Technology          Purpose

Node.js         JavaScript runtime
Express.js      REST API framework
MongoDB Atlas   Database
Mongoose        MongoDB ODM
JWT             Authentication
bcryptjs        Password hashing
ExcelJS         Excel generation
PDFKit          PDF generation
Moment.js       Date formatting

Mobile

Technology               Purpose

React Native         Mobile application
AsyncStorage         Offline/local data
Native UI APIs       Mobile interactions
Push Notifications   Real-time updates

📁 Project Structure

IPO-Tracker/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── ipoController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── IPO.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── ipoRoutes.js
│   │
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
└── render.yaml

⚙️ Getting Started

Prerequisites

Make sure you have installed:

Node.js v16+

npm or yarn

Git

A MongoDB Atlas database

1️⃣ Clone the repository

git clone https://github.com/YOUR_USERNAME/ipo-tracker.git
cd ipo-tracker

2️⃣ Backend setup

cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:

npm start

For development:

npm run dev

3️⃣ Frontend setup

Open another terminal:

cd frontend
npm install

Create a .env file:

VITE_API_URL=http://localhost:5000

Start the frontend:

npm run dev

The frontend will normally be available at:

http://localhost:5173

🔄 Application Flow

sequenceDiagram
    actor User
    participant UI as React Frontend
    participant API as Express API
    participant DB as MongoDB Atlas

    User->>UI: Login / Register
    UI->>API: Authentication request
    API->>DB: Validate / create user
    DB-->>API: User data
    API-->>UI: JWT token

    User->>UI: Add IPO
    UI->>API: POST IPO data + JWT
    API->>DB: Save IPO
    DB-->>API: Saved record
    API-->>UI: IPO response

    UI->>UI: Calculate & visualize metrics
    UI-->>User: Dashboard + charts

🔐 Security

The application uses several standard security practices:

JWT-based authentication

Password hashing with bcryptjs

Protected API middleware

Environment variables for secrets

User-specific data access

.env excluded from Git using .gitignore

Never commit your real MONGO_URI or JWT_SECRET to GitHub.

📊 Core Investment Logic

At a high level, the tracker derives investment metrics from the IPO
record.

Total Investment

Total Investment = Number of Shares × Issue Price

Profit / Loss

Profit/Loss = (Current Price − Issue Price) × Number of Shares

Profit Percentage

Profit % = (Profit / Total Investment) × 100

Half-Profit Target

Half Profit = Profit / 2

The exact calculation behavior should follow the implementation in the
project's IPO controller/model.

📸 Screenshots

Add your real application screenshots to:

docs/screenshots/

Recommended structure:

docs/
└── screenshots/
    ├── dashboard.png
    ├── ipo-records.png
    ├── analytics.png
    ├── login.png
    ├── register.png
    └── mobile.png

Then uncomment/update the gallery below:

<details>

<summary>

<strong>{=html}🖥️ Web Application</strong>{=html}

</summary>

Dashboard



IPO Records



Analytics



</details>

<details>

<summary>

<strong>{=html}📱 Mobile Application</strong>{=html}

</summary>



</details>

🎨 UI / UX Highlights

The interface follows a modern dashboard approach:

Dark-first visual design

Multiple selectable themes

Responsive layouts

Rounded cards

Clear information hierarchy

Interactive charts

Animated transitions

Toast notifications

Collapsible sections

Mobile-friendly controls

The goal is to keep financial information dense but easy to scan.

📡 API Overview

The backend is organized around authentication and IPO management.

Area                    Responsibility

/api/health           API health check
Authentication routes   Register/login and authentication
IPO routes              Create, read, update and delete IPO records

The exact route definitions are maintained inside:

backend/routes/authRoutes.js
backend/routes/ipoRoutes.js

☁️ Deployment

The project is structured for deployment with Render.

Production architecture

GitHub
   │
   ├── Frontend ──► Render Static/Web Service
   │
   └── Backend ───► Render Web Service
                         │
                         ▼
                    MongoDB Atlas

The repository also contains:

render.yaml

for deployment configuration.

🧪 Development Checklist

Use this checklist when setting up the project locally:

Clone repository

Install backend dependencies

Configure MongoDB

Add backend environment variables

Start backend

Install frontend dependencies

Configure frontend API URL

Start frontend

Register a test user

Add an IPO record

Verify calculations

Test filtering/sorting

Test Excel export

Test PDF export

Test responsive layout

🗺️ Roadmap

User authentication

IPO CRUD operations

Automatic profit calculations

Search/filter/sort

Interactive analytics

Excel export

PDF export

Multiple themes

Responsive web interface

React Native application

Automated IPO market-data integration

Advanced portfolio analytics

More notification rules

Production monitoring

Automated testing suite

🤝 Contributing

Contributions are welcome.

Fork the repository

Create a feature branch

git checkout -b feature/your-feature

Commit your changes

git commit -m "feat: add your feature"

Push the branch

git push origin feature/your-feature

Open a Pull Request

📄 License

Add your preferred license here, for example MIT License, if your
repository is intended to be open source.

::: {align="center"}

⭐ If you find this project useful, consider giving it a star!

Built with ❤️ using the MERN stack
:::
