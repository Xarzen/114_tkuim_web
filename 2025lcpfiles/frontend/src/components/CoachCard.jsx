import { Link } from 'react-router-dom';

const CoachCard = ({ coach }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-red-900 overflow-hidden">
      {}
      <div className="w-full h-48 flex items-center justify-center bg-gray-900 p-2">
        <img
          src={coach.photoUrl || 'https://via.placeholder.com/300'}
          alt={coach.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
            {coach.name}
          </h3>
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {coach.position}
          </span>
        </div>
        <div className="space-y-2 mb-4 text-gray-300">
          <p className="flex items-center">
            <span className="font-semibold text-red-400 mr-2">遊戲 ID:</span>
            <span className="text-white">{coach.gameId}</span>
          </p>
          {coach.nationality && (
            <p className="flex items-center">
              <span className="font-semibold text-red-400 mr-2">國籍:</span>
              <span>{coach.nationality}</span>
            </p>
          )}
          {coach.age && (
            <p className="flex items-center">
              <span className="font-semibold text-red-400 mr-2">年齡:</span>
              <span>{coach.age} 歲</span>
            </p>
          )}
        </div>
        {coach.introduction && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {coach.introduction}
          </p>
        )}
        <Link
          to={`/coaches/${coach._id}`}
          className="block w-full text-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold shadow-lg"
        >
          查看詳細資料
        </Link>
      </div>
    </div>
  );
};

export default CoachCard;
