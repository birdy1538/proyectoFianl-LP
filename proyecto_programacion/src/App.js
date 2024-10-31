import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackgroundComponent from './components/Background';
import PhoneFrameComponent from './components/PhoneFrame';
import MainScreen from './pantallas/MainScreen';
import Receta from './pantallas/Receta'; // Import your Receta component

const App = () => {
  return (
    <Router>
      <BackgroundComponent>
        <PhoneFrameComponent>
          {/* Aqui se agregaran todas las pantallas que haremos */}
          <Routes>
            <Route path="/" element={<MainScreen />} /> {/* Main screen route */}
            <Route path="/receta/:id" element={<Receta />} /> {/* receta route */}
          </Routes>
        </PhoneFrameComponent>
      </BackgroundComponent>
    </Router>
  );
};

export default App;