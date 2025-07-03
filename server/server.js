import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import roomRoutes from './routes/RoomRoutes.js';
import {app,server} from './socket/socket.js';

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/rooms', roomRoutes);

mongoose.connect(process.env.MONGO_URI )
  .then(() => {
    console.log("MongoDB connected");
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
