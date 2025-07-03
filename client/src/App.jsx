import { BrowserRouter, Routes, Route } from "react-router-dom"
import Whiteboard from "./components/Whiteboard";
import RoomJoin from "./components/RoomJoin";

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoomJoin />} />
          <Route path="/room/:roomId" element={<Whiteboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;