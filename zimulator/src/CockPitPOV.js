import React, { useRef, useEffect } from 'react';
import './CockPitPOV.css';
import overlayImage from './images/cockpit.png';

const CockPitPOV = () => {
  const canvasRef = useRef(null);
  const objectsRef = useRef([]);

  const objectSize = 40;
  const growthSpeed = 2;
  const objectColor = 'yellow';
  const objects_coming_by = 500;

  const toRadians = (angle) => (angle * Math.PI) / 180;

  const generateObject = () => {
    // Initialize object properties at the origin
    objectsRef.current.push({
      x: 0,
      y: 0,
      size: 0, // Start with size 0 and grow
      speed: growthSpeed,
      angle: toRadians(Math.floor(Math.random() * 361)),
    });
  };

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw each object radially
    ctx.fillStyle = objectColor;
    objectsRef.current.forEach((obj) => {
      // Update object position and size
      obj.size = Math.min(obj.size + 0.5, objectSize);
      obj.x += obj.speed * Math.cos(obj.angle);
      obj.y += obj.speed * Math.sin(obj.angle);

      ctx.beginPath();
      ctx.arc(ctx.canvas.width / 2 + obj.x, ctx.canvas.height / 2 - obj.y, obj.size / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Remove objects that go off-screen
    objectsRef.current = objectsRef.current.filter(
      (obj) =>
        obj.x < ctx.canvas.width / 2 &&
        obj.y < ctx.canvas.height / 2 &&
        obj.size < objectSize
    );
  };

  useEffect(() => {
    // Generate a new object every second
    const interval = setInterval(generateObject, objects_coming_by);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      draw(ctx);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  });

  return (
    <div style={{ position: 'relative', width: 800, height: 400 }}>
      <canvas ref={canvasRef} width={800} height={400} style={{ background: 'black' }} />
        <img src={overlayImage} alt="Overlay"/>
    </div>
  );
};

export default CockPitPOV;
