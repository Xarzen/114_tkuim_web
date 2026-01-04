import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import CoachForm from '../components/CoachForm';

const AddCoach = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      await api.post('/coaches', formData);
      navigate('/coaches');
    } catch (err) {
      setError(err.response?.data?.message || '新增教練失敗，請稍後再試');
      console.error('Error adding coach:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
        新增教練
      </h1>

      {error && (
        <div className="bg-red-900/50 border border-red-600 text-white px-6 py-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-red-900">
        <CoachForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AddCoach;
