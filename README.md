# 🚀 TaskSphere — Team Task Manager

TaskSphere is a full-stack web application designed to help teams manage projects and tasks efficiently. It allows users to collaborate, track progress, and organize workflows through a clean and intuitive interface.

---

## 🌐 Live Demo

- **Frontend:** https://mindful-luck-production-9e33.up.railway.app/  
- **Backend:** https://task-sphere-production.up.railway.app  

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

## ✨ Features

- User Signup & Login  
- Role-Based Access (Admin / Member)  
- Create & Manage Projects  
- Assign & Track Tasks  
- Task Status (Pending, Ongoing, Completed)  
- Search Tasks  
- Dashboard Overview  
- Add Members to Projects (Admin only)  

---

## 🧠 How It Works

- Users register and log in securely  
- Admins can create projects and assign tasks  
- Members can view and update their tasks  
- All data is stored in MongoDB Atlas  
- Authentication is handled using JWT tokens  

---

## 🚀 Local Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment

- Frontend and Backend deployed using Railway  
- Database hosted on MongoDB Atlas  

---

## ⚠️ Note

For production use, admin roles should be assigned securely instead of allowing users to select them during signup.

---

## 📄 License

This project is created for academic purposes.

---

## 🙌 Acknowledgement

Built as part of a full-stack MERN project to demonstrate development and deployment skills.
