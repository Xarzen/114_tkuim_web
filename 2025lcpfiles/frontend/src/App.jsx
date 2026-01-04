import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import TeamIntro from './pages/TeamIntro';
import Home from './pages/Home';
import PlayerDetail from './pages/PlayerDetail';
import AddPlayer from './pages/AddPlayer';
import EditPlayer from './pages/EditPlayer';
import CoachList from './pages/CoachList';
import CoachDetail from './pages/CoachDetail';
import AddCoach from './pages/AddCoach';
import EditCoach from './pages/EditCoach';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black relative">
          {}
          <div className="fixed inset-0 z-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: 'url(/images/t1-background.jpg)',
                backgroundPosition: 'center center',
              }}
            ></div>
          </div>
          {}
          <div className="relative z-10">
            <Navbar />
          <Routes>
            <Route path="/" element={<TeamIntro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/players" element={<Home />} />
            <Route path="/player/:id" element={<PlayerDetail />} />
            <Route path="/add" element={<ProtectedRoute><AddPlayer /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><EditPlayer /></ProtectedRoute>} />
            <Route path="/coaches" element={<CoachList />} />
            <Route path="/coaches/:id" element={<CoachDetail />} />
            <Route path="/coaches/add" element={<ProtectedRoute><AddCoach /></ProtectedRoute>} />
            <Route path="/coaches/edit/:id" element={<ProtectedRoute><EditCoach /></ProtectedRoute>} />
          </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
