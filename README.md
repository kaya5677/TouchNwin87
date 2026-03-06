# TouchNwin87 - Online Gaming Platform

A modern, real-time multiplayer gaming platform built with React, TypeScript, and Socket.IO.

## 🎮 Features

- **Real-time Multiplayer Gaming** - Play with friends instantly
- **Game Lobby System** - Create and join game rooms
- **Global Leaderboard** - Compete with players worldwide
- **Responsive Design** - Works on desktop and mobile
- **Modern UI** - Beautiful gaming interface with animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Server Dependencies**
```bash
cd TouchNwin87
npm install
```

2. **Install Client Dependencies**
```bash
cd client
npm install
```

### Running the Application

1. **Start the Server**
```bash
npm run dev
```
Server runs on `http://localhost:3001`

2. **Start the Client** (in a new terminal)
```bash
cd client
npm start
```
Client runs on `http://localhost:3000`

## 🎯 How to Play

1. **Enter Your Name** - Choose your gaming username
2. **Join Game Lobby** - Browse available rooms or create your own
3. **Ready Up** - Click "Ready to Play" when prepared
4. **Play the Game** - Click targets as fast as you can!
5. **Check Leaderboard** - See how you rank against other players

## 🏗️ Project Structure

```
TouchNwin87/
├── server.js              # Main server file
├── package.json           # Server dependencies
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Home.tsx
│   │   │   ├── GameLobby.tsx
│   │   │   ├── GameRoom.tsx
│   │   │   └── Leaderboard.tsx
│   │   ├── App.tsx        # Main app component
│   │   ├── index.tsx      # Entry point
│   │   └── *.css         # Styling
│   └── package.json       # Client dependencies
└── README.md
```

## 🎮 Game Features

### Home Page
- Player name input
- Quick match option
- Access to game lobby and leaderboard

### Game Lobby
- View active game rooms
- Create new rooms
- Join existing rooms
- Real-time player count

### Game Room
- Multiplayer gameplay
- Real-time scoring
- 30-second timed rounds
- Interactive target clicking

### Leaderboard
- Global player rankings
- Player statistics
- Platform metrics

## 🔧 Technologies Used

### Backend
- **Node.js** - Server runtime
- **Express** - Web framework
- **Socket.IO** - Real-time communication
- **TypeScript** - Type safety

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Socket.IO Client** - Real-time communication
- **CSS3** - Styling and animations

## 🎨 Design Features

- **Gaming Theme** - Modern, vibrant design
- **Responsive Layout** - Works on all devices
- **Smooth Animations** - Engaging user experience
- **Real-time Updates** - Live game state
- **Interactive Elements** - Hover effects and transitions

## 🚀 Deployment

### Production Build

1. **Build Client**
```bash
cd client
npm run build
```

2. **Start Server**
```bash
npm start
```

### Environment Variables

Create a `.env` file in the root directory:
```
PORT=3001
NODE_ENV=production
```

## 🎮 Game Modes

### Touch & Win
- **Objective**: Click as many targets as possible
- **Duration**: 30 seconds
- **Players**: 2-4 per room
- **Scoring**: Points based on speed and accuracy

## 📊 Platform Statistics

- **Total Players**: 2,847+
- **Games Played**: 15,234+
- **Active Rooms**: Dynamic
- **Global Rankings**: Real-time leaderboard

## 🔒 Security Features

- **Input Validation** - Prevents malicious data
- **Room Management** - Secure game sessions
- **Rate Limiting** - Prevents abuse
- **Data Sanitization** - Clean user inputs

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] Multiple game modes
- [ ] Chat functionality
- [ ] Tournament system
- [ ] Mobile app version
- [ ] Achievement system
- [ ] Spectator mode

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change port in `.env` file
   - Kill existing processes

2. **Socket Connection Issues**
   - Check firewall settings
   - Verify server is running

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## 📝 License

MIT License - Feel free to use and modify for your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and support, please create an issue in the repository.

---

**Enjoy gaming on TouchNwin87! 🎮✨**
