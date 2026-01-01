import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { playerAPI } from '../services/api';

function PlayerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  const fetchPlayer = async () => {
    try {
      setLoading(true);
      const data = await playerAPI.getPlayerById(id);
      setPlayer(data.data);
      setError(null);
    } catch (err) {
      setError('無法載入選手資料');
      console.error('Error fetching player:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`確定要刪除選手「${player.name}」嗎？`)) {
      try {
        await playerAPI.deletePlayer(id);
        navigate('/');
      } catch (err) {
        alert('刪除失敗：' + (err.message || '未知錯誤'));
      }
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

  if (error || !player) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || '找不到該選手'}
        </div>
        <Link to="/" className="btn-primary inline-block">
          返回首頁
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按鈕 */}
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        ← 返回選手列表
      </Link>

      {/* 選手詳細資訊 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* 照片區 */}
          <div className="md:w-1/3">
            <img
              src={player.photoUrl || 'https://via.placeholder.com/400x400?text=Player'}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 資訊區 */}
          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {player.name}
                </h1>
                <p className="text-xl text-gray-600">
                  {player.gameId}
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">
                {player.position}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                {player.age && (
                  <div>
                    <p className="text-gray-500 text-sm">年齡</p>
                    <p className="text-gray-800 font-semibold">{player.age} 歲</p>
                  </div>
                )}
                {player.nationality && (
                  <div>
                    <p className="text-gray-500 text-sm">國籍</p>
                    <p className="text-gray-800 font-semibold">{player.nationality}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 介紹 */}
            {player.introduction && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">選手介紹</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {player.introduction}
                </p>
              </div>
            )}

            {/* 成就 */}
            {player.achievements && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">成就/經歷</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {player.achievements}
                </p>
              </div>
            )}

            {/* 操作按鈕 */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Link
                to={`/edit/${player._id}`}
                className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                編輯資料
              </Link>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                刪除選手
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetail;
