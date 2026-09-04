import "./App.css";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Matches from "./Pages/Matches";
import Profile from "./Pages/Profile";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/matches"
                    element={<Matches />}
                />

                <Route
                    path="/profile/:id"
                    element={<Profile />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;