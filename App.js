import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ComplaintsList from './pages/complaintsList';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
        <Sidebar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/complaints" element={<ComplaintsList />} />
            {/* Map and Settings placeholders */}
            <Route path="/map" element={<div style={{padding: '30px'}}>Map View Coming Soon</div>} />
            <Route path="/teams" element={<div style={{padding: '30px'}}>Teams Coming Soon</div>} />
            <Route path="/settings" element={<div style={{padding: '30px'}}>Settings</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;