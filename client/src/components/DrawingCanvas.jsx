import { useEffect, useRef } from 'react';

const DrawingCanvas = ({ roomId, color, strokeWidth,socket }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    socket.emit('join-room', { roomId });

    let drawing = false;

    const getXY = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const start = (e) => {
      const { x, y } = getXY(e);
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      socket.emit('draw-start', { x, y, color, strokeWidth });
    };

    const move = (e) => {
      if (!drawing) return;
      const { x, y } = getXY(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      socket.emit('draw-move', { x, y, color, strokeWidth });
    };

    const end = () => {
      drawing = false;
      socket.emit('draw-end');
    };

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      socket.emit("clear-canvas");
    };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);

    window.addEventListener("clear-canvas", clearCanvas);

    socket.on("draw-start", ({ x, y, color, strokeWidth }) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
    });

    socket.on("draw-move", ({ x, y }) => {
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    socket.on("draw-end", () => {
      ctx.closePath();
    });

    socket.on("clear-canvas", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', move);
      canvas.removeEventListener('mouseup', end);
      window.removeEventListener("clear-canvas", clearCanvas);

      socket.off("draw-start");
      socket.off("draw-move");
      socket.off("draw-end");
      socket.off("clear-canvas");
    };
  }, [roomId, color, strokeWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight - 100}
      style={{ border: '1px solid #000', display: 'block' }}
    />
  );
};

export default DrawingCanvas;