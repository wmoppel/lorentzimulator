import React, { useRef, useEffect } from 'react';


const SidePOVGame = () => {

const canvasRef = useRef(null);
  const spaceshipRef = useRef({ x: 50, y: 150 }); // starting position of spaceship
  const objectsRef = useRef([]); // array to store positions of astronomical objects
  const cockpitURL = 1;

  // Generate random astronomical objects
  const generateObjects = () => {
    const objects = [];
    for (let i = 0; i < 10; i++) {
      objects.push({
        x: Math.random() * 800 + 400, // starts off-screen to the right
        y: Math.random() * 300,
        size: Math.random() * 40 + 20, // random size for variety
      });
    }
    objectsRef.current = objects;
  };

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw spaceship
    ctx.fillStyle = 'white';
    ctx.fillRect(spaceshipRef.current.x, spaceshipRef.current.y, 30, 10);

    // Move and draw objects
    ctx.fillStyle = 'yellow';
    objectsRef.current.forEach((obj) => {
      obj.x -= 2; // make the objects move left to simulate spaceship movement
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.size / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Remove objects that go off-screen and generate new ones
    objectsRef.current = objectsRef.current.filter((obj) => obj.x + obj.size > 0);
    if (objectsRef.current.length < 10) generateObjects();
  };

  useEffect(() => {
    generateObjects();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      draw(ctx);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} width={800} height={400} style={{ background: 'black' }} />;
};

export default SidePOVGame