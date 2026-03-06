const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Game rooms storage
const gameRooms = {};
const players = {};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  // Create or join game room
  socket.on('joinGame', (data) => {
    const { roomId, playerName } = data;
    
    socket.join(roomId);
    
    if (!gameRooms[roomId]) {
      gameRooms[roomId] = {
        players: [],
        gameState: 'waiting'
      };
    }
    
    const player = {
      id: socket.id,
      name: playerName,
      score: 0,
      ready: false
    };
    
    gameRooms[roomId].players.push(player);
    players[socket.id] = { roomId, ...player };
    
    socket.emit('playerJoined', { playerId: socket.id });
    io.to(roomId).emit('roomUpdate', gameRooms[roomId]);
  });

  // Handle player ready
  socket.on('playerReady', () => {
    const player = players[socket.id];
    if (player && gameRooms[player.roomId]) {
      const roomPlayer = gameRooms[player.roomId].players.find(p => p.id === socket.id);
      if (roomPlayer) {
        roomPlayer.ready = true;
        io.to(player.roomId).emit('roomUpdate', gameRooms[player.roomId]);
      }
    }
  });

  // Handle game actions
  socket.on('gameAction', (data) => {
    const player = players[socket.id];
    if (player && gameRooms[player.roomId]) {
      io.to(player.roomId).emit('gameUpdate', {
        playerId: socket.id,
        action: data
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    
    const player = players[socket.id];
    if (player && gameRooms[player.roomId]) {
      gameRooms[player.roomId].players = gameRooms[player.roomId].players.filter(p => p.id !== socket.id);
      io.to(player.roomId).emit('roomUpdate', gameRooms[player.roomId]);
      
      if (gameRooms[player.roomId].players.length === 0) {
        delete gameRooms[player.roomId];
      }
    }
    
    delete players[socket.id];
  });
});

// API Routes
app.get('/api/rooms', (req, res) => {
  const roomList = Object.keys(gameRooms).map(roomId => ({
    roomId,
    playerCount: gameRooms[roomId].players.length,
    gameState: gameRooms[roomId].gameState
  }));
  res.json(roomList);
});

app.get('/api/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  if (gameRooms[roomId]) {
    res.json(gameRooms[roomId]);
  } else {
    res.status(404).json({ error: 'Room not found' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`TouchNwin87 Server running on port ${PORT}`);
});
