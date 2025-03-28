import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import './styles/style.css';

function App() {
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [dailyMissions, setDailyMissions] = useState([]);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      const response = await fetch('/api/users/me', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (response.ok) setUser(data);
    };

    // Fetch lessons
    const fetchLessons = async () => {
      const response = await fetch('/api/lessons');
      const data = await response.json();
      setLessons(data);
    };

    fetchUser();
    fetchLessons();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Sidebar user={user} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} lessons={lessons} />} />
            <Route path="/learn" element={<Learn lessons={lessons} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;