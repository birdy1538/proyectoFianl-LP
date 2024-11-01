import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BackgroundComponent from './components/Background';
import PhoneFrameComponent from './components/PhoneFrame';
import MainScreen from './pantallas/MainScreen';
import Receta from './pantallas/Receta'; // Import your Receta component
import Register from './pantallas/Register'; // Import your Register component
import Login from './pantallas/Login'; // Import your Login component
import Profile from './pantallas/Profile'; // Import your Profile component

const AppContent = () => {
  const location = useLocation();

  const showNavbar = location.pathname === '/'; // Show Navbar only on MainScreen

  return (
    <PhoneFrameComponent showNavbar={showNavbar}>
      <Routes>
        <Route path="/" element={<MainScreen />} /> {/* Main screen route */}
        <Route path="/receta/:id" element={<Receta />} /> {/* Receta route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/profile" element={<Profile />} /> {/* Profile route */}
      </Routes>
    </PhoneFrameComponent>
  );
};

const App = () => {
  return (
    <Router>
      <BackgroundComponent>
        <AppContent />
      </BackgroundComponent>
    </Router>
  );
};

export default App;