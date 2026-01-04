import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-red-600 to-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold hover:text-red-200 transition">
            🏆 T1 戰隊
          </Link>
          
          <div className="space-x-6">
            <Link 
              to="/" 
              className="hover:text-red-200 transition font-medium"
            >
              選手列表
            </Link>
            <Link 
              to="/add" 
              className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition font-medium"
            >
              + 新增選手
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
