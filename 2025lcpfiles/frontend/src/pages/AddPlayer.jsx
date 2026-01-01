import { useNavigate } from 'react-router-dom';
import { playerAPI } from '../services/api';
import PlayerForm from '../components/PlayerForm';

function AddPlayer() {
  const navigate = useNavigate();

  const handleSubmit = async (playerData) => {
    try {
      await playerAPI.createPlayer(playerData);
      alert('選手新增成功！');
      navigate('/');
    } catch (err) {
      console.error('Error creating player:', err);
      alert('新增失敗：' + (err.message || '未知錯誤'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PlayerForm onSubmit={handleSubmit} isEdit={false} />
    </div>
  );
}

export default AddPlayer;
