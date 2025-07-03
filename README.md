# Collaborative Whiteboard

A real-time collaborative whiteboard application built using the MERN stack and Socket.io. Multiple users can draw together on a shared canvas with live updates.

## Architecture

### System Design

```
            +----------------------+
            |   React Frontend     |
            |  (Canvas, Toolbar)   |
            +----------+-----------+
                        |
            WebSocket + REST API
                        |
          +-------------+--------------+
          |      Express.js Backend    |
          |  Socket.IO + MongoDB       |
          +-------------+--------------+
                        |
                +------+------+
                |   MongoDB   |
                |  (Room DB)  |
                +-------------+

```


## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/subhash18cH/WorkElate.git
   cd WorkElate
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install

   cd server
   npm install
   ```

3. **Create .env file**
   ```bash
   PORT=3000
   MONGODB_URI=your_mongodb_url
   FRONTEND_URL=your_frontend_url
   ```

4. **Run the application**
   ```bash
   # Development mode
   cd server
   npm run dev

   cd client
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## API Documentation

###  REST Endpoints

**Base URL:** `http://localhost:3000/api`

| Method | Endpoint              | Description                                  |
|--------|-----------------------|----------------------------------------------|
| POST   | `/rooms/join`         | Join a room or create a new one              |
| GET    | `/rooms/:roomId`      | Get info about an existing room              |

####  POST /api/rooms/join

**Request Body:**
```json
{
  "roomId": "ABC123"
}
```

**Response Body:**
```json
{
    "roomId": "asq123",
    "_id": "686690a79c5378647189bcb9",
    "createdAt": "2025-07-03T14:16:07.513Z",
    "lastActivity": "2025-07-03T14:16:07.513Z",
    "drawingData": [],
    "__v": 0
}
```

####  GET /api/rooms/:id

**Response Body:**
```json
{
    "_id": "686690a79c5378647189bcb9",
    "roomId": "asq123",
    "createdAt": "2025-07-03T14:16:07.513Z",
    "lastActivity": "2025-07-03T14:16:07.513Z",
    "drawingData": [],
    "__v": 0
}
```

## Socket Events


### Client → Server Events

| Event Name | Payload Example | Description |
|------------|----------------|-------------|
| `join-room` | `{ roomId: "ABC123" }` | Join the specified whiteboard room |
| `cursor-move` | `{ x: 100, y: 150 }` | Send real-time cursor position |
| `draw-start` | `{ x: 50, y: 60, color: "black", strokeWidth: 4 }` | Start a new drawing stroke |
| `draw-move` | `{ x: 55, y: 65, color: "black", strokeWidth: 4 }` | Continue drawing stroke |
| `draw-end` | *(no payload)* | End the current stroke |
| `clear-canvas` | *(no payload)* | Clear the canvas in the current room |

### Server → Client Events

| Event Name | Payload Example | Description |
|------------|----------------|-------------|
| `user-count` | `2` | Broadcasted when user joins/leaves room |
| `draw-start` | `{ id, x, y, color, strokeWidth }` | Broadcast to others when drawing starts |
| `draw-move` | `{ id, x, y }` | Broadcast path data to others |
| `draw-end` | `{ id }` | Broadcast end of stroke |
| `clear-canvas` | *(no payload)* | Instruct clients to clear their canvas |
| `cursor-move` | `{ id, x, y }` | Broadcast real-time cursor movement |

## Author
Created by **Subhash Chand**




