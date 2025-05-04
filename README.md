# 🎯 Adaptive Quiz App

An interactive quiz application that adapts question difficulty based on user performance. Features a dynamic scoring system, user authentication, and an admin panel for question management.

## ✨ Features

- **Adaptive Difficulty**: Questions adjust based on user performance
- **Real-time Scoring**: Dynamic score tracking during quiz sessions
- **User Authentication**: Secure login/registration system with password reset
- **Hall of Fame**: Leaderboard showcasing top performers
- **Personal Stats**: Track your performance metrics
- **Admin Panel**: Manage quiz questions and difficulty levels
- **Interactive UI**: Beautiful particle effects and smooth transitions

## 🚀 Tech Stack

### Frontend
- React.js with Vite
- Redux for state management
- Chakra UI & Material UI
- Particle effects for enhanced visuals
- D3.js for data visualization

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer for email notifications

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/VishnuPScodes/quizApp
```

2. Install dependencies for both frontend and backend:
```bash
# Frontend
cd front-end
npm install

# Backend
cd ../Back-end
npm install
```

3. Set up environment variables:
```bash
# Frontend (.env)
VITE_BASE_URL=http://localhost:4001

# Backend (.env)
PORT=4001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:
```bash
# Backend
cd Back-end
npm run dev

# Frontend
cd front-end
npm run dev
```

## 🎮 How to Play

1. Register/Login to your account
2. Start a new quiz session
3. Answer questions within the time limit
4. Watch your score adapt based on performance
5. Save your score to the Hall of Fame
6. Track your progress in My Stats

## 👨‍💼 Admin Features

- Add new questions to the question bank
- Set difficulty levels for questions
- Monitor user performance
- Manage question pool

## 🌐 Live Demo

Check out the live application: [Quiz App Demo](https://quiz-b549itocf-vishnupscodes.vercel.app/)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
Made with ❤️ by Vishnu PS
