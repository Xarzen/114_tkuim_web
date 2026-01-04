import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlayerDetail from './pages/PlayerDetail';
import AddPlayer from './pages/AddPlayer';
import EditPlayer from './pages/EditPlayer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black relative">
        {/* 背景圖片層 */}
        <div className="fixed inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
          <div 
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: 'url(/images/t1-logo.jpg)',
              backgroundPosition: 'center center',
              backgroundSize: '50%',
            }}
          ></div>
        </div>
        {/* 內容層 */}
        <div className="relative z-10">
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:id" element={<PlayerDetail />} />
          <Route path="/add" element={<AddPlayer />} />
          <Route path="/edit/:id" element={<EditPlayer />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
