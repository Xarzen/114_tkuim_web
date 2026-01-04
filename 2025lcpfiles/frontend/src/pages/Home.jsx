import { useState, useEffect } from 'react';
import { playerAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PlayerCard from '../components/PlayerCard';
import { Link } from 'react-router-dom';

function Home() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const data = await playerAPI.getAllPlayers();
      setPlayers(data.data);
      setError(null);
    } catch (err) {
      setError('無法載入選手資料，請確認後端伺服器是否啟動');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await playerAPI.deletePlayer(id);
      // 重新載入選手列表
      fetchPlayers();
    } catch (err) {
      alert('刪除失敗：' + (err.message || '未知錯誤'));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          載入中...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/80 backdrop-blur-sm border border-red-500 text-white px-4 py-3 rounded shadow-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 標題區 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          2025 T1 戰隊選手介紹
        </h1>
        <p className="text-gray-300 text-lg drop-shadow-lg">
          英雄聯盟傳奇戰隊 - 六冠王者陣容展示
        </p>
      </div>

      {/* 新增按鈕（僅管理員可見） */}
      {isAuthenticated && (
        <div className="mb-8 flex justify-end">
          <Link to="/add" className="btn-primary">
            新增選手
          </Link>
        </div>
      )}

      {/* 選手列表 */}
      {players.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-300 text-lg mb-4">目前還沒有選手資料</p>
          {isAuthenticated && (
            <Link to="/add" className="btn-primary inline-block">
              新增第一位選手
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <PlayerCard
              key={player._id}
              player={player}
              onDelete={handleDelete}
              showActions={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
