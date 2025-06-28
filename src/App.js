// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Trending from "./pages/Trending";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import Bookmarks from "./pages/Bookmarks";
import Dashboard from "./pages/Dashboard"; // 🆕
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute"; // 🆕

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/bookmarks" element={<Bookmarks />} />

          {/* 🔐 Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;