import express from 'express';
import { Room } from '../models/room.js';

const router = express.Router();

//POST- api/rooms/join - Create or Join a room
router.post('/join', async (req, res) => {
  const { roomId } = req.body;
  try {
    let room = await Room.findOne({ roomId });
    if (!room) {
      room = await Room.create({ roomId });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//GET- api/rooms/:id - get room information
router.get('/:roomId', async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId });
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
