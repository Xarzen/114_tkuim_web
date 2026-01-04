import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError('帳號或密碼錯誤');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-red-900">
          <h1 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
            管理員登入
          </h1>

          {error && (
            <div className="bg-red-900/50 border border-red-600 text-white px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-red-400 mb-2">
                帳號
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input-field"
                placeholder="請輸入帳號"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-red-400 mb-2">
                密碼
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="請輸入密碼"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
            >
              登入
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              預設帳號：admin / 密碼：admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
