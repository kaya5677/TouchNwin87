{
  "name": "touchnwin87",
  "version": "1.0.0",
  "description": "Online Gaming Platform - TouchNwin87",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "client": "cd client && npm start",
    "build": "cd client && npm run build"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.7.2",
    "cors": "^2.8.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^7.5.0",
    "dotenv": "^16.3.1"
  },
