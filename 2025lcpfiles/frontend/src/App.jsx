import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlayerDetail from './pages/PlayerDetail';
import AddPlayer from './pages/AddPlayer';
import EditPlayer from './pages/EditPlayer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:id" element={<PlayerDetail />} />
          <Route path="/add" element={<AddPlayer />} />
          <Route path="/edit/:id" element={<EditPlayer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
