import { useState, useEffect } from 'react';
import { playerAPI } from '../services/api';
import PlayerCard from '../components/PlayerCard';

function Home() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <div className="text-center text-gray-600">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          載入中...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 標題區 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          2025 CFO 戰隊選手介紹
        </h1>
        <p className="text-gray-600 text-lg">
          英雄聯盟職業戰隊 - 戰力陣容完整展示
        </p>
      </div>

      {/* 選手列表 */}
      {players.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">目前還沒有選手資料</p>
          <a href="/add" className="btn-primary inline-block">
            新增第一位選手
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <PlayerCard
              key={player._id}
              player={player}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
