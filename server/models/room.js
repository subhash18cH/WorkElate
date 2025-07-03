import mongoose from 'mongoose';

const DrawingSchema = mongoose.Schema({
  type: String,
  data: Object,
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

const RoomSchema = mongoose.Schema({
  roomId: { 
    type: String,
    unique: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastActivity: { 
    type: Date, 
    default: Date.now 
  },
  drawingData: [DrawingSchema]
});

export const Room = mongoose.model("room", RoomSchema);
