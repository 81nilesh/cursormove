import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0); // State to store rotation angle
  const imageRef = useRef(null);

  useEffect(() => {
    if (isClicked) {
      const intervalId = setInterval(() => {
        moveImageTowardsMouse();
      }, 41);

      return () => clearInterval(intervalId);
    }
  }, [isClicked]);

  const handleMouseMove = (event) => {
    setMousePosition({ y: event.clientY, x: event.clientX });
  };

  const handleMouseClick = () => {
    setIsClicked(true);
  };

  const moveImageTowardsMouse = () => {
    if (!imageRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    const dx = mousePosition.x - (imageRect.left + imageRect.width / 2);
    const dy = mousePosition.y - (imageRect.top + imageRect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 1) {
      setIsClicked(false);
    } else {
      const vx = dx * 0.1;
      const vy = dy * 0.1;
      setImagePosition((prevPosition) => ({
        x: prevPosition.x + vx,
        y: prevPosition.y + vy,
      }));

      // Calculate rotation angle based on mouse position
      const angle = Math.atan2(dy, dx) * (360 / Math.PI);
      setRotationAngle(angle);
    }
  };

  return (
    <div className="app" onMouseMove={handleMouseMove} onClick={handleMouseClick}>
      <img
        ref={imageRef}
        src="images.gif"
        alt="Your Image"
        className="image"
        style={{
          transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) rotate(${rotationAngle}deg)`, // Fixed template literal
        }}
      />
    </div>
  );
}

export default App;
