# SkillForge Academy

A modern full-stack Learning Management System (LMS) similar to Udemy.

## Tech Stack
* **Frontend**: React + Vite + TailwindCSS + Framer Motion
* **Backend**: Node.js + Express
* **Database**: MongoDB
* **Authentication**: JWT Authentication
* **State Management**: Context API

## Features
* User Authentication (Login / Register) with JWT
* Courses Dashboard with Categories and beautiful UI
* Course Details Page with Video placement and Curriculum
* Cart & Mock Payment System
* "My Learning" Section with Progress Tracking
* Favorites / Wishlist
* AI Assistant Chatbot (Mock by default, but ready for OpenAI API Key)
* Modern UI (Dark / Light vibes, gradients, glassmorphism, animations)

## Prerequisites
1. Node.js installed
2. MongoDB running locally on default port `27017` (or provide `.env` file with `MONGO_URI`)

## How to Run locally

### 1. Start the Backend
Open a terminal in the root directory and run:
```bash
cd backend
# Optional: Seed the database with mock courses
node seeder.js 
# Start the backend server
npm start # or node server.js
```
The backend will run on `http://localhost:5000`.

### 2. Start the Frontend
Open another terminal in the root directory and run:
```bash
cd frontend
# Start the frontend development server
npm run dev
```
The frontend will open on `http://localhost:5173`.

## Environment Variables (Optional)
You can create a `.env` file in the `/backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillforge
JWT_SECRET=your_super_secret_key
OPENAI_API_KEY=your_openai_api_key_here
```
If `OPENAI_API_KEY` is not provided, the chatbot will provide fallback mock responses perfectly tailored for SkillForge Academy!
