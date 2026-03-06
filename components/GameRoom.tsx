import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

interface GameRoomProps {
  socket: Socket;
  currentRoom: any;
  playerId: string;
}

interface Player {
  id: string;
  name: string;
  score: number;
  ready: boolean;
}

const GameRoom: React.FC<GameRoomProps> = ({ socket, currentRoom, playerId }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [gameTime, setGameTime] = useState(30);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (currentRoom && currentRoom.players) {
      const allReady = currentRoom.players.length >= 2 && 
                      currentRoom.players.every((p: Player) => p.ready);
      if (allReady && !gameStarted) {
        startGame();
      }
    }
  }, [currentRoom]);

  useEffect(() => {
    if (gameStarted && gameTime > 0) {
      const timer = setTimeout(() => setGameTime(gameTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameTime === 0 && gameStarted) {
      endGame();
    }
  }, [gameTime, gameStarted]);

  const handleReady = () => {
    setIsReady(true);
    socket.emit('playerReady');
  };

  const startGame = () => {
    setGameStarted(true);
    setGameTime(30);
  };

  const endGame = () => {
    setGameStarted(false);
    alert(`Game Over! Your score: ${playerScore}`);
    navigate('/lobby');
  };

  const handleGameAction = (action: string) => {
    if (!gameStarted) return;
    
    socket.emit('gameAction', { action, timestamp: Date.now() });
    setPlayerScore(prev => prev + Math.floor(Math.random() * 10) + 1);
  };

  const leaveRoom = () => {
    socket.disconnect();
    navigate('/lobby');
  };

  if (!currentRoom) {
    return (
      <div className="loading-container">
        <div className="game-card">
          <h2>Loading game room...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="game-room-container">
      <div className="gaming-header">
        🎮 Game Room {roomId?.substr(-6)} 🎮
      </div>
      
      <div className="game-layout">
        <div className="game-sidebar">
          <div className="player-list">
            <h3>Players ({currentRoom.players?.length || 0})</h3>
            {currentRoom.players?.map((player: Player) => (
              <div 
                key={player.id} 
                className={`player-item ${player.ready ? 'player-ready' : ''}`}
              >
                <span>{player.name}</span>
                <span>{player.score} pts</span>
              </div>
            ))}
          </div>
          
          <div className="game-controls">
            {!gameStarted && !isReady && (
              <button 
                onClick={handleReady}
                className="game-button pulse"
              >
                ✅ Ready to Play
              </button>
            )}
            
            <button 
              onClick={leaveRoom}
              className="game-button"
              style={{ background: '#e74c3c' }}
            >
              🚪 Leave Room
            </button>
          </div>
        </div>

        <div className="game-main">
          <div className="game-status">
            {gameStarted ? (
              <span>⏱️ Time: {gameTime}s</span>
            ) : (
              <span>Waiting for players...</span>
            )}
          </div>

          {gameStarted ? (
            <div className="game-board">
              <h2>Touch & Win!</h2>
              <p>Click the targets as fast as you can!</p>
              
              <div className="game-area">
                <div className="target-grid">
                  {[...Array(9)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleGameAction(`target-${index}`)}
                      className="game-target"
                      style={{
                        background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                        animation: `pulse ${1 + Math.random()}s infinite`
                      }}
                    >
                      🎯
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="score-display">
                <h3>Your Score: {playerScore}</h3>
              </div>
            </div>
          ) : (
            <div className="waiting-room">
              <h2>Waiting Room</h2>
              <p>Get ready to play!</p>
              
              {!isReady ? (
                <div className="ready-prompt">
                  <p>Click "Ready to Play" when you're prepared!</p>
                </div>
              ) : (
                <div className="waiting-message">
                  <p>✅ You're ready! Waiting for other players...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
