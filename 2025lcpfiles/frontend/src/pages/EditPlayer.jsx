import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { playerAPI } from '../services/api';
import PlayerForm from '../components/PlayerForm';

function EditPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  const fetchPlayer = async () => {
    try {
      setLoading(true);
      const data = await playerAPI.getPlayerById(id);
      setPlayer(data.data);
    } catch (err) {
      console.error('Error fetching player:', err);
      alert('無法載入選手資料');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (playerData) => {
    try {
      await playerAPI.updatePlayer(id, playerData);
      alert('選手資料更新成功！');
      navigate(`/player/${id}`);
    } catch (err) {
      console.error('Error updating player:', err);
      alert('更新失敗：' + (err.message || '未知錯誤'));
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

  return (
    <div className="container mx-auto px-4 py-8">
      {player && (
        <PlayerForm 
          player={player} 
          onSubmit={handleSubmit} 
          isEdit={true} 
        />
      )}
    </div>
  );
}

export default EditPlayer;
