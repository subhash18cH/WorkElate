import { Room } from "../models/room.js";
import http from 'http';
import { Server } from 'socket.io';
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app=express();
const FRONTEND_URL = process.env.FRONTEND_URL;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

const roomUserCount = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ roomId }) => {
    socket.join(roomId);
    socket.roomId = roomId;

    if (!roomUserCount[roomId]) {
      roomUserCount[roomId] = new Set();
    }
    roomUserCount[roomId].add(socket.id);

    io.to(roomId).emit('user-count', roomUserCount[roomId].size);
  });


  socket.on('cursor-move', (data) => {
    socket.broadcast.to(socket.roomId).emit('cursor-move', { id: socket.id, ...data });
  });

  socket.on('draw-start', (data) => {
    socket.broadcast.to(socket.roomId).emit('draw-start', { id: socket.id, ...data });
  });

  socket.on('draw-move', (data) => {
    socket.broadcast.to(socket.roomId).emit('draw-move', { id: socket.id, ...data });
  });

  socket.on('draw-end', async (data) => {
    socket.broadcast.to(socket.roomId).emit('draw-end', { id: socket.id, ...data });

    // Store to DB
    await Room.updateOne(
      { roomId: socket.roomId },
      { $push: { drawingData: { type: "stroke", data } }, $set: { lastActivity: new Date() } }
    );
  });

  socket.on('clear-canvas', async () => {
    socket.broadcast.to(socket.roomId).emit('clear-canvas');
    await Room.updateOne(
      { roomId: socket.roomId },
      { $push: { drawingData: { type: "clear" } } }
    );
  });

  socket.on('disconnect', () => {
    const roomId = socket.roomId;
    if (roomId && roomUserCount[roomId]) {
      roomUserCount[roomId].delete(socket.id);

      // Notify remaining users
      io.to(roomId).emit('user-count', roomUserCount[roomId].size);

      // Optional cleanup
      if (roomUserCount[roomId].size === 0) {
        delete roomUserCount[roomId];
      }
    }

    console.log('User disconnected:', socket.id);
  });
});

export {io,app,server};
