import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Skills from "./pages/Skills";
import Assessment from "./pages/Assessment";
import Progress from "./pages/Progress";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Application */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="/profile" element={<Profile />} />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;