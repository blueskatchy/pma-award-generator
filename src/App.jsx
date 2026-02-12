import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Latin from "./pages/Latin";
import Saber from "./pages/Saber";
import Awards from "./pages/Awards";
import Plaque from "./pages/Plaque";
import Streamer from "./pages/Streamer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/latin" element={<Latin />} />
        <Route path="/saber" element={<Saber />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/plaque" element={<Plaque />} />
        <Route path="/streamer" element={<Streamer />} />
      </Routes>
    </Router>
  );
}

export default App;
