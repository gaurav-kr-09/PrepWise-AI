# 🎯 PrepWise-AI

An AI-powered mock interview platform designed to help students and professionals prepare for technical and HR interviews through AI-generated questions, intelligent answer evaluation, and personalized feedback.

> 🚧 **Project Status:** Actively under development. The core application architecture and MVP features have been implemented, while additional enhancements are currently in progress.

---

## ✨ Features

- 🔐 Secure User Authentication (JWT)
- 👤 User Registration & Login
- 🤖 AI-powered Technical & HR Interview Modes
- 📝 AI-generated Interview Questions using Google Gemini API
- 📊 AI-based Answer Evaluation & Scoring
- 💡 Personalized Feedback & Improvement Suggestions
- 📚 Interview History Tracking
- 🛡️ Protected Routes & Session Management
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt.js

### AI Integration
- Google Gemini API

---

## 📂 Project Structure

```text
PrepWise-AI
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## 🚀 Current Workflow

1. User Registration / Login
2. Authentication using JWT
3. Select Interview Type (Technical / HR)
4. AI generates interview questions using Gemini API
5. User submits responses
6. AI evaluates answers
7. Personalized feedback and score generation
8. Interview history stored for future reference

---

## 🚀 Planned Enhancements

- 🎙️ Voice-based Mock Interviews
- 💻 AI-powered Coding Interview Round
- 📈 Performance Analytics Dashboard
- 🧠 AI Follow-up Questions
- 📄 Resume-based Interview Generation
- 🌐 Cloud Deployment
- 📊 Detailed Performance Reports

---

## 📌 Current Status

The project is currently in active development.

Implemented modules include:

- User Authentication
- Interview Workflow
- Gemini AI Integration
- Backend REST APIs
- Interview History Management
- Core Frontend Architecture

The project is being continuously improved with additional features, UI refinements, and production-ready optimizations.

---

## ⚙️ Getting Started

### Clone the Repository

```bash
git clone https://github.com/gaurav-kr-09/PrepWise-AI.git
cd PrepWise-AI
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside the `backend` directory using the provided `.env.example` file and configure your MongoDB connection string, JWT secret, and Gemini API key.

---

## 🤝 Contributing

Contributions, feature suggestions, and pull requests are welcome.

---

## 📜 License

This project is developed for educational and portfolio purposes.

---

### ⭐ If you found this project helpful, consider giving it a star.
