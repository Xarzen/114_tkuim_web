import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const CoachDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchCoach();
  }, [id]);

  const fetchCoach = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/coaches/${id}`);
      setCoach(response.data.data);
      setError(null);
    } catch (err) {
      setError('無法載入教練資料');
      console.error('Error fetching coach:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/coaches/${id}`);
      navigate('/coaches');
    } catch (err) {
      alert('刪除失敗，請稍後再試');
      console.error('Error deleting coach:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white text-xl">載入中...</div>
      </div>
    );
  }

  if (error || !coach) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/50 border border-red-600 text-white px-6 py-4 rounded-lg">
          {error || '找不到教練資料'}
        </div>
        <Link to="/coaches" className="btn-secondary inline-block mt-4">
          返回列表
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按鈕 */}
      <Link
        to="/coaches"
        className="inline-flex items-center text-red-400 hover:text-red-300 mb-6 transition-colors"
      >
        ← 返回教練列表
      </Link>

      {/* 教練詳細資訊 */}
      <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-red-900">
        <div className="md:flex">
          {/* 照片區塊 */}
          <div className="md:w-auto flex-shrink-0 flex items-start justify-center bg-gray-900 p-4 md:p-6">
            <img
              src={coach.photoUrl || 'https://via.placeholder.com/300x300?text=Coach'}
              alt={coach.name}
              className="max-w-full h-auto rounded-lg shadow-xl"
            />
          </div>

          {/* 資訊區塊 */}
          <div className="p-8 flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {coach.name}
                </h1>
                <p className="text-gray-400 text-lg">{coach.gameId}</p>
              </div>
              <span className="bg-red-600 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg mt-2 sm:mt-0">
                {coach.position}
              </span>
            </div>

            {/* 基本資訊 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {coach.nationality && (
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <p className="text-red-400 text-sm font-semibold mb-1">國籍</p>
                  <p className="text-white text-lg">{coach.nationality}</p>
                </div>
              )}
              {coach.age && (
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <p className="text-red-400 text-sm font-semibold mb-1">年齡</p>
                  <p className="text-white text-lg">{coach.age} 歲</p>
                </div>
              )}
            </div>

            {/* 介紹 */}
            {coach.introduction && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-red-400 mb-3 drop-shadow-lg">
                  教練介紹
                </h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {coach.introduction}
                </p>
              </div>
            )}

            {/* 成就與經歷 */}
            {coach.achievements && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-red-400 mb-3 drop-shadow-lg">
                  成就與經歷
                </h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {coach.achievements}
                </p>
              </div>
            )}

            {/* 操作按鈕 */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-700">
              <Link
                to={`/coaches/edit/${coach._id}`}
                className="btn-primary"
              >
                編輯資料
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors font-semibold shadow-lg"
              >
                刪除教練
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 刪除確認 Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-red-900">
            <h3 className="text-xl font-bold text-white mb-4">確認刪除</h3>
            <p className="text-gray-300 mb-6">
              確定要刪除教練「{coach.name}」嗎？此操作無法復原。
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-secondary"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors font-semibold"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachDetail;
