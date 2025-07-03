import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Toolbar from './Toolbar';
import DrawingCanvas from './DrawingCanvas';
import { io } from 'socket.io-client';
const socket = io("http://localhost:3000");
const Whiteboard = () => {
  const { roomId } = useParams();
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [userCount, setUserCount] = useState(1);
  
  useEffect(() => {
    socket.on("user-count", (count) => {
      setUserCount(count);
    });

    return () => {
      socket.off("user-count");
    };
  }, []);
  return (
    <div>
      <Toolbar
        color={color}
        setColor={setColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        onClear={() => {
          const event = new CustomEvent("clear-canvas");
          window.dispatchEvent(event);
        }}
      />
      <div style={{ padding: "0 1rem", fontWeight: "bold" }}>
        Active Users in Room: {userCount}
      </div>
      <DrawingCanvas roomId={roomId} color={color} strokeWidth={strokeWidth} socket={socket} />
    </div>
  );
};

export default Whiteboard;