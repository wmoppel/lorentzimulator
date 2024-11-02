// Slider.js
import React, { useState } from 'react';
// import { useGlobalContext } from './GlobalContext';


function Slider({ maxValue, onValueChange }) {
  const [value, setValue] = useState(0);
//   const { globalVariable, setGlobalVariable } = useGlobalContext();

  const handleChange = (event) => {
    const linearValue = event.target.value;
    setValue(linearValue);

    const newLogValue = (maxValue + 3747405.725) * (1 - Math.pow(3, -(linearValue / 25)));
    const newLogPercent = newLogValue / maxValue;

    // setGlobalVariable(newLogValue);
    onValueChange(newLogValue, newLogPercent);
    // setGlobalVariable((maxValue+3750000) * (1 - Math.pow(3, -(value / 25))));
  };

  // Reverse logarithmic mapping: as the slider value approaches 100, logValue approaches maxValue more gradually
  const logValue = (maxValue + 3747405.725) * (1 - Math.pow(3, -(value / 25))); // Adjust the denominator for finer control

  // Convert logValue to a fraction of the speed of light (c = 300,000,000 m/s)
  const logPercent = logValue / maxValue;

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
      />
      <p>Value: {logValue.toFixed(0)} m/s = {logPercent.toFixed(4)}c</p>
    </div>
  );
}

export default Slider;
