import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomJoin = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!roomId) return;
    await axios.post("http://localhost:3000/api/rooms/join", { roomId });
    navigate(`/room/${roomId}`);
  };

  return (
    <div style={{ padding: '2rem' }} >
      <h2>Join a Whiteboard Room</h2>
      <input
        style={{ margin: "12px", padding: "6px" }}
        placeholder="Enter Room Code"
        value={roomId}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          const isValid = /^[A-Za-z0-9]{0,6}$/.test(value);
          if (isValid) {
            setRoomId(value);
          }
        }}
      />
      <button style={{ backgroundColor: "gray", padding: "3px", cursor: "pointer", }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "darkgray"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "gray"}
        onClick={handleJoin}>Join</button>
    </div>
  );
};

export default RoomJoin;