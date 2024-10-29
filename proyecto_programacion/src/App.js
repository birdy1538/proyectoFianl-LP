import React from 'react';
import BackgroundComponent from './components/Background';
import PhoneFrameComponent from './components/PhoneFrame';
import MainScreen from './pantallas/MainScreen';

const App = () => {
  return (
    <BackgroundComponent>
      <PhoneFrameComponent>
        {/* Aquí se muestra la pantalla principal con los posts */}
        <MainScreen />
      </PhoneFrameComponent>
    </BackgroundComponent>
  );
};

export default App;