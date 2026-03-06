import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';

// Components
import Home from './components/Home';
import GameLobby from './components/GameLobby';
import GameRoom from './components/GameRoom';
import Leaderboard from './components/Leaderboard';

const socket = io('http://localhost:3001');

interface Player {
  id: string;
  name: string;
  score: number;
  ready: boolean;
}

interface GameRoom {
  players: Player[];
  gameState: string;
}

function App() {
  const [playerName, setPlayerName] = useState('');
  const [currentRoom, setCurrentRoom] = useState<GameRoom | null>(null);
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    socket.on('playerJoined', (data: { playerId: string }) => {
      setPlayerId(data.playerId);
    });

    socket.on('roomUpdate', (room: GameRoom) => {
      setCurrentRoom(room);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                playerName={playerName}
                setPlayerName={setPlayerName}
                socket={socket}
              />
            } 
          />
          <Route 
            path="/lobby" 
            element={
              <GameLobby 
                socket={socket}
                playerName={playerName}
                playerId={playerId}
              />
            } 
          />
          <Route 
            path="/game/:roomId" 
            element={
              <GameRoom 
                socket={socket}
                currentRoom={currentRoom}
                playerId={playerId}
              />
            } 
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
