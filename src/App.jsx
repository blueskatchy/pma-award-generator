import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar"; 
import Dashboard from "./pages/Dashboard"; 
import Latin from "./pages/Latin";
import Saber from "./pages/Saber";
import Awards from "./pages/Awards";
import Plaque from "./pages/Plaque";
import Streamer from "./pages/Streamer";
import Login from "./pages/Login";
import IdleTimer from "./components/IdleTimer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function MainLayout() {
  return (
    <>
      <IdleTimer timeout={600000} /> 
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
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/latin" element={<Latin />} />
          <Route path="/saber" element={<Saber />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/plaque" element={<Plaque />} />
          <Route path="/streamer" element={<Streamer />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;