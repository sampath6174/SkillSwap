import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Matches from "./Pages/Matches";
import Profile from "./Pages/Profile";
import Requests from "./Pages/Requests";
import Connections from "./Pages/Connections";
import SkillSwaps from "./Pages/SkillSwaps";
import Chat from "./Pages/Chat";
import Messages from "./Pages/Messages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/matches" element={<Matches />} />

        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/requests" element={<Requests />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/skill-swaps" element={<SkillSwaps />} />
        <Route path="/chat/:userId" element={<Chat/>} />
        <Route path="/messages" element={<Messages/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
