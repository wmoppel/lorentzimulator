// Timer.js
import React, { useState, useEffect } from 'react';

function EarthClock() {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1000);
    }, 10);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  let minutes = Math.floor(elapsedTime/6000000);
  let seconds = Math.floor((elapsedTime - (minutes*6000000))/100000);
  let millis = Math.floor((elapsedTime - (minutes*6000000) - (seconds*100000))/100);

  return (
    <div>
      <h1>{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}:{millis.toString().padStart(3,'0')}</h1>
    </div>
  );
}

export default EarthClock;
