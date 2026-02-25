import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar"; 
import Dashboard from "./pages/Dashboard"; 
import Latin from "./pages/Latin";
import Saber from "./pages/Saber";
import Awards from "./pages/Awards";
import Plaque from "./pages/Plaque";
import Streamer from "./pages/Streamer";
import Login from "./pages/Login";

// Create a scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="pt-20">
        <Outlet /> 
      </main> 
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/latin" element={<Latin />} />
          <Route path="/saber" element={<Saber />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/plaque" element={<Plaque />} />
          <Route path="/streamer" element={<Streamer />} />
        </Route>

        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;