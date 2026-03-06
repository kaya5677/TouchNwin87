import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

interface GameLobbyProps {
  socket: Socket;
  playerName: string;
  playerId: string;
}

interface Room {
  roomId: string;
  playerCount: number;
  gameState: string;
}

const GameLobby: React.FC<GameLobbyProps> = ({ socket, playerName, playerId }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingRoom, setCreatingRoom] = useState(false);

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms');
      const data = await response.json();
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setLoading(false);
    }
  };

  const createRoom = () => {
    setCreatingRoom(true);
    const roomId = `room-${Math.random().toString(36).substr(2, 9)}`;
    socket.emit('joinGame', { roomId, playerName });
    
    setTimeout(() => {
      navigate(`/game/${roomId}`);
      setCreatingRoom(false);
    }, 1000);
  };

  const joinRoom = (roomId: string) => {
    socket.emit('joinGame', { roomId, playerName });
    navigate(`/game/${roomId}`);
  };

  return (
    <div className="lobby-container">
      <div className="gaming-header">
        🎮 Game Lobby 🎮
      </div>
      
      <div className="game-card">
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>
          Welcome, {playerName}!
        </h2>
        
        <div className="lobby-actions">
          <button 
            onClick={createRoom}
            disabled={creatingRoom}
            className="game-button pulse"
          >
            {creatingRoom ? 'Creating Room...' : '🆕 Create New Room'}
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="game-button"
          >
            🏠 Back to Home
          </button>
        </div>

        <div className="rooms-section">
          <h3 style={{ color: '#666', margin: '2rem 0 1rem 0' }}>
            Available Game Rooms
          </h3>
          
          {loading ? (
            <div className="loading-message">
              <p>Loading available rooms...</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="no-rooms">
              <p style={{ color: '#999' }}>No active rooms. Create one to start playing!</p>
            </div>
          ) : (
            <div className="room-grid">
              {rooms.map((room) => (
                <div 
                  key={room.roomId}
                  className="room-card"
                  onClick={() => joinRoom(room.roomId)}
                >
                  <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>
                    Room {room.roomId.substr(-6)}
                  </h4>
                  <div className="room-info">
                    <p style={{ color: '#666', margin: '0.5rem 0' }}>
                      👥 Players: {room.playerCount}/4
                    </p>
                    <p style={{ color: '#666', margin: '0.5rem 0' }}>
                      🎯 Status: {room.gameState}
                    </p>
                  </div>
                  <button 
                    className="game-button"
                    style={{ 
                      background: room.playerCount >= 4 ? '#ccc' : '#ff6b6b',
                      cursor: room.playerCount >= 4 ? 'not-allowed' : 'pointer'
                    }}
                    disabled={room.playerCount >= 4}
                  >
                    {room.playerCount >= 4 ? 'Full' : 'Join Room'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lobby-stats" style={{ marginTop: '2rem' }}>
          <h4 style={{ color: '#666' }}>Quick Stats:</h4>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#ff6b6b', fontWeight: 'bold' }}>
                {rooms.length}
              </div>
              <div style={{ color: '#999' }}>Active Rooms</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#4caf50', fontWeight: 'bold' }}>
                {rooms.reduce((sum, room) => sum + room.playerCount, 0)}
              </div>
              <div style={{ color: '#999' }}>Players Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
