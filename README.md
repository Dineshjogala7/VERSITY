# VERSITY 📚

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)

A modern, AI-powered educational platform designed to revolutionize online learning through interactive features, personalized study tools, and rich multimedia resources. VERSITY combines cutting-edge AI technology with intuitive design to create an engaging learning experience.



---

## 🌟 Key Features

### For Students
- **🤖 AI-Powered Mock Quizzes** - Generate dynamic quizzes using advanced AI to test your knowledge on any topic
- **🔥 Streak Tracking** - Build consistent learning habits with visual streak tracking and progress analytics
- **📹 Video Lectures** - Access high-quality educational video content with seamless streaming
- **📄 PDF Resources** - Download and study from comprehensive PDF materials organized by course
- **📊 Progress Dashboard** - Monitor your learning journey with detailed analytics and insights
- **⭐ Course Reviews** - Share feedback and read reviews from fellow learners
- **🎯 Personalized Learning** - Get course recommendations based on your interests and performance

### For Educators/Admins
- **📤 Content Management** - Upload and organize courses, videos, and study materials
- **☁️ Cloud Integration** - Seamless file uploads and management via Cloudinary
- **👥 User Management** - Monitor enrollments, track student progress, and manage reviews
- **📈 Analytics Dashboard** - View platform-wide statistics and engagement metrics

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18+** | UI framework with modern hooks |
| **Vite** | Lightning-fast build tool and dev server |
| **Axios** | HTTP client for API requests |
| **TailwindCSS** | Utility-first CSS framework |
| **React Router** | Client-side routing |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js & Express** | RESTful API server |
| **MongoDB & Mongoose** | NoSQL database with ODM |
| **JWT** | Secure authentication & authorization |
| **Groq SDK** | AI-powered quiz generation |
| **Cloudinary** | Media asset management |
| **Multer** | File upload handling |

### DevOps & Deployment
| Service | Purpose |
|---------|---------|
| **Render** | Backend hosting |
| **Vercel** | Frontend hosting |
| **MongoDB Atlas** | Cloud database |

---

## 📁 Project Architecture

```
VERSITY/
│
├── backend/                    # Server-side application
│   ├── Controllers/           # Business logic handlers
│   │   ├── Course.js         # Course CRUD operations
│   │   ├── Enrollment.js     # Student enrollment logic
│   │   ├── Review.js         # Review management
│   │   └── User.js           # Authentication & user management
│   │
│   ├── Models/               # MongoDB schemas
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Review.js
│   │   └── User.js
│   │
│   ├── Middlewares/          # Custom middleware
│   │   ├── courseUploads.js  # File upload configuration
│   │   └── auth.js           # JWT verification
│   │
│   ├── Routes/               # API endpoints
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Review.js
│   │   └── User.js
│   │
│   ├── index.js              # Server entry point
│   ├── package.json
│   └── .env.example
│
├── client/                    # Frontend application
│   ├── public/               # Static assets
│   │   └── assets/
│   │
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   └── StreakTracker.jsx
│   │   │
│   │   ├── pages/            # Application views
│   │   │   ├── Home.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── Quiz.jsx      # AI quiz interface
│   │   │   ├── Profile.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── utils/            # Helper functions
│   │   │   ├── api.js        # Axios configuration
│   │   │   └── helpers.js
│   │   │
│   │   ├── context/          # React Context providers
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.jsx           # Root component
│   │   ├── main.jsx          # Application entry
│   │   └── index.css         # Global styles
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/versity.git
cd versity
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/versity

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Service
GROQ_API_KEY=your_groq_api_key

# CORS
CLIENT_URL=http://localhost:5173
```

**Start the backend server:**
```bash
npm run dev
```
Server will run on `http://localhost:5000`

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=VERSITY
```

**Start the development server:**
```bash
npm run dev
```
Application will open at `http://localhost:5173`

---

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create a new Web Service** on [Render](https://render.com)
2. **Connect your GitHub repository**
3. **Configure settings:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Add Environment Variables** from your `.env` file
5. **Deploy** and copy your backend URL

### Frontend Deployment (Vercel)

1. **Import your repository** on [Vercel](https://vercel.com)
2. **Configure settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. **Add Environment Variable:**
   ```
   VITE_API_URL=[https://your-backend-url.onrender.com/api](https://versity-backend.onrender.com)
   ```
4. **Deploy** your application

---

## 📖 Usage Guide

### For Students

1. **Sign Up / Login**
   - Create an account or sign in with existing credentials
   - Complete your profile with learning preferences

2. **Browse Courses**
   - Explore available courses by category
   - Read descriptions, reviews, and course outlines
   - Check prerequisites and difficulty levels

3. **Enroll in Courses**
   - Click "Enroll" on any course
   - Access course materials immediately
   - Track your progress on the dashboard

4. **Study Materials**
   - Watch video lectures at your own pace
   - Download PDF resources for offline study
   - Bookmark important materials

5. **Take AI Quizzes**
   - Navigate to the Quiz section
   - Select a topic or course
   - Complete AI-generated questions
   - Get instant feedback and explanations

6. **Track Progress**
   - Monitor your learning streak
   - View quiz scores and improvements
   - Check course completion percentage

7. **Engage with Community**
   - Leave course reviews
   - Rate instructors
   - Share feedback

### For Admins

1. **Course Management**
   - Create new courses with rich descriptions
   - Upload video content and PDF materials
   - Set course pricing and access levels

2. **Content Organization**
   - Categorize courses by subject
   - Tag courses for better discoverability
   - Manage course prerequisites

3. **Monitor Platform**
   - View enrollment statistics
   - Track user engagement
   - Moderate reviews and feedback

---

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone [https://github.com/yourusername/versity.git](https://github.com/Dineshjogala7/VERSITY)
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Wait for review and feedback

### Code Style Guidelines
- Use meaningful variable and function names
- Comment complex logic
- Follow ESLint configuration
- Write modular, reusable code
- Keep components small and focused

### Bug Reports
Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 VERSITY

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👥 Team & Support

**Developed with ❤️ by the VERSITY Team**

- 🌐 **Website:** [versity.example.com](https://versity.example.com)
- 📧 **Email:** support@versity.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/yourusername/versity/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/yourusername/versity/discussions)

---

## 🙏 Acknowledgments

- [Groq](https://groq.com) for AI capabilities
- [Cloudinary](https://cloudinary.com) for media management
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- All contributors and supporters of this project

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/versity)
![GitHub issues](https://img.shields.io/github/issues/yourusername/versity)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/versity)
![GitHub stars](https://img.shields.io/github/stars/yourusername/versity?style=social)

**Current Version:** 1.0.0  
**Status:** Active Development

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with 💜 for learners worldwide

</div>
