import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Update this line
import './index.css';
import Home from './App';
import Register from './Register.jsx';
import reportWebVitals from './reportWebVitals';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById('root')); // Update this line
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();