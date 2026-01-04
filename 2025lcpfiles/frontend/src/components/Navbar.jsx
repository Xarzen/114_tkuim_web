import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-black to-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center hover:opacity-80 transition">
            <img
              src="/images/t1-icon.svg"
              alt="T1 Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-red-200 transition font-medium"
            >
              首頁
            </Link>
            <Link
              to="/players"
              className="hover:text-red-200 transition font-medium"
            >
              選手列表
            </Link>
            <Link
              to="/coaches"
              className="hover:text-red-200 transition font-medium"
            >
              教練團隊
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg transition font-medium"
              >
                登出
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-medium"
              >
                管理員登入
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
