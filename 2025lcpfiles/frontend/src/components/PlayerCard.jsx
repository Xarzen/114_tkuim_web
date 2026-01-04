import { Link } from 'react-router-dom';

function PlayerCard({ player, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`確定要刪除選手「${player.name}」嗎？`)) {
      onDelete(player._id);
    }
  };

  return (
    <div className="card">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={player.photoUrl || 'https://via.placeholder.com/400x400?text=Player'}
          alt={player.name}
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{player.name}</h3>
          <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
            {player.position}
          </span>
        </div>
        
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">遊戲 ID:</span> {player.gameId}
        </p>
        
        {player.age && (
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">年齡:</span> {player.age}
          </p>
        )}
        
        {player.nationality && (
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">國籍:</span> {player.nationality}
          </p>
        )}
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {player.introduction || '尚無介紹'}
        </p>
        
        <div className="flex gap-2">
          <Link
            to={`/player/${player._id}`}
            className="flex-1 bg-red-600 text-white text-center py-2 rounded-lg hover:bg-red-700 transition"
          >
            查看詳情
          </Link>
          <Link
            to={`/edit/${player._id}`}
            className="flex-1 bg-gray-800 text-white text-center py-2 rounded-lg hover:bg-gray-900 transition"
          >
            編輯
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
