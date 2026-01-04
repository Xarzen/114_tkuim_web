import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import CoachForm from '../components/CoachForm';

const EditCoach = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchCoach();
  }, [id]);

  const fetchCoach = async () => {
    try {
      setFetchLoading(true);
      const response = await api.get(`/coaches/${id}`);
      setCoach(response.data.data);
      setError(null);
    } catch (err) {
      setError('無法載入教練資料');
      console.error('Error fetching coach:', err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      await api.put(`/coaches/${id}`, formData);
      navigate(`/coaches/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || '更新教練資料失敗，請稍後再試');
      console.error('Error updating coach:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white text-xl">載入中...</div>
      </div>
    );
  }

  if (error && !coach) {
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
      <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
        編輯教練資料
      </h1>

      {error && (
        <div className="bg-red-900/50 border border-red-600 text-white px-6 py-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-red-900">
        <CoachForm
          initialData={coach}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EditCoach;
