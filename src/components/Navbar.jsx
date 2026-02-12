import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; // change if needed

function Navbar() {
  const linkStyle =
    "px-4 py-2 text-sm font-medium transition duration-200";

  const activeStyle = "text-yellow-400 border-b-2 border-yellow-400";
  const inactiveStyle = "text-white hover:text-yellow-300";

  return (
    <nav className="bg-[#1f1f1f] shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Left - Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Center - Links */}
          <div className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/latin"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Latin
            </NavLink>

            <NavLink
              to="/saber"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Saber
            </NavLink>

            <NavLink
              to="/awards"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Awards
            </NavLink>

            <NavLink
              to="/plaque"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Plaque
            </NavLink>

            <NavLink
              to="/streamer"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Streamer Group Award
            </NavLink>
          </div>

          {/* Right - Logout */}
          <div>
            <button className="text-white hover:text-red-400 transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
