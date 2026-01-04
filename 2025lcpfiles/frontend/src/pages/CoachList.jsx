import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import CoachCard from '../components/CoachCard';

const CoachList = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      setLoading(true);
      const response = await api.get('/coaches');
      setCoaches(response.data.data);
      setError(null);
    } catch (err) {
      setError('無法載入教練資料，請稍後再試');
      console.error('Error fetching coaches:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white text-xl">載入中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/50 border border-red-600 text-white px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          T1 教練團隊
        </h1>
        <p className="text-gray-300 text-lg drop-shadow-lg">
          專業教練陣容 - 打造世界冠軍隊伍
        </p>
      </div>

      {}
      {isAuthenticated && (
        <div className="mb-8 flex justify-end">
          <Link
            to="/coaches/add"
            className="btn-primary"
          >
            新增教練
          </Link>
        </div>
      )}

      {coaches.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-xl mb-4">目前還沒有教練資料</p>
          <Link to="/coaches/add" className="btn-primary inline-block">
            立即新增第一位教練
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <CoachCard key={coach._id} coach={coach} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoachList;
