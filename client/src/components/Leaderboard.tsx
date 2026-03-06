import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  gamesPlayed: number;
  winRate: number;
}

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading leaderboard data
    const mockData: LeaderboardEntry[] = [
      { rank: 1, name: "ProGamer87", score: 15420, gamesPlayed: 342, winRate: 78.5 },
      { rank: 2, name: "TouchMaster", score: 14890, gamesPlayed: 298, winRate: 75.2 },
      { rank: 3, name: "QuickFingers", score: 13950, gamesPlayed: 456, winRate: 69.8 },
      { rank: 4, name: "SpeedDemon", score: 12800, gamesPlayed: 234, winRate: 72.1 },
      { rank: 5, name: "NinjaPlayer", score: 11650, gamesPlayed: 189, winRate: 68.4 },
      { rank: 6, name: "GameWizard", score: 10980, gamesPlayed: 412, winRate: 65.7 },
      { rank: 7, name: "LightningFast", score: 9870, gamesPlayed: 167, winRate: 71.3 },
      { rank: 8, name: "Champion87", score: 8950, gamesPlayed: 278, winRate: 63.2 },
      { rank: 9, name: "AcePlayer", score: 8100, gamesPlayed: 345, winRate: 59.8 },
      { rank: 10, name: "RisingStar", score: 7650, gamesPlayed: 123, winRate: 74.1 }
    ];

    setTimeout(() => {
      setLeaderboardData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const getRankClass = (rank: number) => {
    switch(rank) {
      case 1: return 'rank-1';
      case 2: return 'rank-2';
      case 3: return 'rank-3';
      default: return '';
    }
  };

  const formatWinRate = (rate: number) => {
    return `${rate.toFixed(1)}%`;
  };

  return (
    <div className="leaderboard-container">
      <div className="gaming-header">
        🏆 TouchNwin87 Leaderboard 🏆
      </div>
      
      <div className="game-card">
        <div className="leaderboard-actions">
          <button 
            onClick={() => navigate('/')}
            className="game-button"
          >
            🏠 Back to Home
          </button>
          
          <button 
            onClick={() => navigate('/lobby')}
            className="game-button"
          >
            🎮 Game Lobby
          </button>
        </div>

        <h2 style={{ color: '#333', margin: '2rem 0 1rem 0', textAlign: 'center' }}>
          Top Players Worldwide
        </h2>

        {loading ? (
          <div className="loading-message">
            <p>Loading leaderboard data...</p>
          </div>
        ) : (
          <div className="leaderboard-content">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Total Score</th>
                  <th>Games Played</th>
                  <th>Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((player) => (
                  <tr key={player.rank} className={getRankClass(player.rank)}>
                    <td>
                      <span className="rank-display">
                        {player.rank === 1 && '🥇'}
                        {player.rank === 2 && '🥈'}
                        {player.rank === 3 && '🥉'}
                        {player.rank > 3 && `#${player.rank}`}
                      </span>
                    </td>
                    <td className="player-name">{player.name}</td>
                    <td className="score">{player.score.toLocaleString()}</td>
                    <td>{player.gamesPlayed}</td>
                    <td>{formatWinRate(player.winRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="leaderboard-stats" style={{ marginTop: '2rem' }}>
              <h3 style={{ color: '#666', textAlign: 'center' }}>Platform Statistics</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', color: '#ff6b6b', fontWeight: 'bold' }}>
                    2,847
                  </div>
                  <div style={{ color: '#999' }}>Total Players</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', color: '#4caf50', fontWeight: 'bold' }}>
                    15,234
                  </div>
                  <div style={{ color: '#999' }}>Games Played</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', color: '#2196f3', fontWeight: 'bold' }}>
                    342
                  </div>
                  <div style={{ color: '#999' }}>Active Now</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
