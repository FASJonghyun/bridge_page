// import logo from './logo.svg';
// import './App.css';
// import BridgePage from './bridge/BridgePage';
import React from 'react';
import './App.css';
import BridgePage from './bridge/BridgePage';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/bridge" element={<BridgePage />} />
          <Route path="/" element={<BridgePage />} /> {/* 홈 경로 */}
          {/* 필요한 다른 라우트 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
