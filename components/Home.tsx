import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

interface HomeProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  socket: Socket;
}

const Home: React.FC<HomeProps> = ({ playerName, setPlayerName, socket }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinLobby = () => {
    if (!playerName.trim()) {
      alert('Please enter your name!');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      navigate('/lobby');
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickMatch = () => {
    if (!playerName.trim()) {
      alert('Please enter your name first!');
      return;
    }
    
    const roomId = `room-${Math.random().toString(36).substr(2, 9)}`;
    socket.emit('joinGame', { roomId, playerName });
    setIsLoading(true);
    
    setTimeout(() => {
      navigate(`/game/${roomId}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="home-container">
      <div className="gaming-header">
        🎮 TouchNwin87 🎮
      </div>
      
      <div className="game-card slide-in">
        <h1 style={{ color: '#333', marginBottom: '2rem' }}>
          Welcome to TouchNwin87 Gaming Platform
        </h1>
        
        <div className="player-input-section">
          <input
            type="text"
            placeholder="Enter your gaming name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="game-input"
            maxLength={20}
          />
        </div>

        <div className="game-modes">
          <h3 style={{ color: '#666', marginBottom: '1rem' }}>Choose Your Game Mode</h3>
          
          <button 
            onClick={handleJoinLobby}
            disabled={isLoading}
            className="game-button pulse"
          >
            🏆 Game Lobby
          </button>
          
          <button 
            onClick={handleQuickMatch}
            disabled={isLoading}
            className="game-button"
          >
            ⚡ Quick Match
          </button>
          
          <button 
            onClick={() => navigate('/leaderboard')}
            className="game-button"
          >
            📊 Leaderboard
          </button>
        </div>

        <div className="game-stats" style={{ marginTop: '2rem' }}>
          <h4 style={{ color: '#666' }}>Platform Features:</h4>
          <ul style={{ textAlign: 'left', color: '#777' }}>
            <li>🎯 Real-time multiplayer gaming</li>
            <li>🏅 Global leaderboard system</li>
            <li>💬 In-game chat</li>
            <li>🎮 Multiple game modes</li>
            <li>🔒 Secure player authentication</li>
          </ul>
        </div>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <p style={{ color: 'white', fontSize: '1.2rem' }}>Connecting to game server...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
