// App.js
import Slider from './Slider';
import React, { useState } from 'react';
import EarthClock from './EarthClock';
import ShipClock from './ShipClock';
import SidePOVGame from './SidePOVGame'
import CockPitPOV from './CockPitPOV.js'
import './App.css'
// import { GlobalProvider } from './GlobalContext';

function App() {
  const [speed, setSpeed] = useState(0);
  const [beta, setBeta] = useState(0);

  const handleSliderChange = (logValue, logPercent) => {
    setSpeed(logValue);
    setBeta(logPercent);
  };

  return (
    <div className='Whole-App' style={{ textAlign: 'center', padding: '20px' }}>
      <div className='Simulations'>
        <SidePOVGame></SidePOVGame>
        <CockPitPOV/>
      </div>
      <div className='Info-Description'>
        <h1>Speed of Spaceship</h1>
        <Slider maxValue={299792458} onValueChange={handleSliderChange} />
        <EarthClock/>
        <ShipClock beta={beta}/>
        <h1>{speed.toFixed(0)} m/s</h1>
        <h1>{beta.toFixed(4)}c</h1>
      </div>
    </div>
  );
}

export default App;
