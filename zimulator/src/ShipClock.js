// Timer.js
import React, { useState, useEffect } from 'react';

function ShipClock( beta ) {
  const [elapsedTime, setElapsedTime] = useState(0);
  let gamma = 1/(Math.sqrt(1-(beta.beta*beta.beta)));
  // let tick = Math.floor(gamma * 1000);
  // if (tick > 90000000) {
  //   tick = 90000000;
  // }

  useEffect(() => {
    let intervalId = setInterval(() => {
      gamma = 1/(Math.sqrt(1-(beta.beta*beta.beta)));
      setElapsedTime(prevTime => prevTime + (1000 / gamma));
    }, 10);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [beta.beta]);

  let minutes = Math.floor(elapsedTime/6000000);
  let seconds = Math.floor((elapsedTime - (minutes*6000000))/100000);
  let millis = Math.floor((elapsedTime - (minutes*6000000) - (seconds*100000))/100);

  return (
    <div>
      <h1>{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}:{millis.toString().padStart(3,'0')}</h1>
    </div>
  );
}

export default ShipClock;
